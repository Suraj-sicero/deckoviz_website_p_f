#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import subprocess
import shutil
import tempfile
import ssl
from urllib.parse import urlparse

def download_or_copy(url_or_path, temp_dir, base_name, public_dir):
    if not url_or_path:
        return None

    # Get extension
    parsed_url = urlparse(url_or_path)
    path_part = parsed_url.path
    ext = os.path.splitext(path_part)[1] or ".mp3"

    dest_path = os.path.join(temp_dir, f"{base_name}{ext}")

    # Handle local uploads path
    clean_path = url_or_path
    if url_or_path.startswith("http"):
        if "/uploads/" in path_part:
            idx = path_part.find("/uploads/")
            clean_path = path_part[idx:]

    if clean_path.startswith("/uploads/"):
        local_path = os.path.join(public_dir, clean_path.lstrip("/"))
        if os.path.exists(local_path):
            shutil.copy2(local_path, dest_path)
            return dest_path

    if os.path.exists(url_or_path):
        shutil.copy2(url_or_path, dest_path)
        return dest_path

    # Download external with browser User-Agent and bypass SSL verify
    print(f"[Python Stitcher] Downloading {url_or_path}...", file=sys.stderr)
    try:
        req = urllib.request.Request(
            url_or_path,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        )
        context = ssl._create_unverified_context()
        with urllib.request.urlopen(req, context=context, timeout=20) as response, open(dest_path, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        return dest_path
    except Exception as e:
        print(f"[Python Stitcher] Failed to download {url_or_path}: {e}", file=sys.stderr)
        raise Exception(f"Download failed for {url_or_path}: {str(e)}")

def run_ffmpeg(cmd):
    # Execute ffmpeg, capture output for debugging on failure
    try:
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            raise Exception(f"FFmpeg error: {res.stderr}")
    except FileNotFoundError:
        raise Exception("FFmpeg executable not found on the system. Please ensure FFmpeg is installed and in the system PATH.")
    except Exception as e:
        raise e

def main():
    try:
        # Read JSON input from stdin
        input_data = json.loads(sys.stdin.read())

        images = input_data.get("images", [])
        duration = int(input_data.get("transitionDuration", 5))
        narration = input_data.get("narration")
        music = input_data.get("music")
        narration_vol = int(input_data.get("narrationVolume", 100)) / 100.0
        music_vol = int(input_data.get("musicVolume", 100)) / 100.0
        output_path = input_data.get("outputPath")

        if not images:
            print(json.dumps({"error": "No images provided"}), file=sys.stderr)
            sys.exit(1)

        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.abspath(os.path.join(current_dir, ".."))
        public_dir = os.path.join(backend_dir, "public")

        # Temp dir
        temp_dir = tempfile.mkdtemp(dir=os.path.join(public_dir, "uploads"))

        # 1. Download images
        local_images = []
        for i, img_url in enumerate(images):
            local_img = download_or_copy(img_url, temp_dir, f"img-{i}", public_dir)
            local_images.append(local_img)

        # 2. Render clips
        clips = []
        for i, img_path in enumerate(local_images):
            clip_path = os.path.join(temp_dir, f"clip-{i}.mp4")
            fade_duration = 0.5
            fade_out_start = duration - fade_duration

            # Spawn FFmpeg for individual clip with fade in/out (Optimized for low-RAM hosts)
            cmd = [
                "ffmpeg", "-y", "-threads", "1", "-loop", "1", "-t", str(duration), "-i", img_path,
                "-vf", f"scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2:black,fade=t=in:st=0:d={fade_duration},fade=t=out:st={fade_out_start}:d={fade_duration}",
                "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p", "-r", "10", clip_path
            ]
            run_ffmpeg(cmd)
            clips.append(clip_path)

        # 3. Concatenate
        list_path = os.path.join(temp_dir, "list.txt")
        with open(list_path, "w") as f:
            for c in clips:
                f.write(f"file '{os.path.basename(c)}'\n")

        merged_path = os.path.join(temp_dir, "merged.mp4")
        concat_cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_path, "-c", "copy", merged_path]
        run_ffmpeg(concat_cmd)

        # 4. Audio mixing
        local_narration = download_or_copy(narration, temp_dir, "narration", public_dir)
        local_music = download_or_copy(music, temp_dir, "music", public_dir)

        total_duration = len(images) * duration

        final_video_path = os.path.join(public_dir, output_path.lstrip("/"))
        os.makedirs(os.path.dirname(final_video_path), exist_ok=True)

        mix_cmd = ["ffmpeg", "-y", "-i", merged_path]

        if local_narration and local_music:
            mix_cmd.extend([
                "-i", local_narration,
                "-stream_loop", "-1", "-i", local_music,
                "-filter_complex", f"[1:a]volume={narration_vol}[a1];[2:a]volume={music_vol}[a2];[a1][a2]amix=inputs=2:duration=longest[aout]",
                "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-t", str(total_duration), final_video_path
            ])
        elif local_narration:
            mix_cmd.extend([
                "-i", local_narration,
                "-filter_complex", f"[1:a]volume={narration_vol}[a1]",
                "-map", "0:v", "-map", "[a1]", "-c:v", "copy", "-c:a", "aac", "-t", str(total_duration), final_video_path
            ])
        elif local_music:
            mix_cmd.extend([
                "-stream_loop", "-1", "-i", local_music,
                "-filter_complex", f"[1:a]volume={music_vol}[a1]",
                "-map", "0:v", "-map", "[a1]", "-c:v", "copy", "-c:a", "aac", "-t", str(total_duration), final_video_path
            ])
        else:
            mix_cmd.extend([
                "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
                "-c:v", "copy", "-c:a", "aac", "-t", str(total_duration), final_video_path
            ])

        run_ffmpeg(mix_cmd)

        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)

        print(json.dumps({"success": True, "outputVideo": output_path}))

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

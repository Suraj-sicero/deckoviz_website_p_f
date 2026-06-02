#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import subprocess
import shutil
import tempfile
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

    # Download external
    print(f"[Python Stitcher] Downloading {url_or_path}...", file=sys.stderr)
    urllib.request.urlretrieve(url_or_path, dest_path)
    return dest_path

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

            # Spawn FFmpeg for individual clip with fade in/out
            cmd = [
                "ffmpeg", "-y", "-loop", "1", "-t", str(duration), "-i", img_path,
                "-vf", f"scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black,fade=t=in:st=0:d={fade_duration},fade=t=out:st={fade_out_start}:d={fade_duration}",
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "25", clip_path
            ]
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            clips.append(clip_path)

        # 3. Concatenate
        list_path = os.path.join(temp_dir, "list.txt")
        with open(list_path, "w") as f:
            for c in clips:
                f.write(f"file '{os.path.basename(c)}'\n")

        merged_path = os.path.join(temp_dir, "merged.mp4")
        concat_cmd = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_path, "-c", "copy", merged_path]
        subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

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

        subprocess.run(mix_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)

        print(json.dumps({"success": True, "outputVideo": output_path}))

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

# Deckoviz Music Playback API Documentation

This document describes the API endpoints, schemas, and integration protocols for the Deckoviz Music Playback feature. It is intended for third-party integration (e.g., Moidea).

## Base URL
* **AWS Production Base URL**: `https://api.deckoviz.com`

---

## Authentication & Headers
All endpoints require a valid Firebase Authentication token. Include the ID token in the authorization header of every request:

```http
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

---

## Data Schemas

### 1. `MusicResponse` (JSON Object)
Represents a single audio track.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique identifier of the music track (e.g., `music_xxxxxx`). |
| `title` | string | Title of the track. |
| `artist` | string \| null | Artist of the track (optional). |
| `fileUrl` | string \| null | **Presigned S3 URL** generated dynamically for secure audio streaming. |
| `uploadedBy` | string \| null | Firebase UID of the user who uploaded the track. |
| `durationSeconds` | float \| null | Duration of the audio file in seconds. |
| `createdAt` | string | ISO-8601 formatted timestamp of track creation. |

### 2. `FavoriteMusicResponse` (JSON Object)
Represents a user's favorited music track entry.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | Unique identifier of the favorite entry (e.g., `fav_music_xxxxxx`). |
| `userId` | string | Firebase UID of the owner of this favorite entry. |
| `musicId` | string | ID of the favorited music track. |
| `music` | `MusicResponse` \| null | Nested details of the favorited music track. |
| `created_at` | string | ISO-8601 formatted timestamp of favoriting. |

---

## Endpoint Reference

### 1. List Music Tracks
Retrieve all uploaded music tracks. Supports text searching by title.

* **HTTP Method**: `GET`
* **Path**: `/api/music`
* **Query Parameters**:
  * `search` (string, optional): Case-insensitive filter on the track `title`.
* **Request Body**: None (Empty)
* **Response Status**: `200 OK`
* **Response Body**: `List[MusicResponse]` (Array of `MusicResponse` objects)

#### Example Response
```json
[
  {
    "id": "music_987f654321ab",
    "title": "Ambient Soundscape 01",
    "artist": "Deckoviz Labs",
    "fileUrl": "https://deckoviz-media-prod.s3.eu-west-2.amazonaws.com/media/user_uid/ambient.mp3?AWSAccessKeyId=...",
    "uploadedBy": "user_uid_12345",
    "durationSeconds": 180.5,
    "createdAt": "2026-08-27T12:00:00Z"
  }
]
```

---

### 2. Upload Music Track
Upload a new audio file to S3 and save metadata.

* **HTTP Method**: `POST`
* **Path**: `/api/music/upload`
* **Content-Type**: `multipart/form-data`
* **Allowed MIME Types**: `audio/mpeg`, `audio/mp4`, `audio/ogg`, `audio/wav`, `audio/webm`
* **Request Body (Form Data)**:
  * `file` (File, required): The binary audio file.
  * `title` (string, optional): Title of the track. Defaults to sanitized filename if omitted.
  * `artist` (string, optional): Name of the artist.
  * `duration_seconds` (float, optional): Track duration in seconds.
* **Response Status**: `201 Created`
* **Response Body**: `MusicResponse` (JSON Object)

---

### 3. Get Favorite Music Tracks
Retrieve a list of the calling user's favorited music tracks.

* **HTTP Method**: `GET`
* **Path**: `/api/music/favorites`
* **Request Body**: None (Empty)
* **Response Status**: `200 OK`
* **Response Body**: `List[FavoriteMusicResponse]` (Array of `FavoriteMusicResponse` objects)

---

### 4. Add Favorite Music Track
Mark a track as a favorite for the calling user.

* **HTTP Method**: `POST`
* **Path**: `/api/music/{music_id}/favorite`
* **Path Parameters**:
  * `music_id` (string, required): The ID of the music track.
* **Request Body**: None (Empty)
* **Response Status**: `201 Created`
* **Response Body**: JSON Object
  ```json
  {
    "success": true,
    "already_favorited": false,
    "id": "fav_music_abcdef123456"
  }
  ```

---

### 5. Remove Favorite Music Track
Remove a track from the calling user's favorites.

* **HTTP Method**: `DELETE`
* **Path**: `/api/music/{music_id}/favorite`
* **Path Parameters**:
  * `music_id` (string, required): The ID of the music track.
* **Request Body**: None (Empty)
* **Response Status**: `200 OK`
* **Response Body**: JSON Object
  ```json
  {
    "success": true
  }
  ```

---

### 6. Assign Music Track to Collection
Assign or unassign an audio track to play automatically when a visual Collection is opened.

* **HTTP Method**: `PATCH`
* **Path**: `/api/collections/{collection_id}/music`
* **Path Parameters**:
  * `collection_id` (string, required): The ID of the Collection.
* **Request Body**: JSON Object (`AssignMusicRequest`)
  ```json
  {
    "musicId": "music_987f654321ab"
  }
  ```
  *(Pass `null` or omit the field to unassign music from the collection)*
* **Response Status**: `200 OK`
* **Response Body**: JSON Object
  ```json
  {
    "success": true,
    "collectionId": "collection_654321abcdef",
    "assignedMusicId": "music_987f654321ab"
  }
  ```

---

### 7. Play Music on Device
Send a WebSocket command to a connected TV Smart Frame to immediately trigger audio playback.

* **HTTP Method**: `POST`
* **Path**: `/api/music/{app_instance_id}/play`
* **Path Parameters**:
  * `app_instance_id` (string, required): The target TV / Smart Frame instance ID.
* **Request Body**: JSON Object (`PlayMusicRequest`)
  ```json
  {
    "musicId": "music_987f654321ab"
  }
  ```
* **Response Status**: `200 OK`
* **Response Body**: JSON Object
  ```json
  {
    "success": true,
    "dispatched": true,
    "message_id": "msg_7894561230ab",
    "mode": "music_playback",
    "target_app_instance_id": "app_inst_123456"
  }
  ```

#### WebSocket Event Dispatch Detail
When this endpoint is successfully called, the backend issues a WebSocket payload of type `play_music` to the targeted screen:
```json
{
  "action": "play_music",
  "message_id": "msg_7894561230ab",
  "payload": {
    "music_id": "music_987f654321ab",
    "file_url": "https://deckoviz-media-prod.s3.eu-west-2.amazonaws.com/...",
    "title": "Ambient Soundscape 01",
    "artist": "Deckoviz Labs",
    "duration_seconds": 180.5,
    "app_instance_id": "app_inst_123456"
  }
}
```

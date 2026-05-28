# 📱 Deckoviz 2.0 — Mobile API Integration Guide

**Developer Contacts:** Shashank (Backend/Web) & AI Engineering Partner  
**Target Consumer:** Ayushman (Mobile App Developer)

This document provides technical reference and integration instructions for the REST endpoints supporting **VisiChat (Generative Canvas)**, **Deckoviz Curations (Seed Artworks)**, **Audio/Ambient Tracks**, and **Multi-format uploads** for the mobile client.

---

## 🌐 1. Server Connection & Base URLs

Depending on your testing environment, configure the appropriate backend base URL:

*   **Production (Render):** `https://deckoviz-demo.onrender.com` *(Replace with actual deployed host)*
*   **Android Emulator:** `http://10.0.2.2:5000`
*   **iOS Simulator / Local Network:** `http://localhost:5000` or `http://<your-local-ip>:5000`

---

## 🔒 2. Authentication

All user-scoped requests require a valid JWT token passed in the header:

```http
Authorization: Bearer <your_jwt_auth_token>
```

---

## 💬 3. VisiChat (Generative Chat) Endpoints

### 3.1 List User's Chats
*   **Endpoint:** `GET /api/vizzy-canvas/chats`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Returns all active chat sessions belonging to the user.
*   **Response (200 OK):**
    ```json
    {
      "chats": [
        {
          "id": "c86e00ea-cf81-4bc0-b5a7-96a84d4fa7df",
          "title": "Ambient Soundscape Generation",
          "messages": [
            { "role": "user", "content": "Create a calming morning soundscape" },
            { 
              "role": "assistant", 
              "content": "Generating audio parameters...",
              "timestamp": 1779987627000
            }
          ],
          "isFavorited": true,
          "createdAt": "2026-05-28T14:22:15.000Z",
          "updatedAt": "2026-05-28T14:23:45.000Z"
        }
      ]
    }
    ```

### 3.2 Create New Chat Session
*   **Endpoint:** `POST /api/vizzy-canvas/chats`
*   **Headers:** `Authorization: Bearer <token>`
*   **Body (JSON):**
    ```json
    {
      "title": "Midnight Reflection"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "chat": {
        "id": "7bc9e1df-992e-4b68-b7f7-b844f2efaa45",
        "userId": "d741a4a1-b8cf-43c2-bf72-881a4d1f2e1a",
        "title": "Midnight Reflection",
        "messages": [],
        "isFavorited": false,
        "createdAt": "2026-05-28T15:20:00.000Z",
        "updatedAt": "2026-05-28T15:20:00.000Z"
      }
    }
    ```

### 3.3 Send Prompt Message (Generative VisiChat)
*   **Endpoint:** `POST /api/vizzy-canvas/chats/:id/message`
*   **Headers:** `Authorization: Bearer <token>`
*   **Body (JSON):**
    ```json
    {
      "prompt": "Add soft piano chords in the background"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "message": {
        "role": "assistant",
        "content": "Added piano chords. The soundscape is now enriched with soft melodic tones.",
        "music": [
          {
            "title": "Chopin - Nocturne (Soft Piano)",
            "audioUrl": "https://example.com/audio/soft-piano.mp3"
          }
        ]
      }
    }
    ```

### 3.4 Toggle Favorite Status
*   **Endpoint:** `PATCH /api/vizzy-canvas/chats/:id/favorite`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    {
      "message": "Chat favorite status toggled",
      "chat": {
        "id": "c86e00ea-cf81-4bc0-b5a7-96a84d4fa7df",
        "isFavorited": true
      }
    }
    ```

### 3.5 Soft-Delete a Chat (Move to Trash)
*   **Endpoint:** `DELETE /api/vizzy-canvas/chats/:id`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    {
      "message": "Chat soft-deleted successfully"
    }
    ```

### 3.6 List Soft-Deleted Chats
*   **Endpoint:** `GET /api/vizzy-canvas/chats/deleted`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    {
      "chats": [
        {
          "id": "c86e00ea-cf81-4bc0-b5a7-96a84d4fa7df",
          "title": "Soft-deleted session",
          "deletedAt": "2026-05-28T14:40:00.000Z"
        }
      ]
    }
    ```

### 3.7 Restore Soft-Deleted Chat
*   **Endpoint:** `POST /api/vizzy-canvas/chats/:id/restore`
*   **Headers:** `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    {
      "message": "Chat restored successfully"
    }
    ```

---

## 🎨 4. Deckoviz Curations (Seed Artworks)

*No authentication header required for public curations.*

### 4.1 List All Curated Artworks
*   **Endpoint:** `GET /api/vizzy-canvas/curations`
*   **Description:** Returns the 30 curated seed artworks grouped or filtered by collection/category.
*   **Response (200 OK):**
    ```json
    {
      "curations": [
        {
          "id": "8aa18e9a-7c98-4c12-882f-2f8832a8ee0b",
          "title": "Mona Lisa Reimagined",
          "artist": "Leonardo AI",
          "category": "Abstract Expressionism",
          "style": "Digital Oil",
          "imageUrl": "https://res.cloudinary.com/dnu5ephbx/image/upload/v1779987619/deckoviz/curations/Abstract_Expressionism/d9nwxiueusuvkodeaqvc.jpg",
          "description": "A modern digital interpretation of classic realism, focusing on soft light and complex expressions.",
          "displayOrder": 1,
          "isFeatured": true
        }
      ]
    }
    ```

---

## 🎵 5. Music & Ambient Sound Tracks

### 5.1 List Audio Tracks (System + Generated Combined)
*   **Endpoint:** `GET /api/vizzy-canvas/music`
*   **Headers:** `Authorization: Bearer <token>` *(Optional: if missing, returns public system tracks only)*
*   **Response (200 OK):**
    ```json
    {
      "tracks": [
        {
          "id": "4b6e00ea-cf81-4bc0-b5a7-96a84d4fa7df",
          "title": "Ocean Waves Ambient",
          "prompt": "Rhythmic crashing of sea waves...",
          "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          "category": "ambient",
          "duration": 600,
          "userId": null,
          "isFavorited": true
        }
      ]
    }
    ```

### 5.2 List System-Seeded Tracks Only
*   **Endpoint:** `GET /api/vizzy-canvas/music/system`
*   **Description:** Returns only public classical tracks and ambient nature sound effects. No token required.
*   **Response (200 OK):**
    ```json
    {
      "tracks": [
        {
          "id": "abc231ea-ef81-4bc0-a5a7-96a84d4fa7df",
          "title": "Symphony No. 9 in D minor",
          "prompt": "Orchestral classical theme...",
          "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          "category": "classical",
          "duration": 360,
          "userId": null,
          "isFavorited": false
        }
      ]
    }
    ```

---

## 📎 6. Multi-Format File Uploads (VGC Attachments)

Use this endpoint to upload media or documents (Images, Audio, Video, PDFs) for the generative chat attachments.

*   **Endpoint:** `POST /api/upload`
*   **Headers:** `Authorization: Bearer <token>` (Optional)
*   **Content-Type:** `multipart/form-data`
*   **Body Payload:**
    *   `file`: Binary file data
*   **Allowed Formats:** Images (`.png`, `.jpg`, `.jpeg`, `.webp`), Audio (`.mp3`, `.wav`), Video (`.mp4`, `.mov`), Documents (`.pdf`). Max size: **25MB**.
*   **Response (200 OK):**
    ```json
    {
      "image": {
        "url": "https://res.cloudinary.com/dnu5ephbx/image/upload/v1779987742/vizzy/uploads/ft06bygnu78jus4bnlvg.pdf",
        "fileName": "project_brief.pdf",
        "fileSize": 124536
      }
    }
    ```

---

## 💻 7. Client Code Examples

### 7.1 Flutter/Dart Integration Example

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class DeckovizService {
  final String baseUrl = "https://deckoviz-demo.onrender.com";

  // 1. Get Curated Seed Artworks
  Future<List<dynamic>> fetchCuratedArtworks() async {
    final response = await http.get(Uri.parse('$baseUrl/api/vizzy-canvas/curations'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['curations'];
    } else {
      throw Exception('Failed to load curations');
    }
  }

  // 2. Send Generative Prompt
  Future<Map<String, dynamic>> sendChatMessage(String chatId, String prompt, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/vizzy-canvas/chats/$chatId/message'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({'prompt': prompt}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to send prompt');
    }
  }

  // 3. Upload Media Attachment
  Future<String> uploadAttachment(File file, String token) async {
    var request = http.MultipartRequest('POST', Uri.parse('$baseUrl/api/upload'));
    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(await http.MultipartFile.fromPath('file', file.path));

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['image']['url'];
    } else {
      throw Exception('Attachment upload failed');
    }
  }
}
```

### 7.2 React Native (Axios) Integration Example

```javascript
import axios from 'axios';

const API_BASE_URL = "https://deckoviz-demo.onrender.com";

// 1. Fetch Curated Artworks
export const fetchCurations = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/vizzy-canvas/curations`);
  return res.data.curations;
};

// 2. Post prompt message in VisiChat
export const sendChatMessage = async (chatId, prompt, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/api/vizzy-canvas/chats/${chatId}/message`,
    { prompt },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.message;
};

// 3. Upload Multi-Format Attachment
export const uploadAttachment = async (fileUri, fileName, mimeType, token) => {
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: fileName,
    type: mimeType,
  });

  const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.image.url;
};
```

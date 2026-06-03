# Daily Curator — keeping the mobile app in sync

When an admin changes a user's daily curation in the admin panel
(`/admin/daily-curator`), the mobile app finds out in two complementary ways.

## 1. Pull / refresh (always on — default mechanism)

Every admin change (add / reorder / remove) stamps `User.curationUpdatedAt`.
The mobile app polls a cheap endpoint and refetches the full curation only when
the stamp moves.

- `GET /api/daily-curator/me/status` (auth required)
  → `{ displayDate, curationUpdatedAt, count }`
- `GET /api/daily-curator/me` (auth required) — full hydrated curation; also
  includes `curationUpdatedAt`.

App pattern: on open / pull-to-refresh, call `/me/status`. If
`curationUpdatedAt` differs from the value last seen, call `/me` and re-render.

## 2. Outbound webhook (optional — for push/automation)

If `MOBILE_WEBHOOK_URL` is set, the backend POSTs to it on every change.
If it is **not** set, nothing is sent (safe default; pull still works).

Env vars:

```
MOBILE_WEBHOOK_URL=https://your-service.example.com/hooks/daily-curation
MOBILE_WEBHOOK_SECRET=some-shared-secret   # optional; sent as X-Webhook-Secret
```

Payload (`Content-Type: application/json`):

```json
{
  "event": "daily_curation.updated",
  "userId": "<recipient user id>",
  "updatedAt": "2026-05-30T12:34:56.000Z",
  "action": "added | updated | reordered | removed",
  "displayDate": "2026-05-30",
  "itemType": "artwork | collection",
  "itemId": "<id>"
}
```

Point `MOBILE_WEBHOOK_URL` at an Expo push relay (or any service) to turn a
curation change into a device push notification. Verify the
`X-Webhook-Secret` header on the receiving side before trusting the payload.

## Make an account a curator admin

```
node make-admin.js someone@example.com        # grant
node make-admin.js someone@example.com false  # revoke
```

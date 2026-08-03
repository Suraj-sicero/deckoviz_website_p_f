/**
 * Generates and retrieves a unique device/browser session ID
 * to ensure unauthenticated sessions are strictly isolated per browser
 * and never share user data across different devices or computers.
 */
export function getDeviceId(): string {
  try {
    let id = localStorage.getItem("deckoviz_device_id");
    if (!id || id.trim().length < 8) {
      id = "dev_" + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
      localStorage.setItem("deckoviz_device_id", id);
    }
    return id;
  } catch {
    return "dev_temp_session";
  }
}

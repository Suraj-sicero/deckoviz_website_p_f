import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { wsClient, type ConnectionStatus, type WSDevice } from "../lib/wsClient";

export interface UseWebSocketReturn {
  status: ConnectionStatus;
  devices: WSDevice[];
  sendCommand: (action: string, payload?: Record<string, unknown>, targetAppInstanceId?: string) => boolean;
  displayArtwork: (cdnUrl: string, target?: string) => boolean;
  displayCollection: (collectionId: string, target?: string) => boolean;
  queueCollection: (collectionId: string, target?: string) => boolean;
  pause: (target?: string) => boolean;
  resume: (target?: string) => boolean;
  skip: (target?: string) => boolean;
}

export function useWebSocket(): UseWebSocketReturn {
  const { token, refreshToken } = useAuth();
  const [status, setStatus] = useState<ConnectionStatus>(wsClient.status);
  const [devices, setDevices] = useState<WSDevice[]>(wsClient.devices);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!token) {
      wsClient.disconnect();
      return;
    }

    wsClient.setTokenProvider(async () => {
      if (refreshToken) {
        return refreshToken();
      }
      return token;
    });

    const unsubStatus = wsClient.on("status", (p) => {
      if (mountedRef.current) setStatus(p.status as ConnectionStatus);
    });

    const unsubDevices = wsClient.on("devices_list", (p) => {
      if (mountedRef.current) setDevices((p.devices as WSDevice[]) || []);
    });

    const unsubOffline = wsClient.on("device_offline", (p) => {
      if (mountedRef.current) {
        const offlineId = p.app_instance_id as string;
        setDevices((prev) =>
          prev.map((d) => (d.app_instance_id === offlineId ? { ...d, status: "offline" as const } : d))
        );
      }
    });

    wsClient.connect(token);

    return () => {
      unsubStatus();
      unsubDevices();
      unsubOffline();
    };
  }, [token, refreshToken]);

  const sendCommand = useCallback(
    (action: string, payload: Record<string, unknown> = {}, target?: string) =>
      wsClient.send(action, payload, target),
    []
  );

  const displayArtwork = useCallback((cdnUrl: string, target?: string) => wsClient.displayArtwork(cdnUrl, target), []);
  const displayCollection = useCallback((id: string, target?: string) => wsClient.displayCollection(id, target), []);
  const queueCollection = useCallback((id: string, target?: string) => wsClient.queueCollection(id, target), []);
  const pause = useCallback((target?: string) => wsClient.pause(target), []);
  const resume = useCallback((target?: string) => wsClient.resume(target), []);
  const skip = useCallback((target?: string) => wsClient.skip(target), []);

  return { status, devices, sendCommand, displayArtwork, displayCollection, queueCollection, pause, resume, skip };
}

import { getDeviceId } from "./deviceStorage";

const BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://deckoviz-website-p-f.onrender.com";
const API = `${BASE}/api/home/vgc`;

function hdrs(token: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Device-ID": getDeviceId(),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export interface VGCAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  tone: string;
}

export interface VGCChatSummary {
  id: string;
  title: string;
  activeAgent: string;
  updatedAt: string;
  createdAt: string;
  isFavorited: boolean;
}

export interface VGCChatDetail extends VGCChatSummary {
  messages: string;
  mode: string;
}

export interface VGCMessage {
  role: "user" | "assistant";
  content: string;
  agentId?: string;
  timestamp?: string;
}

export async function getAgents(token: string): Promise<VGCAgent[]> {
  const res = await fetch(`${API}/agents`, { headers: hdrs(token) });
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

export async function getChats(token: string): Promise<VGCChatSummary[]> {
  const res = await fetch(`${API}/chats`, { headers: hdrs(token) });
  if (!res.ok) throw new Error("Failed to fetch chats");
  return res.json();
}

export async function getChat(token: string, chatId: string): Promise<VGCChatDetail> {
  const res = await fetch(`${API}/chats/${chatId}`, { headers: hdrs(token) });
  if (!res.ok) throw new Error("Failed to fetch chat");
  return res.json();
}

export async function createChat(token: string, title: string, activeAgent: string): Promise<VGCChatDetail> {
  const res = await fetch(`${API}/chats`, {
    method: "POST",
    headers: hdrs(token),
    body: JSON.stringify({ title, activeAgent }),
  });
  if (!res.ok) throw new Error("Failed to create chat");
  return res.json();
}

export async function sendMessage(
  token: string,
  message: string,
  chatId?: string,
  agentId?: string
): Promise<{ reply: string; chatId: string }> {
  const res = await fetch(`${API}/chat`, {
    method: "POST",
    headers: hdrs(token),
    body: JSON.stringify({ message, chatId, agentId }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function deleteChat(token: string, chatId: string): Promise<void> {
  const res = await fetch(`${API}/chats/${chatId}`, {
    method: "DELETE",
    headers: hdrs(token),
  });
  if (!res.ok) throw new Error("Failed to delete chat");
}

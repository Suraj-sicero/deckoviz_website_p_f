import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  Plus,
  Folder,
  FolderPlus,
  Notebook,
  Star,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Quote,
  List,
  Copy,
  Send,
  Loader2,
  ArrowRight,
  Sparkle,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

interface FolderItem {
  id: string;
  name: string;
}

interface JournalItem {
  id: string;
  title: string;
  content: string;
  template: string;
  isStarred: boolean;
  folderId: string | null;
  chatHistory: string;
  updatedAt: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const templates = [
  { id: "novel", name: "Novel / Story", icon: "📖", desc: "Structured for chapters, plot arcs, and character sketches." },
  { id: "poem", name: "Poem", icon: "✨", desc: "Optimized for stanzas, metaphors, and rhythm." },
  { id: "screenplay", name: "Screenplay", icon: "🎬", desc: "Final Draft format for scriptwriting." },
  { id: "poster", name: "Poster Copy", icon: "🎨", desc: "Short, snappy slogans and layout briefs." },
  { id: "custom", name: "Blank Slate", icon: "📝", desc: "A clean canvas for any creative endeavor." }
];

const CreativeJournalTool: React.FC = () => {
  const { token, user } = useAuth();
  const editorRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Core lists
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [journals, setJournals] = useState<JournalItem[]>([]);
  const [activeJournal, setActiveJournal] = useState<JournalItem | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeFolderTab, setActiveFolderTab] = useState<string | null>(null); // For sidebar toggles
  const [newFolderName, setNewFolderName] = useState("");
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // AI Assistant Tab
  const [aiTab, setAiTab] = useState<"chat" | "art">("chat");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");

  // AI Art Studio
  const [artPrompt, setArtPrompt] = useState("");
  const [artStyle, setArtStyle] = useState("digital-art");
  const [generatedImgUrl, setGeneratedImgUrl] = useState("");
  const [artLoading, setArtLoading] = useState(false);
  const [artError, setArtError] = useState("");

  // Editor configuration
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (token) {
      fetchFolders();
      fetchJournals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Sync editor content when active journal changes
  useEffect(() => {
    if (activeJournal) {
      setEditorContent(activeJournal.content);
      if (editorRef.current) {
        editorRef.current.innerHTML = activeJournal.content;
      }
      try {
        setChatMessages(JSON.parse(activeJournal.chatHistory || "[]"));
      } catch {
        setChatMessages([]);
      }
      // Reset generated art and active highlight context
      setGeneratedImgUrl("");
      setHighlightedText("");
    } else {
      setEditorContent("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      setChatMessages([]);
    }
  }, [activeJournal]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // ────────────────────────────────────────────────────────────────────────
  // DATA FETCHING
  // ────────────────────────────────────────────────────────────────────────

  const fetchFolders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/creative-journal/folders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFolders(res.data);
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
  };

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/creative-journal/journals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJournals(res.data);
      // Select first journal if none selected
      if (res.data.length > 0 && !activeJournal) {
        setActiveJournal(res.data[0]);
      }
    } catch (err) {
      console.error("Error fetching journals:", err);
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // CREATING FOLDERS & JOURNALS
  // ────────────────────────────────────────────────────────────────────────

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/creative-journal/folders`,
        { name: newFolderName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFolders([...folders, res.data]);
      setNewFolderName("");
      setShowFolderModal(false);
    } catch (err) {
      console.error("Failed to create folder:", err);
    }
  };

  const handleCreateJournal = async (templateId: string) => {
    setShowTemplateModal(false);
    let initialContent = "";
    const title = `New ${templateId.charAt(0).toUpperCase() + templateId.slice(1)}`;

    if (templateId === "novel") {
      initialContent = `<h1>Chapter 1: The Dark Forest</h1><p>The wind blew fiercely through the pine trees. Jack wrapped his heavy wool coat tighter around his shoulders...</p><blockquote>"We must move quickly before the moon rises," he muttered.</blockquote>`;
    } else if (templateId === "poem") {
      initialContent = `<h1>Echoes of Silence</h1><p class="italic">A whisper in the quiet deep,</p><p class="italic">Where promises we fail to keep,</p><p class="italic">Are written in the shifting sand,</p><p class="italic">By some forgotten, spectral hand.</p>`;
    } else if (templateId === "screenplay") {
      initialContent = `<h1>THE RUNAWAY</h1><p><b>INT. ABANDONED METRO STATION - NIGHT</b></p><p>Rain drips from structural cracks. Sparks flicker from dangling wires.</p><p>SARA (20s) crouches behind a rusted ticket kiosk, holding her breath.</p><p class="pl-12">SARA<br/>(whispering to herself)<br/>Just three more minutes. Just wait it out.</p>`;
    } else if (templateId === "poster") {
      initialContent = `<h1>BEYOND THE HORIZON</h1><h2>The Future of Creativity is Here</h2><p><b>Visual Concept:</b> Deep purple background with an astronaut overlooking a floating holographic galaxy.</p><p><b>Call To Action:</b> Discover your potential at Deckoviz.</p>`;
    } else {
      initialContent = `<h1>Untitled Masterpiece</h1><p>Start your creative journey here...</p>`;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/creative-journal/journals`,
        {
          title: title,
          template: templateId,
          folderId: activeFolderTab || null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Immediately patch the content so the template content is saved
      const updatedRes = await axios.put(
        `${BACKEND_URL}/api/creative-journal/journals/${res.data.id}`,
        { content: initialContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJournals([updatedRes.data, ...journals]);
      setActiveJournal(updatedRes.data);
    } catch (err) {
      console.error("Failed to create journal:", err);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // DELETING & UPDATING
  // ────────────────────────────────────────────────────────────────────────

  const handleDeleteJournal = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this journal? This cannot be undone.")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/creative-journal/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const filtered = journals.filter(j => j.id !== id);
      setJournals(filtered);
      if (activeJournal?.id === id) {
        setActiveJournal(filtered.length > 0 ? filtered[0] : null);
      }
    } catch (err) {
      console.error("Failed to delete journal:", err);
    }
  };

  const handleToggleStar = async (journal: JournalItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/creative-journal/journals/${journal.id}`,
        { isStarred: !journal.isStarred },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJournals(journals.map(j => j.id === journal.id ? res.data : j));
      if (activeJournal?.id === journal.id) {
        setActiveJournal(res.data);
      }
    } catch (err) {
      console.error("Failed to toggle star:", err);
    }
  };

  const handleMoveToFolder = async (journalId: string, folderId: string | null) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/creative-journal/journals/${journalId}`,
        { folderId: folderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJournals(journals.map(j => j.id === journalId ? res.data : j));
      if (activeJournal?.id === journalId) {
        setActiveJournal(res.data);
      }
    } catch (err) {
      console.error("Failed to move journal:", err);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // AUTOSAVING WRITING CANVAS
  // ────────────────────────────────────────────────────────────────────────

  const handleEditorInput = () => {
    if (!activeJournal || !editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setEditorContent(html);
    setSaveStatus("saving");

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await axios.put(
          `${BACKEND_URL}/api/creative-journal/journals/${activeJournal.id}`,
          { content: html },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSaveStatus("saved");
        setJournals(journals.map(j => j.id === activeJournal.id ? { ...j, content: html } : j));
      } catch (err) {
        console.error("Error autosaving journal content:", err);
        setSaveStatus("error");
      }
    }, 1500); // 1.5 seconds debounce
  };

  const handleTitleChange = async (newTitle: string) => {
    if (!activeJournal) return;
    setSaveStatus("saving");
    try {
      await axios.put(
        `${BACKEND_URL}/api/creative-journal/journals/${activeJournal.id}`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaveStatus("saved");
      setJournals(journals.map(j => j.id === activeJournal.id ? { ...j, title: newTitle } : j));
      setActiveJournal({ ...activeJournal, title: newTitle });
    } catch (err) {
      console.error("Error updating title:", err);
      setSaveStatus("error");
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // TEXT FORMATTING TOOLBAR HELPERS
  // ────────────────────────────────────────────────────────────────────────

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleEditorInput();
    editorRef.current?.focus();
  };

  // Capture selected text to ask AI
  const handleCaptureHighlight = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && selectedText.trim().length > 0) {
      setHighlightedText(selectedText.trim());
      setAiTab("chat");
      setChatInput(`Analyze this section of my writing: "${selectedText.trim()}"`);
    } else {
      alert("Please highlight/select some text in the canvas first!");
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // AI SIDEBAR CHAT WORKFLOW
  // ────────────────────────────────────────────────────────────────────────

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeJournal) return;

    const userMsgText = chatInput;
    setChatInput("");
    setChatLoading(true);

    // Push client side immediately
    const tempUserMsg: ChatMessage = {
      role: "user",
      content: highlightedText
        ? `[Highlighted Text: "${highlightedText}"]\n\n${userMsgText}`
        : userMsgText,
      timestamp: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/creative-journal/journals/${activeJournal.id}/chat`,
        {
          message: userMsgText,
          highlightedText: highlightedText || undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChatMessages(res.data.chatHistory);
      // Update journal in state
      setJournals(journals.map(j => j.id === activeJournal.id ? { ...j, chatHistory: JSON.stringify(res.data.chatHistory) } : j));
      // Clear highlight context once consumed
      setHighlightedText("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error in AI chat:", err);
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: `⚠️ Failed to get reply: ${err.response?.data?.error || err.message}`, timestamp: new Date().toISOString() }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // INSERTING & COPYING AI RESPONSES
  // ────────────────────────────────────────────────────────────────────────

  const insertTextAtCursor = (text: string) => {
    // Escape simple HTML chars to be safe, wrap in clean paragraph tag
    const formattedHtml = `<p>${text.replace(/\n/g, "<br/>")}</p>`;
    insertHTMLAtCursor(formattedHtml);
  };

  const insertHTMLAtCursor = (html: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else {
      // Append at end if cursor is not focused
      if (editorRef.current) {
        editorRef.current.innerHTML += html;
      }
    }
    handleEditorInput();
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // ────────────────────────────────────────────────────────────────────────
  // VISUAL GENERATION (ART STUDIO)
  // ────────────────────────────────────────────────────────────────────────

  const handleGenerateArt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artPrompt.trim()) return;

    setArtLoading(true);
    setArtError("");
    setGeneratedImgUrl("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/creative-journal/generate-image`,
        { prompt: artPrompt, style: artStyle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGeneratedImgUrl(res.data.url);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Art generation error:", err);
      setArtError(err.response?.data?.error || "Failed to generate image. Please try again.");
    } finally {
      setArtLoading(false);
    }
  };

  const embedImageInJournal = (url: string) => {
    const imgHtml = `<div class="my-6 text-center select-all"><img src="${url}" class="rounded-3xl max-w-full mx-auto shadow-2xl border border-slate-800/80 transition-transform duration-300 hover:scale-[1.01]" alt="AI Generated Graphic" /><p class="text-xs text-slate-500 mt-2 italic">AI Generated Concept Image</p></div>`;
    insertHTMLAtCursor(imgHtml);
    alert("Image embedded in writing canvas!");
  };

  // Group journals for organization
  const starredJournals = journals.filter(j => j.isStarred);
  const uncategorizedJournals = journals.filter(j => !j.folderId);

  return (
    <div className="flex h-screen pt-20 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* ──────────────────────────────────────────────────────────────────
          LEFT SIDEBAR: Folders / Starred / Projects / Templates
          ────────────────────────────────────────────────────────────────── */}
      <aside className="w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between select-none">
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                <Notebook className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Workspace
              </span>
            </div>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-300 hover:text-white transition-all"
              title="New Project / Journal"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
              <span className="text-xs text-slate-500">Loading workspace...</span>
            </div>
          ) : (
            <>
              {/* Starred Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Starred Projects</span>
                </div>
                {starredJournals.length === 0 ? (
                  <p className="text-xs text-slate-600 px-2 italic">Star projects to pin them here.</p>
                ) : (
                  <div className="space-y-1">
                    {starredJournals.map(journal => (
                      <div
                        key={journal.id}
                        onClick={() => setActiveJournal(journal)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition-all ${
                          activeJournal?.id === journal.id
                            ? "bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 border border-violet-500/30 text-white shadow-lg"
                            : "hover:bg-slate-800/50 border border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span>{templates.find(t => t.id === journal.template)?.icon || "📝"}</span>
                          <span className="truncate font-medium">{journal.title}</span>
                        </div>
                        <button onClick={(e) => handleToggleStar(journal, e)} className="text-amber-500 hover:scale-115 transition-transform">
                          ★
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Folders & Categories Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Folder className="w-3 h-3 text-violet-400" />
                    <span>Folders</span>
                  </span>
                  <button
                    onClick={() => setShowFolderModal(true)}
                    className="text-slate-500 hover:text-violet-400 transition-colors"
                    title="New Folder"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Folder List */}
                <div className="space-y-1">
                  {folders.map(folder => (
                    <div key={folder.id} className="space-y-1">
                      <div
                        onClick={() => setActiveFolderTab(activeFolderTab === folder.id ? null : folder.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 transition-all ${
                          activeFolderTab === folder.id ? "bg-slate-800/20 text-slate-200" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {activeFolderTab === folder.id ? (
                            <ChevronDown className="w-3.5 h-3.5 text-violet-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                          )}
                          <Folder className="w-4 h-4 text-violet-500" />
                          <span className="truncate font-semibold">{folder.name}</span>
                        </div>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm(`Delete folder "${folder.name}"? Journals inside won't be deleted.`)) {
                              try {
                                await axios.delete(`${BACKEND_URL}/api/creative-journal/folders/${folder.id}`, {
                                  headers: { Authorization: `Bearer ${token}` }
                                });
                                setFolders(folders.filter(f => f.id !== folder.id));
                                fetchJournals();
                              } catch (err) {
                                console.error(err);
                              }
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-0.5 rounded text-slate-500 hover:text-red-400 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Expanded Journals under folder */}
                      {activeFolderTab === folder.id && (
                        <div className="pl-6 space-y-1">
                          {journals.filter(j => j.folderId === folder.id).map(journal => (
                            <div
                              key={journal.id}
                              onClick={() => setActiveJournal(journal)}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                                activeJournal?.id === journal.id
                                  ? "bg-slate-800 border border-slate-700 text-white font-medium shadow"
                                  : "hover:bg-slate-800/30 text-slate-400 hover:text-slate-300"
                              }`}
                            >
                              <span className="truncate">{journal.title}</span>
                              <div className="flex items-center gap-1 opacity-0 hover:opacity-100 focus-within:opacity-100">
                                <button onClick={(e) => handleToggleStar(journal, e)} className="text-slate-500 hover:text-amber-500">
                                  {journal.isStarred ? "★" : "☆"}
                                </button>
                                <button onClick={(e) => handleDeleteJournal(journal.id, e)} className="text-slate-500 hover:text-red-400">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {journals.filter(j => j.folderId === folder.id).length === 0 && (
                            <p className="text-[10px] text-slate-600 italic pl-3">No journals inside.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Uncategorized Journals */}
              <div className="space-y-1 pt-2">
                <div className="px-1 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  All Stories / Drafts
                </div>
                {uncategorizedJournals.map(journal => (
                  <div
                    key={journal.id}
                    onClick={() => setActiveJournal(journal)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition-all ${
                      activeJournal?.id === journal.id
                        ? "bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 border border-violet-500/30 text-white shadow-lg"
                        : "hover:bg-slate-800/50 border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{templates.find(t => t.id === journal.template)?.icon || "📝"}</span>
                      <span className="truncate font-medium">{journal.title}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => handleToggleStar(journal, e)} className="text-slate-500 hover:text-amber-500">
                        {journal.isStarred ? "★" : "☆"}
                      </button>
                      <button onClick={(e) => handleDeleteJournal(journal.id, e)} className="text-slate-500 hover:text-red-400">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

        {/* User Info Foot block */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-850/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center font-bold text-violet-400 text-sm">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-semibold truncate">{user?.email}</p>
            <p className="text-[10px] text-slate-500 tracking-wider">CREATOR MODE</p>
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────────────
          CENTER WRITING CANVAS: Core visual workspace
          ────────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col bg-[#050914] overflow-hidden relative">
        {activeJournal ? (
          <>
            {/* Editor Top Bar with Status and Moving Category Options */}
            <header className="h-16 border-b border-slate-900 px-6 flex items-center justify-between backdrop-blur bg-slate-950/80 z-10">
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="text"
                  value={activeJournal.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-transparent text-lg font-bold text-white border-b border-transparent focus:border-violet-500 focus:outline-none py-1 w-64 md:w-96 transition-all"
                  placeholder="Journal Title"
                />
                
                {/* Save status */}
                <div className="flex items-center gap-1.5 text-xs">
                  {saveStatus === "saving" && (
                    <span className="flex items-center gap-1 text-violet-400">
                      <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                    </span>
                  )}
                  {saveStatus === "saved" && (
                    <span className="text-emerald-500 flex items-center gap-1">
                      ✓ Saved to Cloud
                    </span>
                  )}
                  {saveStatus === "error" && (
                    <span className="text-red-400 flex items-center gap-1">
                      ⚠️ Sync failed
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons (Starring and moving folders) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleToggleStar(activeJournal, e)}
                  className={`p-2 rounded-xl border transition-all ${
                    activeJournal.isStarred
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                  title={activeJournal.isStarred ? "Starred" : "Star project"}
                >
                  <Star className="w-4 h-4" />
                </button>

                {/* Move to folder dropdown select */}
                <select
                  value={activeJournal.folderId || ""}
                  onChange={(e) => handleMoveToFolder(activeJournal.id, e.target.value || null)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="">Move to Category...</option>
                  {folders.map(f => (
                    <option key={f.id} value={f.id}>
                      📁 {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            {/* Editor Area with Floating Glassmorphic Formatting Toolbar */}
            <div className="flex-1 overflow-y-auto px-6 py-10 relative flex justify-center scrollbar-thin">
              <div className="w-full max-w-3xl flex flex-col relative h-fit">
                
                {/* Floating Glassmorphic Toolbar */}
                <div className="sticky top-0 z-20 flex justify-center mb-6">
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-2xl">
                    <button onClick={() => execCommand("bold")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Bold">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button onClick={() => execCommand("italic")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Italic">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button onClick={() => execCommand("underline")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Underline">
                      <Underline className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-slate-800 mx-1" />
                    <button onClick={() => execCommand("formatBlock", "<h1>")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Header 1">
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button onClick={() => execCommand("formatBlock", "<h2>")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Header 2">
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => execCommand("formatBlock", "<blockquote>")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="Blockquote">
                      <Quote className="w-4 h-4" />
                    </button>
                    <button onClick={() => execCommand("insertUnorderedList")} className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all" title="List">
                      <List className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-slate-800 mx-1" />
                    <button
                      onClick={handleCaptureHighlight}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 text-violet-300 hover:text-white text-xs font-bold transition-all shadow-md"
                      title="Ask AI about selected text"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Critique Selection</span>
                    </button>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="relative bg-slate-900/10 border border-slate-900/60 rounded-3xl p-8 min-h-[600px] shadow-2xl backdrop-blur-sm">
                  {/* Custom CSS placeholders */}
                  {!editorContent && !isEditorFocused && (
                    <div className="absolute top-8 left-8 text-slate-600 pointer-events-none select-none italic text-base">
                      Start writing your masterpiece... (Highlight text to ask AI, or use the right panel to brainstorm concepts and generate custom artwork).
                    </div>
                  )}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    onFocus={() => setIsEditorFocused(true)}
                    onBlur={() => setIsEditorFocused(false)}
                    className="prose prose-invert max-w-none focus:outline-none min-h-[550px] text-slate-200 text-base leading-relaxed"
                    style={{
                      caretColor: "#a855f7",
                    }}
                  />
                </div>
                
                {/* Footer notes */}
                <p className="text-[11px] text-slate-600 mt-4 text-center">
                  Pressing keys automatically triggers secure auto-save. Use templates to swap structured layouts.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-radial-gradient">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-850 flex items-center justify-center mb-6 shadow-2xl">
              <BookOpen className="w-8 h-8 text-violet-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Build the Future of Creativity</h2>
            <p className="text-slate-400 max-w-sm mb-6 text-sm">
              Collaborate with AI to draft stories, write screenplays, structure poems, and generate visual artwork all inside one seamless creative studio.
            </p>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm shadow-xl hover:shadow-violet-500/20 hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Journal</span>
            </button>
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────────────
          RIGHT SIDEBAR: AI Chat Assistant + Art generator
          ────────────────────────────────────────────────────────────────── */}
      <aside className="w-[380px] bg-slate-900/40 backdrop-blur-xl border-l border-slate-800/80 flex flex-col overflow-hidden">
        
        {/* Toggle Assistant Mode Tabs (Chat vs Art) */}
        <div className="grid grid-cols-2 border-b border-slate-800/60 bg-slate-950/20">
          <button
            onClick={() => setAiTab("chat")}
            className={`py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
              aiTab === "chat"
                ? "border-violet-500 text-violet-400 bg-violet-500/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Muse Chat</span>
          </button>
          <button
            onClick={() => setAiTab("art")}
            className={`py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
              aiTab === "art"
                ? "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>AI Art Studio</span>
          </button>
        </div>

        {/* Tab 1: Contextual Chat Panel */}
        {aiTab === "chat" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Scrollable messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {chatMessages.length === 0 ? (
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto">
                    <Sparkle className="w-5 h-5 text-violet-400" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-200">Creative AI Muse</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                    I have complete context of your writing canvas. Highlight text and click "Critique Selection", or ask me to write the next section!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col space-y-1 ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest px-1">
                        {msg.role === "user" ? "You" : "Muse AI"}
                      </span>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap border ${
                          msg.role === "user"
                            ? "bg-slate-800/80 border-slate-700/80 text-slate-100"
                            : "bg-violet-950/20 border-violet-900/30 text-slate-200 shadow-md"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Insertion controls for Assistant messages */}
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-1 px-1">
                          <button
                            onClick={() => insertTextAtCursor(msg.content)}
                            className="flex items-center gap-1 text-[10px] text-violet-400 hover:text-violet-300 font-bold bg-slate-900/50 hover:bg-slate-800/80 px-2 py-1 rounded border border-slate-800 transition-all"
                            title="Insert this text directly at your canvas cursor position"
                          >
                            <span>Insert at cursor</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => handleCopyToClipboard(msg.content)}
                            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-300 font-bold bg-slate-900/50 hover:bg-slate-800/80 px-2 py-1 rounded border border-slate-800 transition-all"
                          >
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* AI Generating visual placeholder */}
                  {chatLoading && (
                    <div className="flex flex-col space-y-1 items-start">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">Muse AI</span>
                      <div className="p-3 rounded-2xl bg-violet-950/15 border border-violet-900/20 text-slate-400 text-xs flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                        <span>Channeling creativity...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-800/60 bg-slate-950/30">
              
              {/* Highlight badge indicator */}
              {highlightedText && (
                <div className="flex items-center justify-between bg-violet-600/10 border border-violet-500/20 rounded-xl px-3 py-1.5 mb-2.5 text-[10px] text-violet-300 font-bold">
                  <span className="truncate max-w-[200px]">Context: "{highlightedText}"</span>
                  <button onClick={() => setHighlightedText("")} className="hover:text-red-400 transition-colors">
                    Remove
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    activeJournal
                      ? "Ask Muse to write, edit, outline..."
                      : "Select a journal to chat"
                  }
                  disabled={!activeJournal || chatLoading}
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-violet-500 focus:outline-none text-slate-200 text-xs rounded-xl px-3.5 py-2.5 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!activeJournal || chatLoading || !chatInput.trim()}
                  className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-[1.03]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Visual Generation Panel */}
        {aiTab === "art" && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-6 scrollbar-thin">
            
            {/* Form */}
            <form onSubmit={handleGenerateArt} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  AI Art Styles
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "digital-art", name: "Digital Art 💻" },
                    { id: "watercolor", name: "Watercolor 💧" },
                    { id: "cinematic", name: "Cinematic 🎬" },
                    { id: "oil-painting", name: "Oil Canvas 🎨" },
                    { id: "fantasy", name: "Fantasy ✨" },
                    { id: "scifi-neon", name: "Cyberpunk 👾" }
                  ].map(styleOpt => (
                    <button
                      key={styleOpt.id}
                      type="button"
                      onClick={() => setArtStyle(styleOpt.id)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        artStyle === styleOpt.id
                          ? "bg-fuchsia-600/25 border-fuchsia-500/50 text-fuchsia-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {styleOpt.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Artwork Prompt
                </label>
                <textarea
                  value={artPrompt}
                  onChange={(e) => setArtPrompt(e.target.value)}
                  placeholder="e.g. A solitary wizard standing at the edge of a floating crystal island under a lilac sky..."
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-fuchsia-500 focus:outline-none text-slate-200 text-xs rounded-xl p-3 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={artLoading || !artPrompt.trim() || !activeJournal}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg hover:shadow-fuchsia-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                {artLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Painting concept art...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Generate Artwork</span>
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {artError && (
              <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-red-400 text-xs leading-relaxed">
                ⚠️ {artError}
              </div>
            )}

            {/* Generated Output */}
            {generatedImgUrl ? (
              <div className="space-y-3 bg-slate-950/40 border border-slate-800/60 rounded-2xl p-3">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img src={generatedImgUrl} alt="AI output" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => embedImageInJournal(generatedImgUrl)}
                    className="flex-1 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Embed in Journal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={generatedImgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all text-center"
                    title="Open full size"
                  >
                    ↗
                  </a>
                </div>
              </div>
            ) : (
              !artLoading && (
                <div className="border border-dashed border-slate-800 rounded-2xl py-12 text-center text-slate-600 text-xs">
                  Generated artwork displays here. Embed them directly beside your prose.
                </div>
              )
            )}

          </div>
        )}
      </aside>

      {/* ──────────────────────────────────────────────────────────────────
          MODAL: FOLDER CREATION
          ────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showFolderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-96 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <h3 className="font-bold text-base text-white">Create New Folder</h3>
                <button onClick={() => setShowFolderModal(false)} className="text-slate-500 hover:text-slate-300 text-sm">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. Science Fiction, Romance, Lyrics"
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 focus:outline-none text-slate-200 text-xs rounded-xl px-3.5 py-2.5 transition-all"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFolderModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-850 hover:bg-slate-900 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    Create Folder
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────
          MODAL: TEMPLATE SELECTION
          ────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-[500px] bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <h3 className="font-bold text-base text-white">Select a Project Template</h3>
                <button onClick={() => setShowTemplateModal(false)} className="text-slate-500 hover:text-slate-300 text-sm">
                  ✕
                </button>
              </div>

              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
                {templates.map(tpl => (
                  <div
                    key={tpl.id}
                    onClick={() => handleCreateJournal(tpl.id)}
                    className="group flex items-start gap-4 p-3 rounded-2xl bg-slate-950/40 hover:bg-violet-600/10 border border-slate-800/80 hover:border-violet-500/30 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <div className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-850 group-hover:bg-violet-950/20 transition-all">
                      {tpl.icon}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h4 className="font-bold text-xs text-slate-200 group-hover:text-violet-300 transition-colors">
                        {tpl.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        {tpl.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-850 text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CreativeJournalTool;

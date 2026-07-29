import { useState, useEffect } from "react";
import { ArrowRight, FileText, Folder, Image as ImageIcon, Plus, Sparkles, UploadCloud, Video, Loader2 } from "lucide-react";
import { figmaAssets } from "../webappData";
import { webappApi } from "../../../lib/webappApi";

export default function MediaView() {
  const [activeTab, setActiveTab] = useState("AI Photo Manager");

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] overflow-y-auto w-full">
      <div className="flex gap-4 mb-8 p-2 rounded-2xl border border-gray-100 w-fit">
        {["AI Photo Manager", "Add Media", "Create Collection", "Add Images to Collection"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab 
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "AI Photo Manager" && <AIPhotoManager />}
      {activeTab === "Add Media" && <AddMedia />}
      {activeTab === "Create Collection" && <CreateCollection />}
      {activeTab === "Add Images to Collection" && <AddImagesToCollection />}
    </div>
  );
}

function AIPhotoManager() {
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    webappApi.getCollections()
      .then(res => setCollections(res))
      .catch(console.error);
  }, []);

  return (
    <div className="rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold ">AI Photo Manager</h2>
          <p className="text-gray-500 text-sm">Organize, enhance, and transform your artworks with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {collections.length > 0 ? collections.map((col) => (
          <div key={col.id} className="border border-gray-200 p-6 rounded-2xl hover:border-blue-300 hover: transition cursor-pointer group">
            <Folder className="text-yellow-400 w-10 h-10 mb-4 group-hover:scale-110 transition" />
            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  mb-1">{col.name}</h3>
            <p className="text-xs text-gray-500">{col.tags?.join(", ")}</p>
          </div>
        )) : [1, 2, 3].map((folder) => (
          <div key={folder} className="border border-gray-200 p-6 rounded-2xl hover:border-blue-300 hover: transition cursor-pointer group">
            <Folder className="text-yellow-400 w-10 h-10 mb-4 group-hover:scale-110 transition" />
            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  mb-1">Generated Artworks #{folder}</h3>
            <p className="text-xs text-gray-500">12 files - Last updated 2 days ago</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center">
        <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-2">Upload for AI Processing</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Drop your images here to automatically tag, enhance, and organize them using Vizzy AI.</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30">
          Select Files
        </button>
      </div>
    </div>
  );
}

function AddMedia() {
  return (
    <div className="rounded-3xl p-8">
      <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold  mb-2">Add Media</h2>
      <p className="text-gray-500 text-sm mb-8">Upload raw images, videos, or source files</p>

      <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-3xl p-16 text-center hover:bg-blue-50 transition cursor-pointer">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus size={32} className="text-blue-600" />
        </div>
        <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-xl font-bold  mb-2">Drag and drop your media</h3>
        <p className="text-gray-500 mb-6">Support for JPG, PNG, MP4, and PSD up to 50MB</p>
        <div className="flex justify-center gap-4 text-gray-400">
          <ImageIcon size={24} /> <Video size={24} /> <FileText size={24} />
        </div>
      </div>
    </div>
  );
}

function CreateCollection() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreate = async () => {
    if (!name) return;
    setLoading(true);
    setSuccess(false);
    try {
      await webappApi.createCollection({ name, description });
      setSuccess(true);
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl rounded-3xl p-8">
      <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold  mb-6">Create New Collection</h2>
      
      {success && (
        <div className="mb-6 rounded-[8px] bg-green-50 p-4 border border-green-200 text-green-700 font-medium">
          Collection created successfully!
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Collection Name</label>
          <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="e.g. Summer Dreams 2026" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the theme and context of this collection..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-bold text-blue-600">Browse</span> <span className="text-sm text-gray-500">to upload cover</span>
          </div>
        </div>
        <button 
          onClick={handleCreate} 
          disabled={loading || !name}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </div>
    </div>
  );
}

function AddImagesToCollection() {
  const [media, setMedia] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    webappApi.getMedia({ limit: 20 })
      .then(res => setMedia(res.items || []))
      .catch(console.error);
  }, []);

  const toggleSelect = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const displayMedia = media.length > 0 ? media : Array.from({ length: 10 }).map((_, i) => ({ id: i, url: figmaAssets.soloRafting }));

  return (
    <div className="rounded-3xl p-8">
      <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold  mb-2">Add Images to Collection</h2>
      <p className="text-gray-500 text-sm mb-8">Select multiple artworks to add to collection</p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {displayMedia.map((img) => (
          <div key={img.id} onClick={() => toggleSelect(img.id)} className={`relative aspect-square rounded-2xl overflow-hidden group border-2 ${selected.has(img.id) ? 'border-blue-500' : 'border-gray-200 cursor-pointer'}`}>
             <img src={img.url || figmaAssets.soloRafting} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Art" />
             <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border flex items-center justify-center transition ${selected.has(img.id) ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white/80 border-gray-300 group-hover:border-blue-500'}`}>
                {selected.has(img.id) && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
             </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <span className="font-medium text-gray-600">{selected.size} images selected</span>
        <button disabled={selected.size === 0} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md disabled:opacity-50">Add to Collection</button>
      </div>
    </div>
  );
}

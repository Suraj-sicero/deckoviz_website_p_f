import {
  Bookmark,
  Image as ImageIcon,
  MessageSquare,
  Mic,
  MoreVertical,
  Paperclip,
  Send,
  Share2,
  Smile,
  ThumbsUp,
} from "lucide-react";
import { figmaAssets } from "../webappData";

const posts = [
  {
    id: 1,
    user: {
      name: "Emma wilson",
      title: "Product Designer, Sloth UI",
      avatar: figmaAssets.emmaAvatar,
    },
    content:
      "This piece is a reflection of everything we carry inside - joy, chaos, calm, wonder. Art, for me, is a bridge between what we feel and what we see.",
    tags: ["#EmotionalArt", "#Inspiration", "#ArtLovers"],
    image: figmaAssets.dreamBoatPost,
    likes: 12,
    comments: 25,
    shares: 186,
  },
  {
    id: 2,
    user: {
      name: "Emma wilson",
      title: "Product Designer, Sloth UI",
      avatar: figmaAssets.surajAvatar,
    },
    content:
      "This piece is a reflection of everything we carry inside - joy, chaos, calm, wonder. Art, for me, is a bridge between what we feel and what we see.",
    tags: ["#EmotionalArt", "#Inspiration", "#ArtLovers"],
    image: figmaAssets.dreamBoatPost,
    likes: 12,
    comments: 25,
    shares: 186,
  },
];

export default function SearchView() {
  return (
    <div className="relative flex w-full justify-center pb-20 pt-4 font-sans">
      <div className="w-full max-w-[1090px]">
        <div className="relative z-10 mb-0 flex w-full overflow-hidden rounded-t-[4px] border border-gray-100 p-0">
          {["For you", "Following"].map((tab, index) => (
            <button
              key={tab}
              className={`flex-1 border-b-2 py-4 text-[16px] font-semibold transition ${
                index === 0 ? "border-[#2f7bd0] text-black" : "border-gray-200 text-black hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-1 flex min-h-[139px] flex-col gap-4 rounded-b-[4px] border border-t-0 border-gray-100 p-5 text-gray-800">
          <div className="flex items-start gap-3">
            <Paperclip size={18} className="mt-0.5 shrink-0 text-[#445dc0]" />
            <input
              type="text"
              placeholder="What's on your mind right now?"
              className="w-full bg-transparent text-[16px] font-medium outline-none placeholder:text-black"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            {[ImageIcon, Smile, Mic].map((Icon, index) => (
              <button
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-50"
              >
                <Icon size={21} strokeWidth={1.7} />
              </button>
            ))}
            <button className="flex items-center gap-2 rounded-[18px] bg-[#4657bd] px-7 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#344497]">
              Post
              <Send size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {posts.map((post) => (
            <article key={post.id} className="border border-gray-100 p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="h-[46px] w-[46px] rounded-full border border-gray-100 object-cover p-0.5 shadow-sm"
                  />
                  <div>
                    <h4 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[15px] font-bold ">{post.user.name}</h4>
                    <span className="text-[10px] font-medium text-[#62656d]">{post.user.title}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-black">
                  <MoreVertical size={22} />
                </button>
              </div>

              <p className="mb-4 text-[13px] font-medium leading-relaxed text-black">
                {post.content}{" "}
                <span className="font-semibold text-[#2b65ac]">{post.tags.join(" ")}</span>
              </p>

              <div className="mb-5 h-[250px] w-full overflow-hidden rounded-[7px]">
                <img src={post.image} alt="Dream boat artwork" className="h-full w-full object-cover" />
              </div>

              <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-5 text-[12px] font-medium text-[#4c5058]">
                <div className="flex items-center gap-16">
                  <button className="flex items-center gap-2 transition hover:text-[#4657bd]">
                    <ThumbsUp size={17} />
                    {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 transition hover:text-[#4657bd]">
                    <MessageSquare size={17} />
                    {post.comments} Comments
                  </button>
                  <button className="flex items-center gap-2 transition hover:text-[#4657bd]">
                    <Share2 size={17} />
                    {post.shares} Share
                  </button>
                </div>
                <button className="transition hover:text-[#4657bd]">
                  <Bookmark size={19} />
                </button>
              </div>

              <div className="flex items-center gap-5">
                <img src={figmaAssets.emmaAvatar} alt="" className="h-[42px] w-[42px] rounded-full object-cover" />
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Write your comments..."
                    className="h-[45px] w-full rounded-[7px] border border-[#e2e3e7] bg-[#f7f7f8] pl-7 pr-12 text-[14px] font-medium shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4657bd]">
                    <Send size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Smile,
  Mic,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MoreHorizontal,
  BadgeCheck,
  ChevronDown,
  ArrowUpDown,
  Pencil,
  Loader2
} from "lucide-react";
import { figmaAssets } from "../webappData";
import { webappApi } from "../../../lib/webappApi";

/* ───── Data ───── */
const fallbackComments = [
  {
    id: 1,
    user: "Harry Kington",
    avatar: figmaAssets.surajAvatar,
    time: "28 minutes ago",
    text: "The composition and emotion in this piece are truly captivating. I love how the details subtly guide the viewer's eye, and the use of color/texture brings such depth and feeling. Beautifully done!",
    likes: 12,
    dislikes: 3,
    verified: false,
    replies: [
      {
        id: 11,
        user: "Emma stone",
        avatar: figmaAssets.emmaAvatar,
        time: "28 minutes ago",
        text: "The composition and emotion in this piece are truly captivating. I love how the details subtly guide the viewer's eye, and the use of color/texture brings such depth and feeling. Beautifully done!",
        likes: 12,
        dislikes: 3,
        verified: true,
      },
    ],
  },
  {
    id: 2,
    user: "Harry Kington",
    avatar: figmaAssets.surajAvatar,
    time: "28 minutes ago",
    text: "The composition and emotion in this piece are truly captivating. I love how the details subtly guide the viewer's eye, and the use of color/texture brings such depth and feeling. Beautifully done!",
    likes: 12,
    dislikes: 3,
    verified: false,
    replies: [],
  }
];

export default function CommentsView({ postId = "1" }: { postId?: string }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await webappApi.getComments(postId);
      setComments(res.length ? res : fallbackComments);
    } catch (err) {
      console.error(err);
      setComments(fallbackComments);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await webappApi.createComment(postId, { content: commentText });
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full justify-center pb-20 pt-6 font-sans">
      <div className="w-full max-w-[1056px]">
        {/* ─── Add Comment Box ─── */}
        <div className="mb-6 rounded-[12px] border border-[#e5e7eb] px-6 py-5">
          <div className="flex items-start gap-3 mb-4">
            <Pencil size={18} className="mt-1 shrink-0 text-[#6b7280]" />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a Comment..."
              className="min-h-[60px] w-full resize-none bg-transparent text-[15px] font-medium text-[#1f2937] outline-none placeholder:text-[#6b7280]"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition hover:bg-gray-50">
              <ImageIcon size={18} />
            </button>
            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition hover:bg-gray-50">
              <Smile size={18} />
            </button>
            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e5e7eb] text-[#6b7280] transition hover:bg-gray-50">
              <Mic size={18} />
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={submitting || !commentText.trim()}
              className="flex items-center justify-center ml-1 h-[36px] min-w-[80px] rounded-[8px] bg-[#f04444] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#dc2626] disabled:opacity-50"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : "Submit"}
            </button>
          </div>
        </div>

        {/* ─── Comment List Header ─── */}
        <div className="rounded-t-[12px] border border-b-0 border-[#e5e7eb] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[20px] font-bold ">Comments</h2>
              <span className="flex h-[26px] items-center rounded-full bg-[#4657bd] px-3 text-[13px] font-bold text-white">
                {comments.length}
              </span>
            </div>
            <button className="flex items-center gap-2 text-[14px] font-medium text-[#374151] transition hover:text-[#111827]">
              <ArrowUpDown size={16} />
              Most Recent
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* ─── Comments List ─── */}
        <div className="rounded-b-[12px] border border-[#e5e7eb]">
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>
          ) : (
            comments.map((comment, idx) => (
              <div
                key={comment.id}
                className={`px-6 py-6 ${idx < comments.length - 1 ? "border-b border-[#f3f4f6]" : ""}`}
              >
                {/* Main Comment */}
                <CommentItem
                  user={comment.user?.name || comment.user || "User"}
                  avatar={comment.user?.avatar || comment.avatar || figmaAssets.surajAvatar}
                  time={comment.time || "Just now"}
                  text={comment.content || comment.text}
                  likes={comment.likes || 0}
                  dislikes={comment.dislikes || 0}
                  verified={comment.verified || false}
                />

                {/* Replies (indented) */}
                {comment.replies?.map((reply: any) => (
                  <div key={reply.id} className="ml-12 mt-5 rounded-[8px] border-l-[3px] border-[#e5e7eb] pl-5">
                    <CommentItem
                      user={reply.user?.name || reply.user || "User"}
                      avatar={reply.user?.avatar || reply.avatar || figmaAssets.emmaAvatar}
                      time={reply.time || "Just now"}
                      text={reply.content || reply.text}
                      likes={reply.likes || 0}
                      dislikes={reply.dislikes || 0}
                      verified={reply.verified || false}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  user,
  avatar,
  time,
  text,
  likes,
  dislikes,
  verified,
}: {
  user: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  dislikes: number;
  verified: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <img
          src={avatar}
          alt={user}
          className="h-[38px] w-[38px] rounded-full border border-gray-100 object-cover"
        />
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#111827]">{user}</span>
          {verified && <BadgeCheck size={16} className="text-[#3b82f6]" />}
        </div>
        <span className="text-[13px] text-[#9ca3af]">{time}</span>
      </div>

      <p className="mb-4 pl-[50px] text-[14px] leading-relaxed text-[#374151]">{text}</p>

      <div className="flex items-center gap-6 pl-[50px]">
        <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4b5563] transition hover:text-[#3b82f6]">
          <ThumbsUp size={15} />
          {likes} Likes
        </button>
        <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4b5563] transition hover:text-[#ef4444]">
          <ThumbsDown size={15} />
          {dislikes} dislike
        </button>
        <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4b5563] transition hover:text-[#3b82f6]">
          <MessageSquare size={15} />
          Reply
        </button>
        <button className="text-[#9ca3af] transition hover:text-[#374151]">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

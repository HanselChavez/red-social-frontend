import type { Post } from "@/types/auth";
import { ThumbsUp, MessageCircle } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PostCard({ post }: { post: Post }) {
    const likesCount = post.reactions?.length || 0;
    const commentsCount = post.comments?.length || 0;

    const avatarUrl = post.user?.profile?.avatar
        ? post.user.profile.avatar
        : "https://i.pravatar.cc/40";

    return (
        <div className="bg-card text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-2xl p-4 shadow-sm transition-colors">
            <div className="flex gap-3">
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.user?.profile?.username || "Usuario"}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <p className="mt-4 text-gray-900 dark:text-white">
                {post.content}
            </p>

            {post.imageUrl && (
                <div className="mt-4 w-full h-[360px] bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden flex items-center justify-center transition-colors">
                    <img
                        src={`${BACKEND_URL}${post.imageUrl}`}
                        alt="Imagen del post"
                        className="w-full h-full object-contain"
                    />
                </div>
            )}

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        👍
                    </span>
                    <span>{likesCount}</span>
                </div>

                <span>{commentsCount} comentarios</span>
            </div>

            <div className="mt-2 border-t border-gray-300 dark:border-gray-700 pt-2 flex items-center justify-around text-gray-600 dark:text-gray-400">
                <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2b2b2b] hover:text-gray-900 dark:hover:text-white transition">
                    <ThumbsUp size={20} />
                    <span>Me gusta</span>
                </button>

                <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2b2b2b] hover:text-gray-900 dark:hover:text-white transition">
                    <MessageCircle size={20} />
                    <span>Comentar</span>
                </button>
            </div>
        </div>
    );
}
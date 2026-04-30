// src/components/post/PostCard.tsx

import type { Post } from "@/types/auth";

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="bg-[#232323] border border-gray-700 rounded-2xl p-4 space-y-3">
            <div className="flex gap-3">
                <img
                    src={`${post.user.profile.avatar ? post.user.profile.avatar : "https://i.pravatar.cc/40"}`}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="font-semibold">
                        {post.user?.profile?.username}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <p>{post.content}</p>
        </div>
    );
}

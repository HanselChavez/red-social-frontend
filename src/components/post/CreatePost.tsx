// src/components/post/CreatePost.tsx
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

interface Props {
    onCreate: (content: string) => Promise<void>;
}

export default function CreatePost({ onCreate }: Props) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useAuthStore();
    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            setLoading(true);
            await onCreate(content);
            setContent("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#232323] border border-gray-700 rounded-2xl p-4">
            <div className="flex gap-3">
                <img
                      src={`${user!.profile.avatar ? user!.profile.avatar : "https://i.pravatar.cc/40"}`}
                    className="w-10 h-10 rounded-full"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="¿Qué tienes en mente?"
                    className="w-full bg-[#2f2f2f] rounded-2xl p-4 text-white resize-none outline-none"
                    rows={4}
                />
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-yellow-600 px-5 py-2 rounded-full"
                >
                    {loading ? "Publicando..." : "Postear"}
                </button>
            </div>
        </div>
    );
}

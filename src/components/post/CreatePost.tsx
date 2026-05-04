import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

interface Props {
    onCreate: (content: string, image?: File | null) => Promise<void>;
}

export default function CreatePost({ onCreate }: Props) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { user } = useAuthStore();

    const handleSubmit = async () => {
        if (!content.trim() && !image) return;

        try {
            setLoading(true);
            await onCreate(content, image);

            setContent("");
            setImage(null);
            setPreview(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-4 shadow-sm transition-colors">
            <div className="flex gap-3">
                <img
                    src={
                        user?.profile?.avatar
                            ? user.profile.avatar
                            : "https://i.pravatar.cc/40"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Avatar"
                />

                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Qué tienes en mente?"
                        className="w-full bg-gray-100 dark:bg-[#2b2b2b] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        rows={4}
                    />

                    {preview && (
                        <div className="mt-4 w-full h-[300px] bg-gray-100 rounded-2xl border border-gray-300 overflow-hidden flex items-center justify-center">
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-4">
                        <label className="cursor-pointer bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-full transition font-medium shadow-sm">
                            Agregar imagen
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                            />
                        </label>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-full transition font-medium disabled:opacity-50 shadow-sm"
                        >
                            {loading ? "Publicando..." : "Postear"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
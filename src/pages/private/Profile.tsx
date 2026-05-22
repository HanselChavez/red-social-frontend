import { useEffect, useState } from "react";
import {
    CalendarDays,
    Camera,
    Heart,
    ImageIcon,
    Mail,
    MapPin,
    MessageCircle,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    updateAvatarRequest,
    updateCoverImageRequest,
} from "@/api/user.api";

import { useAuthStore } from "@/store/auth.store";
import {
    deletePostRequest,
    getMyPostsRequest,
    updatePostRequest,
    updatePostVisibilityRequest,
} from "@/api/post.api";
import type { Post } from "@/types/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=UniConnect&background=facc15&color=000";

const DEFAULT_COVER =
    "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1400&auto=format&fit=crop";

const getImageUrl = (imageUrl?: string | null) => {
    if (!imageUrl) return "";

    if (imageUrl.startsWith("http")) {
        return imageUrl;
    }

    return `${BACKEND_URL}${imageUrl}`;
};

type TabType = "posts" | "media" | "likes";

export default function Profile() {
    const { user, updateUserProfile } = useAuthStore();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>("posts");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    const [localAvatar, setLocalAvatar] = useState<string | null>(null);
    const [localCover, setLocalCover] = useState<string | null>(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);

    const profile = user?.profile;

    const fullName =
        `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
        "Usuario";

    const username = profile?.username || "usuario";

    const avatarUrl =
        localAvatar ||
        (profile?.avatar && profile.avatar.startsWith("http")
            ? profile.avatar
            : DEFAULT_AVATAR);

    const coverUrl =
        localCover ||
        (profile?.coverImage && profile.coverImage.startsWith("http")
            ? profile.coverImage
            : DEFAULT_COVER);

    const fetchMyPosts = async () => {
        try {
            const data = await getMyPostsRequest();
            setPosts(data);
        } catch (error) {
            console.error("Error cargando posts del perfil", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const postsWithImage = posts.filter((post) => post.imageUrl);

    const visiblePosts =
        activeTab === "media"
            ? postsWithImage
            : activeTab === "likes"
                ? posts.filter((post) => (post.reactions?.length || 0) > 0)
                : posts;

    const handleAvatarChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploadingAvatar(true);

            const updatedProfile = await updateAvatarRequest(file);

            setLocalAvatar(updatedProfile.avatar);
            updateUserProfile(updatedProfile);
        } catch (error) {
            console.error("Error actualizando avatar", error);
            alert("No se pudo actualizar la foto de perfil");
        } finally {
            setUploadingAvatar(false);
            event.target.value = "";
        }
    };

    const handleCoverChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploadingCover(true);

            const updatedProfile = await updateCoverImageRequest(file);

            setLocalCover(updatedProfile.coverImage);
            updateUserProfile(updatedProfile);
        } catch (error) {
            console.error("Error actualizando portada", error);
            alert("No se pudo actualizar la portada");
        } finally {
            setUploadingCover(false);
            event.target.value = "";
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Eliminar este post?")) return;

        try {
            await deletePostRequest(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch {
            alert("Error al eliminar el post");
        }
    };

    const handleEdit = (post: Post) => {
        setEditingId(post.id);
        setEditContent(post.content);
    };

    const handleSaveEdit = async (id: number) => {
        if (!editContent.trim()) return;

        try {
            await updatePostRequest(id, { content: editContent });

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === id ? { ...post, content: editContent } : post,
                ),
            );

            setEditingId(null);
            setEditContent("");
        } catch {
            alert("Error al actualizar el post");
        }
    };

    const handleVisibility = async (
        id: number,
        visibility: "public" | "friends" | "private",
    ) => {
        try {
            await updatePostVisibilityRequest(id, visibility);

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === id ? { ...post, visibility } : post,
                ),
            );
        } catch {
            alert("Error al actualizar visibilidad");
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-44 md:h-56">
                    <img
                        src={coverUrl}
                        alt="Portada"
                        className="w-full h-full object-cover"
                    />

                    <label className="absolute right-4 bottom-4 bg-black/60 hover:bg-black/80 text-white rounded-full px-4 py-2 transition cursor-pointer flex items-center gap-2 text-sm">
                        <Camera size={18} />
                        {uploadingCover ? "Subiendo..." : "Cambiar portada"}

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            className="hidden"
                            onChange={handleCoverChange}
                            disabled={uploadingCover}
                        />
                    </label>
                </div>

                <div className="relative px-6 pb-6">
                    <div className="flex items-end justify-between">
                        <div className="relative -mt-12">
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-background bg-background"
                            />

                            <label className="absolute right-0 bottom-0 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full p-2 cursor-pointer shadow transition">
                                <Camera size={16} />

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/jpg"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    disabled={uploadingAvatar}
                                />
                            </label>
                        </div>

                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full transition">
                            Editar perfil
                        </button>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold text-foreground">
                            {fullName}
                        </h1>

                        <p className="text-muted-foreground">@{username}</p>

                        <p className="mt-4 max-w-2xl text-sm text-foreground">
                            {profile?.bio ||
                                "Estudiante universitario usando UniConnect para compartir publicaciones, ideas y momentos."}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Mail size={16} />
                                {user?.email}
                            </span>

                            <span className="flex items-center gap-1">
                                <MapPin size={16} />
                                Universidad
                            </span>

                            <span className="flex items-center gap-1">
                                <CalendarDays size={16} />
                                Miembro de UniConnect
                            </span>
                        </div>

                        <div className="mt-4 flex gap-6 text-sm">
                            <span>
                                <b>{posts.length}</b>{" "}
                                <span className="text-muted-foreground">
                                    Posts
                                </span>
                            </span>

                            <span>
                                <b>{postsWithImage.length}</b>{" "}
                                <span className="text-muted-foreground">
                                    Media
                                </span>
                            </span>

                            <span>
                                <b>
                                    {posts.reduce(
                                        (total, post) =>
                                            total +
                                            (post.reactions?.length || 0),
                                        0,
                                    )}
                                </b>{" "}
                                <span className="text-muted-foreground">
                                    Likes
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-b border-border flex gap-8">
                <button
                    onClick={() => setActiveTab("posts")}
                    className={`pb-3 font-semibold transition ${activeTab === "posts"
                            ? "text-yellow-400 border-b-2 border-yellow-400"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Posts
                </button>

                <button
                    onClick={() => setActiveTab("media")}
                    className={`pb-3 font-semibold transition ${activeTab === "media"
                            ? "text-yellow-400 border-b-2 border-yellow-400"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Media
                </button>

                <button
                    onClick={() => setActiveTab("likes")}
                    className={`pb-3 font-semibold transition ${activeTab === "likes"
                            ? "text-yellow-400 border-b-2 border-yellow-400"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Likes
                </button>
            </div>

            {loading ? (
                <p className="text-center text-muted-foreground mt-8">
                    Cargando perfil...
                </p>
            ) : visiblePosts.length === 0 ? (
                <div className="mt-8 bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
                    {activeTab === "media" ? (
                        <>
                            <ImageIcon className="mx-auto mb-3" size={36} />
                            No tienes publicaciones con imágenes.
                        </>
                    ) : activeTab === "likes" ? (
                        <>
                            <Heart className="mx-auto mb-3" size={36} />
                            Aún no tienes posts con reacciones.
                        </>
                    ) : (
                        "Aún no tienes publicaciones."
                    )}
                </div>
            ) : activeTab === "media" ? (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visiblePosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-card border border-border rounded-2xl overflow-hidden"
                        >
                            <img
                                src={getImageUrl(post.imageUrl)}
                                alt="Post"
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-3">
                                <p className="text-sm line-clamp-2">
                                    {post.content}
                                </p>

                                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Heart size={14} />
                                        {post.reactions?.length || 0}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={14} />
                                        {post.comments?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {visiblePosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-card border border-border rounded-2xl p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-3">
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            {fullName}
                                        </h3>

                                        <p className="text-xs text-muted-foreground">
                                            {new Date(
                                                post.createdAt,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <select
                                    value={post.visibility || "public"}
                                    onChange={(e) =>
                                        handleVisibility(
                                            post.id,
                                            e.target.value as
                                            | "public"
                                            | "friends"
                                            | "private",
                                        )
                                    }
                                    className="bg-background border border-border rounded-lg px-2 py-1 text-xs"
                                >
                                    <option value="public">Público</option>
                                    <option value="friends">Amigos</option>
                                    <option value="private">Privado</option>
                                </select>
                            </div>

                            {editingId === post.id ? (
                                <div className="mt-4 space-y-3">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                        className="w-full min-h-24 bg-background border border-border rounded-xl p-3 outline-none"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleSaveEdit(post.id)
                                            }
                                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setEditContent("");
                                            }}
                                            className="bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-4">{post.content}</p>
                            )}

                            {post.imageUrl && (
                                <img
                                    src={getImageUrl(post.imageUrl)}
                                    alt="Imagen del post"
                                    className="mt-4 w-full max-h-[420px] object-contain rounded-2xl border border-border bg-muted"
                                />
                            )}

                            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <Heart size={16} />
                                        {post.reactions?.length || 0}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={16} />
                                        {post.comments?.length || 0}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-muted transition"
                                    >
                                        <Pencil size={15} />
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                                    >
                                        <Trash2 size={15} />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
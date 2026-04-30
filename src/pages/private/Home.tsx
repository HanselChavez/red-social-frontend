import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import { usePosts } from "@/hooks/usePosts";

export default function Home() {
    const { posts, createPost, loading } = usePosts();

    return (
        <>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-[#2b2b2b] rounded-full px-4 py-3 text-gray-400">
                    🔍 Buscar UniConnect...
                </div>

                <CreatePost onCreate={createPost} />
                {loading ? (
                    <p className="text-center text-gray-400">Cargando...</p>
                ) : (
                    <PostList posts={posts} />
                )}
            </div>
        </>
    );
}

import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import { usePosts } from "@/hooks/usePosts";

export default function Home() {
    const { posts, createPost, loading } = usePosts();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-[#242424] border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 text-gray-800 dark:text-gray-200 shadow-sm transition-colors">
                🔍 Buscar UniConnect...
            </div>

            <CreatePost onCreate={createPost} />

            {loading ? (
                <p className="text-center text-gray-500">Cargando...</p>
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    );
}
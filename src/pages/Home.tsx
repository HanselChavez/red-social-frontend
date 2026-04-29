export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e1e] text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Search */}
        <div className="bg-[#2b2b2b] rounded-full px-4 py-3 text-gray-400">
          🔍 Buscar UniConnect...
        </div>

        {/* Create Post */}
        <div className="bg-[#232323] border border-gray-700 rounded-2xl p-4">
          <div className="flex gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              className="w-10 h-10 rounded-full"
            />
            <textarea
              placeholder="¿Qué tienes en mente?"
              className="w-full bg-[#2f2f2f] rounded-2xl p-4 text-white resize-none outline-none"
              rows={4}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 text-yellow-500 text-xl">
              <span>🖼️</span>
              <span>😊</span>
            </div>

            <button className="bg-yellow-600 hover:bg-yellow-500 px-5 py-2 rounded-full font-medium">
              Postear
            </button>
          </div>
        </div>

        {/* Post 1 */}
        <div className="bg-[#232323] border border-gray-700 rounded-2xl p-4 space-y-4">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/40?img=5"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-gray-400 text-sm">@sarahj · Hace 2 horas</p>
              </div>
            </div>
            <span>⋯</span>
          </div>

          <p>
            ¡Acabo de terminar mi examen final! Es hora de celebrarlo con el equipo. 🎉
          </p>

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
            className="rounded-xl w-full h-64 object-cover"
          />

          <div className="flex justify-between text-gray-400 text-sm">
            <span>234 Me gusta</span>
            <span>12 comentarios</span>
          </div>

          <div className="flex justify-around border-t border-gray-700 pt-3 text-sm">
            <button>🤍 Me gusta</button>
            <button>💬 comentar</button>
            <button>🔗 compartir</button>
            <button>🔖</button>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-[#232323] border border-gray-700 rounded-2xl p-4 space-y-4">
          <div className="flex gap-3">
            <img
              src="https://i.pravatar.cc/40?img=8"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Mike Chen</h3>
              <p className="text-gray-400 text-sm">@mikechen · hace 4 horas</p>
            </div>
          </div>

          <p>
            Preciosa puesta de sol desde la biblioteca del campus. ¡El lugar perfecto para estudiar! 📚☀️
          </p>
        </div>

      </div>
    </main>
  );
}
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          Shorten URLs
          <span className="text-blue-500"> Instantly</span>
        </h1>

        <p className="text-zinc-400 mt-6 text-lg">
          Modern URL shortening platform with analytics and authentication.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition">
            Get Started
          </button>

          <button className="border border-zinc-800 px-6 py-3 rounded-xl hover:bg-zinc-900 transition">
            Github
          </button>
        </div>
      </div>
    </main>
  );
}
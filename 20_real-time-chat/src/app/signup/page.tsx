export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F1117] p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#181C25] p-8 shadow-2xl">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="text-zinc-400">
            Join the real-time experience
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-xl border border-white/10 bg-[#222733] px-4 py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-[#222733] px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-[#222733] px-4 py-3 outline-none"
          />

          <button className="w-full rounded-xl bg-[#5B8CFF] py-3 font-semibold transition hover:opacity-90">
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}
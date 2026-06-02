"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validation";
import { authService } from "@/services";
import { useAuthStore } from "@/store";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const user = await authService.login(values.email, values.password);
      setUser(user);
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error) {
      toast.error((error as Error).message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <motion.div
        className="glass-panel w-full max-w-md rounded-[32px] p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-sm text-(--text-secondary)">
            Sign in to continue your real-time workspace.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email ? (
              <p className="text-xs text-(--danger)">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password ? (
              <p className="text-xs text-(--danger)">{errors.password.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-(--text-secondary)">
          New here?{" "}
          <Link className="text-(--accent) hover:text-(--accent-2)" href="/signup">
            Create an account
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
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
import { signupSchema } from "@/lib/validation";
import { authService } from "@/services";
import { useAuthStore } from "@/store";

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupForm) => {
    try {
      const user = await authService.signup(values.username, values.email, values.password);
      setUser(user);
      toast.success("Account created");
      router.push("/dashboard");
    } catch (error) {
      toast.error((error as Error).message || "Signup failed");
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
          <h1 className="text-3xl font-semibold">Create your account</h1>
          <p className="text-sm text-(--text-secondary)">
            Join the calm, premium real-time experience.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input type="text" placeholder="Username" {...register("username")} />
            {errors.username ? (
              <p className="text-xs text-(--danger)">{errors.username.message}</p>
            ) : null}
          </div>
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-(--text-secondary)">
          Already have an account?{" "}
          <Link className="text-(--accent) hover:text-(--accent-2)" href="/login">
            Sign in
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
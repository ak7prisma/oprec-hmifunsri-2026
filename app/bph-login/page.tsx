"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail } from "lucide-react";

const FormSchema = z.object({
  email: z.string({ required_error: "Email tidak boleh kosong" }).email({ message: "Masukkan email yang valid" }),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export default function BPHLogin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  // Cek sesi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);


  const onSubmit = async (formValues: z.infer<typeof FormSchema>) => {
    const { email, password } = formValues;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ description: "Login Berhasil, mengalihkan...", className: "bg-green-500 text-white border-none" });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        let message = "Gagal login.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          message = "Email atau password salah.";
        }
        toast({ description: message, variant: "destructive" });
      }
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 lg:p-12">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              Login Admin
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Silakan masuk untuk mengakses Dashboard Oprec
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                        <Input 
                          placeholder="nama@email.com" 
                          className="pl-10 bg-white/50 border-slate-200 focus:border-pink-500 focus:ring-pink-200 transition-all" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10 bg-white/50 border-slate-200 focus:border-pink-500 focus:ring-pink-200 transition-all" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25 rounded-xl h-12 text-base font-semibold transition-all hover:-translate-y-0.5" 
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk Dashboard"
                )}
              </Button>

            </form>
          </Form>
        </div>
      </motion.div>
    </main>
  );
}
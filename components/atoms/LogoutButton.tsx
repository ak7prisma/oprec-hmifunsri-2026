"use client";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex gap-2 items-center cursor-pointer text-xl rounded-md px-3 py-2 border-2 ring-3 hover:bg-pink-500 duration-200 hover:pl-4"
      onClick={signOutHandler}
    >
      <IoLogOutOutline className="text-slate-900 text-2xl " />
      <p className="text-slate-900 font-semibold cursor-pointer">Logout</p>
    </div>
  );
}

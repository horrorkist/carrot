import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useMutation from "../lib/useMutation";
import Link from "next/link";
import useSWR from "swr";

export default function LogIn() {
  const { data: userData } = useSWR("/api/me");
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [mutate, { data, loading }] = useMutation("/api/login");
  const onValid = (formData: any) => {
    if (loading) return;
    mutate(formData);
  };
  useEffect(() => {
    if (userData && userData.ok) {
      router.push("/");
    }
  }, [userData]);
  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
  }, [data, router]);
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-blue-500">
      <form
        className="w-[400px] h-[300px] bg-gray-600 text-white rounded-lg flex flex-col items-center"
        onSubmit={handleSubmit(onValid)}
      >
        <div className="w-full py-4 text-2xl text-center border-b border-white">
          <h3>Log In</h3>
        </div>
        <div className="flex flex-col justify-between h-full p-4 text-black">
          <div className="flex items-center mt-12">
            <input
              className="w-64 p-2 rounded-lg focus:outline-none"
              {...register("email", {
                required: true,
              })}
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex justify-center">
              <button className="px-4 py-1 bg-blue-500 rounded-lg">
                Log In
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/create-account">
                <a>Create Account &rarr;</a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";

export default function CreateAccout() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [mutate, { data }] = useMutation("/api/create");
  const onValid = (formData: any) => {
    mutate(formData);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push("log-in");
    }
  }, [data, router]);
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-blue-500">
      <form
        className="w-[400px] h-[300px] bg-gray-600 text-white rounded-lg flex flex-col items-center"
        onSubmit={handleSubmit(onValid)}
      >
        <div className="w-full py-4 text-2xl text-center border-b border-white">
          <h3>Create Account</h3>
        </div>
        <div className="flex flex-col h-full px-4 py-2 text-black justify-evenly">
          <div className="flex flex-col space-y-4">
            <div>
              <input
                className="w-64 p-2 rounded-lg focus:outline-none"
                {...register("name", { required: true })}
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                className="w-64 p-2 rounded-lg focus:outline-none"
                {...register("email", {
                  required: true,
                })}
                id="email"
                type="email"
                placeholder="Email"
              />
              <span>{data && !data.ok ? data.error : null}</span>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button className="px-4 py-1 text-white bg-blue-500 rounded-lg">
              Create Account
            </button>
          </div>
          <div className="flex justify-center text-white">
            <Link href="/log-in">
              <a>Log in &rarr;</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

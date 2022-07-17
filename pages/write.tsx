import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";

interface WriteForm {
  [key: string]: any;
}

export default function Write() {
  const { user } = useUser();
  const { register, handleSubmit } = useForm();
  const [mutate, { data }] = useMutation("/api/write");
  const router = useRouter();
  const onValid = (form: WriteForm) => {
    mutate(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
  }, [router, data]);
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-blue-500">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col items-center space-y-4"
      >
        <textarea
          {...register("text", { required: true, maxLength: 300 })}
          className="p-2 rounded-lg"
          cols={30}
          rows={10}
        ></textarea>
        <button className="w-20 px-4 py-2 text-lg text-blue-500 bg-white rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}

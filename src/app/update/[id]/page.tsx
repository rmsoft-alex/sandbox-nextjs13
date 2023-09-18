"use client";
import { fetchPostDetail } from "@/api/posts/PostDetailApi";
import { updatePost } from "@/api/posts/UpdatePostApi";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Update({ params }: { params: { id: string } }) {
  const router = useRouter();

  const id = params.id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    refresh(id);
  }, [id]);

  const refresh = async (id: string) => {
    const post = await fetchPostDetail(id);
    setTitle(post?.resultData?.title);
    setBody(post?.resultData?.body);
  };

  return (
    <form
      className="px-[10px]"
      onSubmit={async (
        e: FormEvent<HTMLFormElement> & {
          target: { title: { value: string }; body: { value: string } };
        }
      ) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        updatePost({
          id,
          title,
          body,
        });
        router.push(`/read/${id}`);
        router.refresh();
      }}
    >
      <h2 className="text-xl">게시글 수정</h2>
      <p className="flex flex-col items-center min-w-[1200px] mt-[10px]">
        <input
          className="w-full border mt-[10px] rounded p-[5px]"
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="w-full h-[200px] border mt-[20px] rounded p-[5px] resize-none"
          name="body"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
      </p>

      <p className="flex justify-end min-w-[1200px] mt-[10px]">
        <input
          className="cursor-pointer w-[60px] h-[40px] text-white bg-orange-500 rounded"
          type="submit"
          value="수정"
        />
      </p>
    </form>
  );
}

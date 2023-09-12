"use client";

import { createPost } from "@/api/posts/CreatePostApi";
import { usePostActions, usePosts } from "@/hooks/usePostStore";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  const posts = usePosts();
  const { addPost } = usePostActions();

  return (
    <form
      className="min-w-[1200px] px-[10px]"
      onSubmit={(
        e: React.FormEvent<HTMLFormElement> & {
          target: { title: { value: string }; body: { value: string } };
        }
      ) => {
        e.preventDefault();
        const id = self.crypto.randomUUID();
        const title = e.target.title.value;
        const body = e.target.body.value;

        // zustand의 action 사용
        addPost({
          id,
          title,
          body,
        });
        // 글 등록 fetch
        createPost({
          id,
          title,
          body,
        });
        router.push(`/`);
        router.refresh();
      }}
    >
      <h2 className="text-xl">게시글 등록</h2>
      <p className="flex flex-col items-center mt-[10px]">
        <input
          className="w-full border mt-[10px] rounded p-[5px]"
          type="text"
          name="title"
          placeholder="제목"
        />
        <textarea
          className="w-full h-[200px] border mt-[20px] rounded p-[5px] resize-none"
          name="body"
          placeholder="내용"
        ></textarea>
      </p>
      <p className="flex justify-end mt-[10px]">
        <input
          className="cursor-pointer w-[60px] h-[40px] text-white bg-orange-500 rounded"
          type="submit"
          value="등록"
        />
      </p>
    </form>
  );
}

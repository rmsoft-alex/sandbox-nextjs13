"use client";

import { deletePost } from "@/api/posts/DeletePostApi";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const id = params.id as string;

  return (
    <ul className="flex justify-end min-w-[1200px] m-[10px]">
      {pathName.split("/")[1] === "read" ? (
        <>
          <li>
            <button
              className="flex justify-center items-center cursor-pointer w-[60px] h-[40px] text-white bg-red-500 rounded"
              onClick={async () => {
                await deletePost(id);
                router.push("/");
                router.refresh();
              }}
            >
              삭제
            </button>
          </li>
          <li className="flex justify-center items-center cursor-pointer w-[60px] h-[40px] text-white bg-orange-500 rounded ml-[10px]">
            <Link href={"/update/" + id}>수정</Link>
          </li>
        </>
      ) : null}
    </ul>
  );
}

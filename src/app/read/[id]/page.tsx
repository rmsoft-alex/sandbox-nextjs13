import { fetchPostDetail } from "@/api/posts/PostDetailApi";

type ReadProps = {
  params: {
    id: string;
  };
};

export default async function Read(props: ReadProps) {
  const id = props.params.id;
  const res = await fetchPostDetail(id);
  const post = res?.resultData;

  return (
    <div className="px-[10px]">
      <div className="flex flex-col justify-between items-center min-w-[1200px] h-[300px] border mt-[10px] rounded">
        <h2 className="text-xl">{post?.title}</h2>
        <div className="h-[200px]">{post?.body}</div>
      </div>
    </div>
  );
}

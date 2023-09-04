"use client";
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
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`);
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  };

  return (
    <form
      onSubmit={async (
        e: FormEvent<HTMLFormElement> & {
          target: { title: { value: string }; body: { value: string } };
        }
      ) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
          }
        );
        const topic = await resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}

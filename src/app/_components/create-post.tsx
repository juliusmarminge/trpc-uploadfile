"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();

  const createPost = api.post.create.useMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        await createPost.mutateAsync(fd);
        form.reset();
        router.refresh();
      }}
      className="flex flex-col gap-2"
    >
      <input
        name="name"
        placeholder="Title"
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <label htmlFor="">
        <span className="text-white">Poster Image</span>
        <input name="image" type="file" accept="image/*" max={1} />
      </label>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

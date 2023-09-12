import { create, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PostStoreState } from "../types/type";

const usePostStore = create<PostStoreState>()(
  immer(
    persist(
      (set) => ({
        posts: [],
        actions: {
          addPost: (post) =>
            set((state) => {
              // immer사용으로 객체 복사 불필요
              state.posts.push({
                id: self.crypto.randomUUID(),
                title: post.title,
                body: post.body,
              });
            }),
          removePost: (id) =>
            set((state) => {
              state.posts = state.posts.filter((el) => el.id !== id);
            }),
        },
      }),
      {
        name: "post-storage",
        // localStorage 저장 시 사용
        // partialize: (state) => {
        //   posts: state.posts;
        // },

        // sessionStorage 저장 시 사용
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

// 개별 selector hooks를 생성하여 export
// state사용시 useStore에 store와 selector 전달 (rendering에러 방지)
export const usePosts = () => useStore(usePostStore, (state) => state.posts);

// actions는 useStore를 사용하지 않음
export const usePostActions = () => usePostStore((state) => state.actions);

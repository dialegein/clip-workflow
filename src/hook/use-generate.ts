import { useState } from "react";
import { generateVideo } from "../api";
import { ClipDataType } from "../util/const";
import { atom, useAtomValue } from "jotai";

export const allowGenerateAtom = atom(true);
export function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const allowGenerate = useAtomValue(allowGenerateAtom);

  async function mutate(count: number, clips: ClipDataType[], bgm?: string) {
    setLoading(true);
    for await (const i of Array(count).keys()) {
      setCurrentIndex(i);

      // 调试控制是否发送请求
      if (allowGenerate) {
        await generateVideo(clips, bgm).catch();
      }
    }
    setLoading(false);
  }
  return {
    mutate,
    loading,
    currentIndex,
  };
}

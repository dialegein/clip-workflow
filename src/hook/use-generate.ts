import { useState } from "react";
import { generateVideo } from "../api";
import { ClipDataType, TemplateType } from "../util/const";
import { getClipLength, getDuration, getVideo } from "../util/video";
import { useResource } from "./use-resource";

export function useGenerate() {
  // 模板 -> 结构化数据
  const { resource } = useResource();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  async function mutate(count: number, template: TemplateType) {
    setLoading(true);
    for await (const i of Array(count).keys()) {
      setCurrentIndex(i);
      const clips: ClipDataType[] = [];
      template.block.forEach((block) => {
        Array(getClipLength(block))
          .fill(0)
          .forEach(() => {
            clips.push({
              source: getVideo(resource, block),
              duration: getDuration(block),
            });
          });
      });
      await generateVideo(clips);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setLoading(false);
  }
  return {
    mutate,
    loading,
    currentIndex,
  };
}

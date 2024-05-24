import { BlockType, VideoType } from "./const";
import { getRandomElement, getRandomInt } from "./random";

export function getClipLength(block: BlockType) {
  return typeof block.length === "number"
    ? block.length
    : getRandomInt(block.length.min, block.length.max);
}

export function getVideo(allResource: VideoType[], block: BlockType) {
  // 筛选出符合条件的片段
  const paths = allResource.filter((file) => {
    for (const soruce of block.target.source) {
      if (file.path.includes(soruce)) {
        return true;
      }
    }
    return false;
  });
  // 随机取一个片段
  return getRandomElement(paths)?.path ?? "";
}

export function getDuration(block: BlockType) {
  return typeof block.duration === "number"
    ? block.duration
    : getRandomInt(block.duration.min, block.duration.max);
}

export function getSubtitle(block: BlockType, subtitle: string) {
  return block.text.required ? subtitle : "";
}

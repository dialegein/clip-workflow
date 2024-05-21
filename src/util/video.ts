import { BlockType, VideoType } from "./const";
import { getRandomElement, getRandomInt } from "./random";
import _ from "lodash-es";

export function getClipLength(block: BlockType) {
  return typeof block.length === "number"
    ? block.length
    : getRandomInt(block.length.min, block.length.max);
}

export function getVideo(allResource: VideoType[], block: BlockType) {
  // 筛选出符合条件的片段
  const paths = _.intersectionWith(allResource, block.target.source, (a, b) => {
    const minDuration =
      typeof block.duration === "number" ? block.duration : block.duration.min;
    return a.path.includes(b) && a.duration >= minDuration;
  });
  // 随机取一个片段
  return getRandomElement(paths)?.path ?? "";
}

export function getDuration(block: BlockType) {
  return typeof block.duration === "number"
    ? block.duration
    : getRandomInt(block.duration.min, block.duration.max);
}

// 获取一个随机数，范围是[min, max]
export function getRandomInt(min: number, max: number): number {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 从数组中随机取出一个
export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined; // 如果数组为空，返回 undefined
  }
  const randomIndex = Math.floor(Math.random() * arr.length); // 生成一个随机索引
  return arr[randomIndex]; // 返回随机元素
}

export function runNTimes(n: number, callback: (i: number) => void) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}

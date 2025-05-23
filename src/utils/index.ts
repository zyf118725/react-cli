export const test = 'test';

// 监测是否是本地
export const isLocal = () => window.location.hostname === 'localhost';

export const wait = (time: number = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(true), time));

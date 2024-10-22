export const delay = (ms: number) =>
  new Promise((resolve) => {
    const randomDelay = ms + Math.random() * 500 - 250;
    setTimeout(resolve, Math.max(0, randomDelay));
  });

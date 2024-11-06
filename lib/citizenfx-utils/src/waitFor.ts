type WaitForCondition = () => boolean | Promise<boolean>;

export const waitFor = async (
  conditionCallback: WaitForCondition,
  timeout = 5000,
): Promise<void> => {
  return new Promise(async (resolve, rejeact) => {
    if (await conditionCallback()) {
      resolve();
      return;
    }

    const start = GetGameTimer();
    const interval = setInterval(async () => {
      if (await conditionCallback()) {
        clearInterval(interval);
        resolve();
      }

      const elapsed = GetGameTimer() - start;

      if (elapsed >= timeout) {
        console.log("test", elapsed, timeout);
        clearInterval(interval);
        rejeact(new Error("Timeout"));
      }
    }, 0);
  });
};

export const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

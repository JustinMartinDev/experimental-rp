type WaitForCondition = () => boolean | Promise<boolean>;

export const waitFor = async (
  conditionCallback: WaitForCondition,  
  timeout = 5000
): Promise<void> => {
  return new Promise(async (resolve, rejeact) => {
    if(await conditionCallback()) {
      resolve();
      return;
    }

    const start = GetGameTimer();
    const interval = setInterval(async () => {
      if(await conditionCallback()) {
        clearInterval(interval);
        resolve();
      }

      if (GetGameTimer() - start >= timeout) {
        clearInterval(interval);
        rejeact(new Error('Timeout'));
      }
    }, 0);
  });
}
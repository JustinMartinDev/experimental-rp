/**
 * Request and load the model with a specified timeout. Advised timeout - 1000.
 * Inspired by From https://github.com/d0p3t/fivem-js/blob/master/src/Model.ts
 *
 * @param hash Model hash to request.
 * @param timeout Maximum allowed time for model to load.
 */

export const loadModel = (hash: string, timeout = 1000) => {
  return new Promise<boolean>((resolve, reject) => {
    const isModelValid = IsModelValid(hash);
    const isInCdImage = IsModelInCdimage(hash);

    if (!isModelValid) {
      reject(`Model ${hash} is not valid`);
    }

    RequestModel(hash);

    // Wait for the model to load
    const start = GetGameTimer();
    const interval = setInterval(() => {
      const isLoaded = HasModelLoaded(hash);
      const isTimeout = GetGameTimer() - start >= timeout;

      // If model is loaded or timeout, so clear the interval before resolving
      if (isLoaded || isTimeout) {
        clearInterval(interval);
      }

      if (isLoaded) {
        resolve(true);
      }

      if (isTimeout) {
        SetModelAsNoLongerNeeded(hash);
        reject(`Model ${hash} failed to load in ${timeout}ms`);
      }
    }, 1);
  });
};

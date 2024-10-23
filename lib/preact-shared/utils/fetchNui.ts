import { isEnvBrowser } from "./misc";

function isDateString(value: string) {
  // This function checks if the string is a valid date
  const date = Date.parse(value);
  return !isNaN(date);
}

function convertDates(obj: unknown) {
  if (Array.isArray(obj)) {
    // If it's an array, iterate through each element and recursively call convertDates
    return obj.map(convertDates);
  } else if (typeof obj === "object" && obj !== null) {
    // If it's an object, iterate through each key and value
    for (let key in obj) {
      if (typeof obj[key] === "string" && isDateString(obj[key])) {
        // Convert string to Date if it's a valid date string
        obj[key] = new Date(obj[key]);
      } else if (typeof obj[key] === "object") {
        // Recursively process nested objects and arrays
        convertDates(obj[key]);
      }
    }
  }
  return obj;
}

/**
 * Simple wrapper around fetch API tailored for CEF/NUI use. This abstraction
 * can be extended to include AbortController if needed or if the response isn't
 * JSON. Tailor it to your needs.
 *
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 * @param mockData - Mock data to be returned if in the browser
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */

export async function fetchNui<T = unknown>(
  eventName: string,
  resourceName?: string,
  data?: unknown,
  mockData?: T
): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockData) return mockData;

  const hostName =
    resourceName ??
    (window.GetParentResourceName
      ? window.GetParentResourceName()
      : "nui-frame-app");

  try {
    const resp = await fetch(
      `https://${hostName}/${hostName}:${eventName}`,
      options
    );

    const respFormatted = (await resp.json()) as T;

    return convertDates(respFormatted);
  } catch (e) {
    throw e;
  }
}

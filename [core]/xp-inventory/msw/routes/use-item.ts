import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`https://inventory/inventory:use-item`, () => {
    return HttpResponse.json({});
  }),
];

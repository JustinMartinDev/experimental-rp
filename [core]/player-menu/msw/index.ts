import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`https://player-menu/player-menu:hide-frame`, () => {
    return HttpResponse.json({ status: "hidden" });
  }),
];

import { afterEach, expect, test, vi } from "vitest";
import { triggerClientEvent, triggerClientEventWithCallback } from "./server";

const globalMock = {
  on: vi.fn(),
  emitNet: vi.fn(),
  PlayerId: vi.fn(),
  onNet: vi.fn(),
};

vi.stubGlobal("on", globalMock.on);
vi.stubGlobal("emitNet", globalMock.emitNet);
vi.stubGlobal("PlayerId", globalMock.PlayerId);
vi.stubGlobal("onNet", globalMock.onNet);

afterEach(() => {
  vi.resetAllMocks();
});

test("triggerClientEvent", async () => {
  globalMock.on.mockImplementation((event, callback) => {
    callback({ name: "John" });
  });
  globalMock.PlayerId.mockReturnValue(1);

  await triggerClientEvent({
    event: "myEvent",
    params: { name: "John" },
    source: 10,
  });

  expect(globalMock.emitNet).toHaveBeenCalledTimes(1);
  expect(globalMock.emitNet).toHaveBeenNthCalledWith(
    1,
    "request:myEvent",
    '{"name":"John","source":10}',
  );

  expect(globalMock.on).toHaveBeenCalledTimes(1);
  expect(globalMock.on).toHaveBeenNthCalledWith(
    1,
    "response:myEvent",
    expect.any(Function),
  );
});

test("triggerClientEventWithCallback", async () => {
  globalMock.on.mockImplementation((event, callback) => {
    callback({ name: "John" });
  });
  globalMock.PlayerId.mockReturnValue(1);

  triggerClientEventWithCallback({
    event: "myEvent",
    params: { name: "John" },
    callback: vi.fn(),
    source: 10,
  });

  expect(globalMock.emitNet).toHaveBeenCalledTimes(1);
  expect(globalMock.emitNet).toHaveBeenNthCalledWith(
    1,
    "request:myEvent",
    '{"name":"John","source":10}',
  );

  expect(globalMock.on).toHaveBeenCalledTimes(1);
  expect(globalMock.on).toHaveBeenNthCalledWith(
    1,
    "response:myEvent",
    expect.any(Function),
  );
});

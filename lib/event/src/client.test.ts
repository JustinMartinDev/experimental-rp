import { afterEach, expect, test, vi } from "vitest";
import {
  onServerEvent,
  triggerServerEvent,
  triggerServerEventWithCallback,
} from "./client";

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

test("triggerServerEvent", async () => {
  globalMock.on.mockImplementation((event, callback) => {
    callback({ name: "John" });
  });
  globalMock.PlayerId.mockReturnValue(1);

  await triggerServerEvent({
    event: "myEvent",
    params: { name: "John" },
  });

  expect(globalMock.emitNet).toHaveBeenCalledTimes(1);
  expect(globalMock.emitNet).toHaveBeenNthCalledWith(
    1,
    "request:myEvent",
    '{"name":"John","source":1}'
  );

  expect(globalMock.on).toHaveBeenCalledTimes(1);
  expect(globalMock.on).toHaveBeenNthCalledWith(
    1,
    "response:myEvent",
    expect.any(Function)
  );
});

test("triggerServerEventWithCallback", async () => {
  globalMock.on.mockImplementation((event, callback) => {
    callback({ name: "John" });
  });
  globalMock.PlayerId.mockReturnValue(1);

  triggerServerEventWithCallback({
    event: "myEvent",
    params: { name: "John" },
    callback: vi.fn(),
  });

  expect(globalMock.emitNet).toHaveBeenCalledTimes(1);
  expect(globalMock.emitNet).toHaveBeenNthCalledWith(
    1,
    "request:myEvent",
    '{"name":"John","source":1}'
  );

  expect(globalMock.on).toHaveBeenCalledTimes(1);
  expect(globalMock.on).toHaveBeenNthCalledWith(
    1,
    "response:myEvent",
    expect.any(Function)
  );
});

test("onServerEvent", async () => {
  globalMock.onNet.mockImplementation((event, callback) => {
    callback('{"name":"John"}');
  });

  const callback = vi.fn();
  onServerEvent("myEvent", callback);

  expect(globalMock.onNet).toHaveBeenCalledTimes(1);
  expect(globalMock.onNet).toHaveBeenNthCalledWith(
    1,
    "request:myEvent",
    expect.any(Function)
  );

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenNthCalledWith(1, { name: "John" });
});

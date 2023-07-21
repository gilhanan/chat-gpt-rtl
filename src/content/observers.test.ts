import { observeChanges, observeChangesOnce } from "./observers";

describe("observeChanges", () => {
  let callback: jest.Mock;
  let options: MutationObserverInit;
  let mutationObserver: jest.Mock;
  let observe: jest.Mock;

  beforeEach(() => {
    observe = jest.fn();
    callback = jest.fn();
    options = { childList: true };

    mutationObserver = jest.fn(() => ({
      observe,
    }));
    global.MutationObserver = mutationObserver;
  });

  it("should create a new MutationObserver and observe the target", () => {
    const target = document.createElement("div");
    observeChanges({ target, options, callback });

    expect(mutationObserver).toHaveBeenCalledTimes(1);
    expect(mutationObserver).toHaveBeenCalledWith(callback);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(target, options);
  });
});

describe("observeChangesOnce", () => {
  let callback: jest.Mock;
  let options: MutationObserverInit;
  let mutationObserver: jest.Mock;
  let observe: jest.Mock;

  beforeEach(() => {
    observe = jest.fn();
    callback = jest.fn();
    options = { childList: true };

    mutationObserver = jest.fn(() => ({
      observe,
    }));
    global.MutationObserver = mutationObserver;
  });

  it("should call observeChangesOnce if the target is not already being observed", () => {
    const target = document.createElement("div");

    observeChangesOnce({ target, options, callback });

    expect(mutationObserver).toHaveBeenCalledTimes(1);
    expect(mutationObserver).toHaveBeenCalledWith(callback);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(target, options);
  });

  it("should not call observeChanges if the target is already being observed", () => {
    const target = document.createElement("div");

    observeChangesOnce({ target, options, callback });

    expect(mutationObserver).toHaveBeenCalledTimes(1);
    expect(mutationObserver).toHaveBeenCalledWith(callback);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(target, options);

    observeChangesOnce({ target, options, callback });
    expect(mutationObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(1);
  });
});

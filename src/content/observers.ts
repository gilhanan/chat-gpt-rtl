const observers = new WeakMap();

export type ObserveChanges = typeof observeChanges;
export type ObserveChangesOnce = typeof observeChangesOnce;

export function observeChanges({
  target,
  options,
  callback,
}: {
  target: Node;
  options: MutationObserverInit;
  callback: MutationCallback;
}): MutationObserver {
  const observer = new MutationObserver(callback);
  observer.observe(target, options);

  return observer;
}

export function observeChangesOnce({
  target,
  options,
  callback,
}: {
  target: Node | null;
  options: MutationObserverInit;
  callback: MutationCallback;
}): void {
  if (target == null || observers.has(target)) return;

  const observer = observeChanges({ target, options, callback });
  observers.set(target, observer);
}

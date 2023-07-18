const observers = new WeakMap();

function observeChanges({
  target,
  callback,
}: {
  target: Node;
  callback: MutationCallback;
}): MutationObserver {
  const observer = new MutationObserver(callback);
  observer.observe(target, { childList: true, subtree: true });

  return observer;
}

export function observeChangesOnce({
  target,
  callback,
}: {
  target: Node | null;
  callback: MutationCallback;
}): void {
  if (target == null || observers.has(target)) return;

  const observer = observeChanges({ target, callback });
  observers.set(target, observer);
}

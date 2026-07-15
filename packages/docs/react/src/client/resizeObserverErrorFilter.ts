const RESIZE_OBSERVER_LOOP_MESSAGES = [
  'ResizeObserver loop completed with undelivered notifications.',
  'ResizeObserver loop limit exceeded',
];

function isResizeObserverLoopError(value: unknown): boolean {
  if (typeof value === 'string') {
    return RESIZE_OBSERVER_LOOP_MESSAGES.some((message) => value.includes(message));
  }

  if (value instanceof Error) {
    return isResizeObserverLoopError(value.message);
  }

  if (value && typeof value === 'object' && 'message' in value) {
    return isResizeObserverLoopError((value as { message?: unknown }).message);
  }

  return false;
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      if (
        isResizeObserverLoopError(event.message) ||
        isResizeObserverLoopError(event.error)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isResizeObserverLoopError(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

import { lazy } from 'react';

export function lazyImport(importFn, { fallback = null } = {}) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

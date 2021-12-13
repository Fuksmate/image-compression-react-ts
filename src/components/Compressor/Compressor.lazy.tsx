import React, { lazy, Suspense } from 'react';

const LazyCompressor = lazy(() => import('./Compressor'));

const Compressor = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCompressor {...props} />
  </Suspense>
);

export default Compressor;

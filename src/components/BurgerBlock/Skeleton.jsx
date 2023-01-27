import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="burger-block"
    speed={2}
    width={280}
    height={320}
    viewBox="0 0 280 320"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="139" cy="100" r="80" />
    <rect x="0" y="185" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="225" rx="10" ry="10" width="280" height="35" />
    <rect x="0" y="280" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="270" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;

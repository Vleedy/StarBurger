import ContentLoader from 'react-content-loader';

const SkeletonAboutBurger = (props) => (
  <ContentLoader
    className="AboutBurgerSkeleton"
    speed={2}
    width={'100vw'}
    height={'400'}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="20" rx="10" ry="10" width="35vw" height="200" />
    <rect x="75vw" y="20" rx="10" ry="10" width="6vw" height="25" />
    <rect x="50vw" y="50" rx="10" ry="10" width="31vw" height="25" />
    <rect x="50vw" y="80" rx="10" ry="10" width="31vw" height="100" />
    <rect x="50vw" y="185" rx="10" ry="10" width="31vw" height="60" />
    <rect x="50vw" y="250" rx="10" ry="10" width="14vw" height="40" />
    <rect x="70vw" y="300" rx="10" ry="10" width="11vw" height="40" />
    <rect x="0" y="300" rx="10" ry="10" width="150px" height="40" />
  </ContentLoader>
);

export default SkeletonAboutBurger;

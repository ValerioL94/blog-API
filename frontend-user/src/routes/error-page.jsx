import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();

  function RootBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
      if (error.status === 401) {
        return <p>You aren&apos;t authorized to see this</p>;
      }
      if (error.status === 404) {
        return <p>This page doesn&apos;t exist!</p>;
      }
      if (error.status === 418) {
        return <p>🫖</p>;
      }
      if (error.status === 503) {
        return <p>Looks like our API is down</p>;
      }
    }
    return <p>Something went wrong</p>;
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <i>
        {error.status} {error.statusText || error.message}
      </i>
      {RootBoundary()}
      <Link to="home">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}

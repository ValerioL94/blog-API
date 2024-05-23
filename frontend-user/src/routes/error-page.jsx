import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Looks like something went wrong:</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/home">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}

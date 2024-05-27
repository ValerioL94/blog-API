import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="wrapper">
      <h1>Homepage</h1>
      <p>
        Welcome to the homepage! On this site registered authors can manage both
        posts and comments.
      </p>
      <p>
        Don&apos;t have an account? If you know the secret password you can{' '}
        <Link to={'/signup'}>sign up</Link> in the blink of an eye!
      </p>
      <p>
        Already have an account? Go ahead and <Link to={'/login'}>log in</Link>{' '}
        then!
      </p>
    </div>
  );
}

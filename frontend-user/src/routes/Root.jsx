import { NavLink, Outlet } from 'react-router-dom';
import '../styles/Root.css';
export default function Root() {
  return (
    <>
      <header>
        <h1>Blog</h1>
        <nav id="navbar">
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'posts'}>Posts</NavLink>
            </li>
            <li>
              <NavLink to={'about'}>About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright © 2024 ValerioL94</p>
        <a href="https://github.com/ValerioL94">
          <img
            className="logo pulse"
            src="/assets/icons/github-mark-white.svg"
            alt="github logo"
          />
        </a>
      </footer>
    </>
  );
}

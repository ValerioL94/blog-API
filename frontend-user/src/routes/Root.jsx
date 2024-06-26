import { NavLink, Outlet } from 'react-router-dom';
import '../styles/Root.css';
export default function Root() {
  return (
    <>
      <header>
        <nav id="navbar">
          <ul>
            <li>
              <NavLink to={'home'}>Home</NavLink>
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
        <a className="git-link" href="https://github.com/ValerioL94">
          <img
            className="logo"
            src="/assets/icons/github-mark-white.svg"
            alt="github logo"
          />
        </a>
      </footer>
    </>
  );
}

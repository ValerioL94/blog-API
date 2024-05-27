import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from 'react-router-dom';
import { postsLoader, postLoader, commentAction } from './Loader-action.jsx';
import ErrorPage from './routes/Error-page.jsx';
import Root from './routes/Root.jsx';
import Home from './routes/Home.jsx';
import Blog from './routes/Blog.jsx';
import About from './routes/About.jsx';
import Post from './routes/Post.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, loader: async () => redirect('home') },
        {
          path: 'home',
          element: <Home />,
        },
        { path: 'about', element: <About /> },
        {
          path: 'posts',
          element: <Outlet />,
          children: [
            { index: true, element: <Blog />, loader: postsLoader },
            {
              path: ':postId',
              element: <Post />,
              loader: postLoader,
              action: commentAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { postsLoader, postLoader } from './Loader.jsx';
import ErrorPage from './routes/error-page.jsx';
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
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, loader: async () => redirect('home') },
            {
              path: 'home',
              element: <Home />,
            },
            {
              path: 'posts',
              element: <Blog />,
              loader: postsLoader,
            },
            { path: 'about', element: <About /> },
            {
              path: 'posts/:postId',
              element: <Post />,
              loader: postLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

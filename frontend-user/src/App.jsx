import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from 'react-router-dom';
import { About, Blog, ErrorPage, Home, Post, Root } from './routes/index.js';
import { postsLoader, postLoader } from './loaders.js';
import { commentAction } from './actions.js';

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
            {
              index: true,
              element: <Blog />,
              loader: async () => await postsLoader(),
            },
            {
              path: ':postid',
              element: <Post />,
              loader: async ({ params }) => await postLoader(params),
              action: async ({ params, request }) =>
                await commentAction(params, request),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

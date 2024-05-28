import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import {
  About,
  Blog,
  ErrorPage,
  Home,
  Login,
  Logout,
  Post,
  ProtectedRoute,
  Root,
  Signup,
} from './routes/index.js';
import { postsLoader, postLoader } from './loaders.js';
import { commentAction, userAction } from './actions.js';

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
          path: 'signup',
          element: <Signup />,
          action: async ({ request }) => await userAction(request, 'signup'),
        },
        {
          path: 'login',
          element: <Login />,
          action: async ({ request }) => await userAction(request, 'login'),
        },
        { path: 'logout', element: <Logout /> },
        {
          path: 'posts',
          element: <ProtectedRoute />,
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

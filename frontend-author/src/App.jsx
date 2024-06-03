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
  NewPost,
  Post,
  ProtectedRoute,
  Root,
  Signup,
} from './routes/index.js';
import { postsLoader, postLoader } from './loaders.js';
import {
  userAction,
  // commentAction,
  postAction,
} from './actions.js';
import { useAuth } from './provider/context.js';
export default function App() {
  const { token } = useAuth();
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
              action: async ({ request, params }) =>
                await postAction(request, params, token),
            },
            {
              path: ':postid',
              element: <Post />,
              loader: async ({ params }) => await postLoader(params),
              action: async ({ request, params }) =>
                await postAction(request, params, token),
            },
            // await commentAction(params, request),
            {
              path: 'newpost',
              element: <NewPost />,
              action: async ({ request, params }) =>
                await postAction(request, params, token),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

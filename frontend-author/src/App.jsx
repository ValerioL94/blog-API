import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { useAuth } from './provider/context.js';
import { postsLoader, postLoader, commentAction } from './Loader-action.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import ErrorPage from './routes/Error-page.jsx';
import Root from './routes/Root.jsx';
import Home from './routes/Home.jsx';
import Blog from './routes/Blog.jsx';
import About from './routes/About.jsx';
import Post from './routes/Post.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';

export default function App() {
  const { token } = useAuth();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root token={token} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, loader: async () => redirect('home') },
        {
          path: 'home',
          element: <Home />,
        },
        { path: 'about', element: <About /> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        {
          path: 'posts',
          element: <ProtectedRoute />,
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

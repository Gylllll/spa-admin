import { createBrowserRouter, Navigate } from 'react-router'
import PostsPage from '@/routes/posts/list'
import PostDetailPage from '@/routes/posts/detail'
import { postsAction, postsLoader, postDetailLoader } from '@/routes/posts/route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/posts' replace />,
  },
  {
    path: '/posts',
    element: <PostsPage />,
    loader: postsLoader,
    action: postsAction,
  },
  {
    path: '/posts/:id',
    element: <PostDetailPage />,
    loader: postDetailLoader,
  },
])

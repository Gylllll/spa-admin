import { createBrowserRouter, Navigate } from 'react-router'
import PostsPage from '@/routes/posts'
import { loader as postsLoader, action as postsAction } from '@/routes/posts.api'
import PostDetail from '@/routes/post-detail'
import { loader as postLoader } from '@/routes/post-detail.api'

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
    element: <PostDetail />,
    loader: postLoader,
  },
])

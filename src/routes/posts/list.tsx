import { useLoaderData } from 'react-router'
import type { Post } from '@/types/post'
import NewPostForm from './components/NewPostForm'
import PostRow from './components/PostRow'

export default function PostsPage() {
  const { posts } = useLoaderData() as { posts: Post[] }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1>文章列表</h1>
      {/* 新建文章表单 */}
      <NewPostForm />
      {/* 文章列表 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

import { Link, useLoaderData } from 'react-router'
import type { Post } from '@/types/post'

// 发布成功后跳转到这里
export default function PostDetailPage() {
  const { post } = useLoaderData() as { post: Post }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <Link to='/posts'>← 返回列表</Link>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>👍 {post.likes} 次点赞</p>
    </div>
  )
}

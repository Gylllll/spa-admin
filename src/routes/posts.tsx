import { Form, Link, useFetcher, useLoaderData, useNavigation } from 'react-router'
import { type Post } from '@/mocks/db'

// ---------- 列表页面 ----------
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

// ---------- 用 <Form>：发布后跳转 ----------
function NewPostForm() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method='post' style={{ marginBottom: 24 }}>
      <input type='hidden' name='intent' value='create' />
      <div>
        <input name='title' placeholder='标题' required disabled={isSubmitting} />
      </div>
      <div>
        <textarea name='content' placeholder='内容' required disabled={isSubmitting} />
      </div>
      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '发布中…' : '发布并跳转详情'}
      </button>
    </Form>
  )
}

// ---------- 用 useFetcher：点赞 / 行内编辑 / 删除 ----------
function PostRow({ post }: { post: Post }) {
  const likeFetcher = useFetcher()
  const editFetcher = useFetcher()
  const deleteFetcher = useFetcher()

  // fetcher.state："submitting"（提交中）-> "loading"（等待 loader 重新验证数据）-> "idle"（完成）

  // formData 只有在提交过程中才存在，失败或成功后会被清空。如果删除失败，formData 会清空，组件会重新渲染，这一行又会重新出现
  if (deleteFetcher.formData) return null

  // 点赞乐观 UI：提交中优先使用表单里的目标状态
  const isLiked = likeFetcher.formData
    ? likeFetcher.formData.get('liked') === 'true'
    : post.likedByMe
  // 1. 判断服务端数据是否已经追上当前的乐观状态
  // 如果 isLiked === post.likedByMe，说明 loader 已经拿到了最新数据
  const isServerUpdated = isLiked === post.likedByMe

  // 2. 仅在提交中，且服务端数据还没更新时，才应用增量
  const shouldApplyDelta = likeFetcher.formData && !isServerUpdated
  const likeDelta = shouldApplyDelta ? (isLiked ? 1 : -1) : 0

  // 3. 计算最终显示的数字
  const displayLikes = post.likes + likeDelta

  // 编辑乐观 UI：提交中优先显示输入框里的新标题
  const isEditing = editFetcher.state !== 'idle'
  const optimisticTitle = editFetcher.formData
    ? String(editFetcher.formData.get('title') ?? post.title)
    : post.title

  return (
    <li
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      {/* 行内编辑标题：useFetcher.Form，不跳转 */}
      <editFetcher.Form method='post' style={{ display: 'flex', gap: 8 }}>
        <input type='hidden' name='intent' value='update-title' />
        <input type='hidden' name='postId' value={post.id} />
        <input
          key={post.title} // 服务端数据更新后重置输入框
          name='title'
          defaultValue={optimisticTitle}
          disabled={isEditing}
          style={{ flex: 1 }}
        />
        <button type='submit' disabled={isEditing}>
          {isEditing ? '保存中…' : '保存标题'}
        </button>
      </editFetcher.Form>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}>
        {/* 点赞：useFetcher.Form，不跳转 */}
        <likeFetcher.Form method='post'>
          <input type='hidden' name='intent' value='toggle-like' />
          <input type='hidden' name='postId' value={post.id} />
          <input type='hidden' name='liked' value={String(!isLiked)} />
          <button type='submit'>
            {isLiked ? '❤️' : '🤍'} {displayLikes}
          </button>
        </likeFetcher.Form>
        {/* 查看详情：普通 Link，会跳转 */}
        <Link to={`/posts/${post.id}`}>查看详情</Link>
        {/* 删除：useFetcher.Form，不跳转 */}
        <deleteFetcher.Form method='post'>
          <input type='hidden' name='intent' value='delete' />
          <input type='hidden' name='postId' value={post.id} />
          <button type='submit'>删除</button>
        </deleteFetcher.Form>
      </div>
    </li>
  )
}

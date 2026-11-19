import { redirect, type ActionFunctionArgs } from 'react-router'
import { db } from '@/mocks/db'

// ---------- loader：列表数据 ----------
export async function loader() {
  await new Promise((r) => setTimeout(r, 300)) // 模拟网络延迟，便于观察乐观 UI
  return { posts: db.getAll() }
}

// ---------- action：统一处理 4 种 intent ----------
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  switch (intent) {
    case 'create': {
      const post = db.create({
        title: String(formData.get('title') ?? ''),
        content: String(formData.get('content') ?? ''),
      })
      // 关键：<Form> 提交后跳转到详情页
      return redirect(`/posts/${post.id}`)
    }
    case 'toggle-like': {
      db.toggleLike(String(formData.get('postId')), formData.get('liked') === 'true')
      return { ok: true }
    }
    case 'update-title': {
      db.updateTitle(String(formData.get('postId')), String(formData.get('title') ?? ''))
      return { ok: true }
    }
    case 'delete': {
      db.remove(String(formData.get('postId')))
      return { ok: true }
    }
    default:
      return null
  }
}

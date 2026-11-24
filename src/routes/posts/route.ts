import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { postsApi } from '@/api/posts'

// ---------- loader：列表数据 ----------
export async function postsLoader() {
  return { posts: await postsApi.list() }
}

// ---------- action：统一处理 4 种 intent ----------
export async function postsAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  switch (intent) {
    case 'create': {
      const post = postsApi.create({
        title: String(formData.get('title') ?? ''),
        content: String(formData.get('content') ?? ''),
      })
      // 关键：<Form> 提交后跳转到详情页
      return redirect(`/posts/${post.id}`)
    }
    case 'toggle-like': {
      postsApi.toggleLike(String(formData.get('postId')), formData.get('liked') === 'true')
      return { ok: true }
    }
    case 'update-title': {
      postsApi.updateTitle(String(formData.get('postId')), String(formData.get('title') ?? ''))
      return { ok: true }
    }
    case 'delete': {
      postsApi.remove(String(formData.get('postId')))
      return { ok: true }
    }
    default:
      return null
  }
}

// ---------- loader：详情数据 ----------
export async function postDetailLoader({ params }: LoaderFunctionArgs) {
  const post = postsApi.get(params.id!)
  if (!post) throw new Response('Not Found', { status: 404 })
  return { post }
}

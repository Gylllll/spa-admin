import { db } from '@/mocks/db'
import type { Post } from '@/types/post'

// 数据访问层：路由只依赖这里，将来替换为真实 HTTP 请求时不影响页面
export type CreatePostInput = { title: string; content: string }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const postsApi = {
  async list(): Promise<Post[]> {
    await delay(300) // 模拟网络延迟，便于观察乐观 UI
    return db.getAll()
  },

  get(id: string): Post | undefined {
    return db.getById(id)
  },

  create(data: CreatePostInput): Post {
    return db.create(data)
  },

  updateTitle(id: string, title: string): Post | undefined {
    return db.updateTitle(id, title)
  },

  toggleLike(id: string, liked: boolean): Post | undefined {
    return db.toggleLike(id, liked)
  },

  remove(id: string): void {
    db.remove(id)
  },
}

// 模拟数据库
export type Post = {
  id: string
  title: string
  content: string
  likes: number
  likedByMe: boolean
}

let posts: Post[] = [
  {
    id: '1',
    title: 'React Router 入门',
    content: '第一篇文章的内容。',
    likes: 12,
    likedByMe: false,
  },
  { id: '2', title: 'useFetcher 详解', content: '第二篇文章的内容。', likes: 5, likedByMe: true },
]

export const db = {
  getAll: () => posts,
  getById: (id: string) => posts.find((p) => p.id === id),
  create: (data: { title: string; content: string }) => {
    const post: Post = {
      id: crypto.randomUUID(),
      likes: 0,
      likedByMe: false,
      ...data,
    }
    posts = [post, ...posts]
    return post
  },
  updateTitle: (id: string, title: string) => {
    const post = posts.find((p) => p.id === id)
    if (post) post.title = title
    return post
  },
  toggleLike: (id: string, liked: boolean) => {
    const post = posts.find((p) => p.id === id)
    if (post) {
      post.likes += liked ? 1 : -1
      post.likedByMe = liked
    }
    return post
  },
  remove: (id: string) => {
    posts = posts.filter((p) => p.id !== id)
  },
}

import { type LoaderFunctionArgs } from 'react-router'
import { db } from '@/mocks/db'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = db.getById(params.id!)
  if (!post) throw new Response('Not Found', { status: 404 })
  return { post }
}

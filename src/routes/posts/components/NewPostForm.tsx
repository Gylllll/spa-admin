import { Form, useNavigation } from 'react-router'

// 用 <Form>：发布后跳转详情
export default function NewPostForm() {
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

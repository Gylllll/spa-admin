import { RouterProvider } from 'react-router/dom'
import { router } from './router'

// 应用根组件：以后全局 Provider（主题、鉴权等）也挂在这里
export default function App() {
  return <RouterProvider router={router} />
}

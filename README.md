# spa-admin

React 19 + TypeScript + Vite + React Router 8 的 SPA 管理后台。

## 开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 类型检查 + 生产构建
npm run lint     # ESLint
npm run format   # Prettier
```

## 目录结构

按业务模块组织，`src/routes/<模块>/` 内聚页面、路由数据逻辑和局部组件。

```
src/
├─ app/                    # 应用装配
│  ├─ main.tsx             # 入口
│  ├─ App.tsx              # 根组件（全局 Provider 挂载点）
│  └─ router.tsx           # 路由表
├─ routes/                 # 业务模块
│  └─ posts/
│     ├─ route.ts          # loader / action
│     ├─ list.tsx          # 文章列表页
│     ├─ detail.tsx        # 文章详情页
│     └─ components/       # 模块内组件
├─ api/                    # 数据访问层（接真实后端时只改这里）
├─ mocks/                  # 内存假后端（本地开发数据源）
├─ types/                  # 跨模块共享类型
├─ styles/                 # 全局样式
└─ assets/                 # 静态资源
```

新增业务模块时，在 `src/routes/` 下建同名文件夹，再到 `src/app/router.tsx` 注册路由。

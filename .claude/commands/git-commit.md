---
description: 分析暂存区改动，生成 Conventional Commits 提交信息
argument-hint: [可选：额外说明]
allowed-tools: Bash(git diff *), Bash(git commit *)
---

# 任务

请根据暂存区的代码改动，帮我生成符合 Conventional Commits 规范的提交信息，待确认后，执行提交。

## 执行步骤

1. 先运行 `git diff --cached` 查看暂存区的改动。
2. 根据改动内容，分析 commit type（如 feat, fix, docs 等）和影响范围。
3. 参考用户提供的额外说明：$ARGUMENTS (这里接收 argument-hint 传入的参数)。
4. 生成 Commit Message，必须停止并等待我回复同意后，才能执行下一步。
5. 确认后执行 `git commit -m "消息"`。

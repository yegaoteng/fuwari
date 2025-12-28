# CLAUDE.md

> 本文档是 AI（如 Claude）理解项目的基石，请保持与 `GEMINI.md` 同步更新。

## 项目概述

**Fuwari** 是一个基于 **Astro** 框架的静态博客模板，使用 TypeScript、Tailwind CSS 和 Svelte 组件构建。

## 核心架构

### 技术栈
| 类别 | 技术 |
| :--- | :--- |
| **框架** | Astro 5.x |
| **样式** | Tailwind CSS + Stylus |
| **组件** | Svelte 5.x + Astro |
| **包管理** | pnpm 9.x |
| **类型检查** | TypeScript (严格模式) |
| **代码质量** | Biome |
| **内容管理** | Astro Content Collections |

### 目录结构
| 目录 | 说明 |
| :--- | :--- |
| `src/config.ts` | **主配置文件**（站点、导航、个人资料、功能开关） |
| `src/content/posts/` | 博客文章 (Markdown) |
| `src/content/spec/` | 特殊页面 (如 About) |
| `src/content/config.ts` | Content Collections Schema |
| `src/components/` | 可复用组件 (Astro + Svelte) |
| `src/layouts/` | 页面布局模板 |
| `src/pages/` | 路由页面和 API 端点 |
| `src/plugins/` | 自定义 Remark/Rehype 插件 |
| `src/styles/` | 全局样式 |
| `src/utils/` | 工具函数 |
| `scripts/` | 构建和部署脚本 |

### Content Collections 架构
| 集合 | 说明 | 字段 |
| :--- | :--- | :--- |
| `posts` | 博客文章 | title, published, updated, draft, description, image, tags, lang, pinned |
| `spec` | 特殊页面 | title, published, updated, draft |
| `assets` | 资源数据 | title, description |

### 关键特性
- 深色/浅色主题切换
- 页面过渡动画 (Swup)
- 数学公式渲染 (KaTeX)
- 代码语法高亮 (Expressive Code)
- 图片回退机制 (双 CDN)
- SEO 优化 (sitemap, RSS)
- IndexNow 搜索引擎提交
- 防盗链保护

---

## 常用开发命令

### 基础开发
```bash
pnpm install && pnpm add sharp  # 安装依赖
pnpm dev                        # 启动开发服务器 (localhost:4321)
pnpm build                      # 构建生产版本
pnpm preview                    # 预览构建结果
pnpm astro check                # 检查 Astro 组件类型
```

### 代码质量
```bash
pnpm lint                       # Biome 检查和修复
pnpm format                     # 代码格式化
pnpm type-check                 # TypeScript 类型检查
```

### 内容管理
```bash
pnpm new-post <filename>        # 创建新博客文章
```

### SQLite 迁移（实验性）
```bash
# 预览数据库结构
pnpm node scripts/migrate-from-sqlite.mjs --db "path/to/database.db" --dry-run

# 导出到 src/content/posts
pnpm node scripts/migrate-from-sqlite.mjs --db "path/to/database.db" --out ./src/content/posts
```

---

## IndexNow 搜索引擎快速收录

### 功能概述
集成 IndexNow 协议，自动向 Bing、Yandex 等搜索引擎提交 URL，加速内容收录。

### 核心文件
| 文件 | 说明 |
| :--- | :--- |
| `public/751fa2696f5b4f5890799ca542b34fbb.txt` | IndexNow 验证密钥 |
| `src/pages/api/indexnow.ts` | IndexNow API 端点 |
| `src/pages/api/webhook/indexnow.ts` | Webhook 处理端点 |
| `scripts/submit-indexnow.mjs` | 全量提交脚本 |
| `scripts/submit-indexnow-incremental.mjs` | **增量提交脚本（推荐）** |

### 命令一览
| 命令 | 说明 |
| :--- | :--- |
| `pnpm build:indexnow` | 构建并提交到搜索引擎 |
| `pnpm submit-indexnow` | 仅提交所有 URL（不构建） |
| `pnpm submit-indexnow-inc` | **增量提交**（仅新增 URL） |
| `pnpm submit-indexnow-force` | 强制提交所有 URL |
| `pnpm indexnow-status` | 查看提交状态 |
| `pnpm indexnow-clear` | 清除提交历史 |

### 增量提交原理
1. 读取 `sitemap.xml` 中的所有 URL
2. 对比 `.indexnow-submitted.json` 中已提交记录
3. 仅提交新增 URL，节省 API 配额
4. 提交成功后更新记录文件

> ⚠️ `.indexnow-submitted.json` 会自动生成，**请勿提交到 Git**。

### 支持的搜索引擎
| 端点 | 说明 |
| :--- | :--- |
| `api.indexnow.org` | 通用端点 |
| `www.bing.com/indexnow` | Microsoft Bing |
| `yandex.com/indexnow` | Yandex |

### API 响应处理
不同端点返回格式不同：
- **api.indexnow.org / Bing**: 返回空响应体 (Content-Length: 0)
- **Yandex**: 返回 JSON 格式 `{"success":true}`

脚本已处理两种情况，无需担心 JSON 解析错误。

### 状态码说明
| 状态码 | 说明 |
| :--- | :--- |
| `200` | 成功接收并处理 |
| `202` | 成功接收，稍后处理 |
| `400` | 请求格式错误 |
| `403` | 密钥验证失败 |
| `422` | URL 格式错误或过多 |
| `429` | 请求频率过高 |

### 故障排除
```bash
# 查看详细日志
pnpm submit-indexnow

# 检查 API 状态
curl https://www.micostar.tech/api/indexnow

# 验证密钥文件
curl https://www.micostar.tech/751fa2696f5b4f5890799ca542b34fbb.txt
```

---

## 配置文件

### 主配置 (`src/config.ts`)
| 配置项 | 说明 |
| :--- | :--- |
| `siteConfig` | 站点基本信息、主题色、横幅、背景设置 |
| `navBarConfig` | 导航栏链接配置 |
| `profileConfig` | 作者个人资料配置 |
| `imageFallbackConfig` | 图片回退域名配置 |
| `antiLeechConfig` | 防盗链域名白名单 |
| `umamiConfig` | Umami 分析配置 |
| `googleAnalyticsConfig` | Google Analytics 配置 |

### 博客文章 Frontmatter
```yaml
---
title: 文章标题          # 必填
published: 2024-01-01   # 必填 (YYYY-MM-DD)
updated: 2024-01-02     # 可选：更新日期
draft: false            # 可选：是否草稿
description: 文章摘要   # 可选
image: ./cover.jpg      # 可选：封面图片
tags: [标签1, 标签2]    # 可选
lang: zh_CN             # 可选：语言代码
pinned: false           # 可选：是否置顶
---
```

### 图片回退机制
通过自定义 rehype 插件 `rehype-image-fallback` 实现：
- **工作原理**：为所有来自主图床的 `<img>` 标签添加 `onerror` 属性
- **回退逻辑**：主图床加载失败时自动切换到备用图床
- **配置**：在 `src/config.ts` 的 `imageFallbackConfig` 中设置域名

---

## 插件系统

### Remark 插件（Markdown 处理）
- `remark-math` - 数学公式支持
- `remark-reading-time` - 阅读时间计算
- `remark-excerpt` - 文章摘要提取
- `remark-directive` - 自定义指令支持

### Rehype 插件（HTML 处理）
- `rehype-katex` - 数学公式渲染
- `rehype-slug` - 标题 ID 生成
- `rehype-autolink-headings` - 标题锚点链接
- `rehype-external-links` - 外部链接处理
- 自定义组件：GitHub 卡片、Admonition 框

### Expressive Code 自定义插件
- `pluginCollapsibleSections` - 可折叠代码区域
- `pluginLineNumbers` - 行号显示
- `pluginCustomCopyButton` - 自定义复制按钮 (`src/plugins/expressive-code/custom-copy-button.ts`)

---

## 部署说明

### Vercel 部署配置
- 构建输出：`./dist/`
- 部署区域：`hkg1`（香港）
- 需配置 `astro.config.mjs` 中的 `site` 字段

### Vercel 特定配置 (`vercel.json`)
- **安全头**：X-Content-Type-Options、X-Frame-Options、X-XSS-Protection
- **静态资源缓存**：JS、CSS、图片 (1年)
- **URL 重写**：`/sitemap.xml` → `/sitemap-index.xml`

---

## 开发注意事项

### 代码规范
- Tab 缩进 (Biome)
- 双引号字符串 (JS/TS)
- Svelte 和 Astro 文件禁用 `useConst` 和 `useImportType`

### TypeScript 路径别名
| 别名 | 路径 |
| :--- | :--- |
| `@components/*` | `src/components/*` |
| `@assets/*` | `src/assets/*` |
| `@utils/*` | `src/utils/*` |
| `@layouts/*` | `src/layouts/*` |
| `@/*` | `src/*` |

### API 路由
| 端点 | 说明 |
| :--- | :--- |
| `/api/indexnow` | IndexNow 验证端点 |
| `/api/webhook/indexnow` | IndexNow Webhook 处理端点 |
# GitHub Pages 手机备用镜像设计

## 目标

为现有捷途里约 Research 网站增加无需登录、适合国内手机浏览器直接访问的静态镜像。Cloudflare Pages 作为手机优先地址，GitHub Pages 作为备用地址；现有 `chatgpt.site` 正式地址继续保留，报告内容与交互不做改动。

## 已确认问题

- 现有站点本身运行正常，桌面端及常规 iPhone、Android 请求可返回 200。
- 中国大陆长沙、深圳、天津探测节点访问现有 `chatgpt.site` 域名时均收到 Cloudflare 403 拦截页。
- 因此故障位于托管域名的网络访问层，而不是响应式布局、页面脚本或报告数据。

## 方案

在现有公开仓库中增加独立的静态镜像构建，并发布到 Cloudflare Pages 与 GitHub Pages：

1. 使用当前生产代码生成完整首屏 HTML 与客户端资源。
2. 将根路径资源改写为仓库 Pages 子路径，避免 CSS、JavaScript、字体和图标出现 404。
3. 保留研究页四个模块、筛选、搜索、详情弹窗、图片来源链接和全彩图片规则。
4. 通过 Cloudflare Pages 发布根路径版本，并通过 GitHub Actions 发布仓库子路径版本。
5. 将 Cloudflare Pages 设置为领导移动端优先链接，将 GitHub Pages 保留为备用链接。

## 边界与降级

- GitHub Pages 镜像只承载公开、只读报告，不增加登录、数据库或内容编辑能力。
- 远程图片仍由原始来源站点提供；单个源站拒绝加载时沿用现有的隐藏破图机制。
- 现有 Sites 部署继续作为主版本，不迁移、不删除。
- 如果中国节点对 `github.io` 仍存在系统性拦截，则停止继续修改页面，转为自有域名或国内云静态托管方案。

## 验收标准

- Cloudflare Pages 与 GitHub Pages 根地址均返回 HTTP 200。
- iPhone Safari 与 Android Chrome User-Agent 均能获得报告 HTML。
- 页面能加载 CSS 和 JavaScript，四个研究模块可切换，搜索与详情弹窗可用。
- 图片保持彩色，来源链接保持可点击。
- 手机宽度无横向溢出。
- Cloudflare Pages 至少覆盖中国移动、联通、电信中的两个运营商，且至少三个中国大陆网络探测点返回 HTTP 200。
- 原有构建、数据与媒体测试全部通过。

## 发布与回退

- 发布由仓库 `main` 分支触发，镜像产物不手工维护。
- 若新流程失败，只需停用 GitHub Pages 工作流；现有 Sites 链接与本地版本不受影响。

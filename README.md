# 捷途国际 2026 里约全球用户节 Research

黑底白字、领导决策优先的本地研究网页，覆盖 2026 年 11 月：

1. 里约音乐节与本地庆典
2. 本地体育与演艺大 IP
3. 主流媒体、行业媒体与 Content Creator
4. 户外、室内与沙滩项目选地

## 本地查看

本机预览地址：`http://localhost:4173`

如需重新启动：

```bash
cd /Users/ryan/Documents/社媒运营/jetour-rio-research-web
export PATH='/Users/ryan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':$PATH
/Users/ryan/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm exec vinext dev --port 4173
```

## 信息更新

- 公开数据：`src/research-data.js`
- 图片、Logo、头像与来源登记：`src/research-media.js`
- 关键来源：`research/source-register.md`
- 研究判断与排除项：`research/research-notes.md`
- 信息截止：2026-07-28

图片在黑色界面中保留原彩。有可靠直接来源的活动、IP 和场地显示真实视觉；媒体显示官方 Logo，Content Creator 显示公开头像或频道标识。没有可靠直接图片地址的候选保持纯文字卡片。

公开发布前须逐项复核图片、Logo、头像与肖像使用边界，并视需要将获准素材归档到项目本地。

## 验证

```bash
/Users/ryan/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test
```

## 在线版本

- 国内手机优先（Cloudflare Pages）：<https://jetour-rio-research.pages.dev/>
- 国内手机备用（GitHub Pages）：<https://ryanwgs.github.io/jetour-rio-research-web/>
- 原正式页面：<https://jetour-rio-research-2026.ryan19921230.chatgpt.site>
- GitHub 源码：<https://github.com/RyanWgs/jetour-rio-research-web>

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
- 关键来源：`research/source-register.md`
- 研究判断与排除项：`research/research-notes.md`
- 信息截止：2026-07-28

## 验证

```bash
/Users/ryan/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test
```

当前仅为本地候选版本。用户确认前不创建 GitHub 仓库、不对外发布。

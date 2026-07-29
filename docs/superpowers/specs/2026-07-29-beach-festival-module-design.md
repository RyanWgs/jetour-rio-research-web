# 沙滩音乐节案例模块设计

## 目标

把 Excel 中已完成的巴西沙滩音乐节案例研究纳入在线资料库，并修正中英文模块编号，使导航连续且易于领导浏览。

## 模块顺序

中文版共 5 个模块：

1. 音乐节与本地庆典
2. 项目选地
3. 酒店配套
4. 沙滩音乐节案例
5. 异业合作

英文版共 7 个模块：

1. Events & Local Celebrations
2. Venue Options
3. Hotel Support
4. Beach Festival Cases
5. Sports & Entertainment IP
6. Media & Content Creators
7. Cross-industry Partnerships

## 案例范围

首批纳入 7 个已核验案例：TIM Music Rio、Todo Mundo no Rio—Madonna、Todo Mundo no Rio—Lady Gaga、Copacabana 跨年音乐庆典、Rio das Ostras Jazz & Blues Festival、Universo Paralello、Recife Pé na Areia。

每个案例延续现有资源卡结构，提供彩色图片、中文与英文介绍、举办城市与时间、公开影响力、对 700 人项目的启示、风险和来源链接。案例属于独立 `beach_case` 类目，不混入 11 月活动清单，避免把历史案例误解为 2026 年 11 月档期资源。

## 交互与展示

- 案例模块支持搜索、影响力排序、收藏和资源详情弹窗。
- 不显示 11 月日期状态筛选；日期用于说明历史案例发生时间。
- 卡片和详情明确标注“历史/运营案例”，并提示案例不能替代里约项目的许可、档期和现场勘察。
- 桌面端中英文导航分别适配 5 列和 7 列；手机端继续使用 2 列排布，无横向溢出。

## 验证

- 数据测试：7 个案例具备完整双语字段、来源与图片记录。
- 导航测试：中文 01–05、英文 01–07 连续且顺序正确。
- 页面测试：案例模块可进入、筛选、收藏并打开详情。
- 完整构建、代码检查及 390px 手机端交互检查通过后，更新 GitHub、Cloudflare Pages 和 Sites 在线版。

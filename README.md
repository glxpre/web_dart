# 飞镖兵种 — RoboMaster 团队页面

> xxx大学 RoboMaster 飞镖研发团队静态网页

## 🚀 快速开始

直接用浏览器打开 `index.html` 即可，无需服务器或构建工具。

```
双击 index.html → 浏览器打开
```

## 📁 项目结构

```
D:\web_dart\
├── index.html              # 主页面（所有内容在一个文件中）
├── css/
│   ├── variables.css       # CSS 设计 Token（配色、字体、间距）
│   └── style.css           # 全局样式 + 组件样式
├── js/
│   ├── nav.js              # 导航栏（滚动阴影、移动端菜单、高亮）
│   ├── gallery.js          # 队员数据 + 照片墙渲染 + 灯箱
│   └── main.js             # 标签页切换 + 滚动动画 + URL hash 同步
├── assets/
│   └── images/
│       ├── dart-system/    # 飞镖系统相关图片（结构图、电路图等）
│       └── members/        # 队员照片
└── README.md               # 本文件
```

## ✏️ 如何修改内容

### 1. 修改团队名称

在 `index.html` 中搜索 `xxx大学`，替换为你的学校名称。

### 2. 修改飞镖资料汇总（Section 3）

在 `index.html` 中搜索 `<!-- TODO: 替换为真实内容 -->`，替换飞镖规则、技术要点、参考资料等文字。

### 3. 修改飞镖系统说明（Section 4）

同样搜索 `TODO: 替换为真实内容`，在每个标签页（整体设计/机械/电路/软件/发射）中填入真实信息。

参数表格在 `index.html` 的 `<table class="param-table">` 中修改。

### 4. 替换系统图片

将飞镖系统的真实照片放入 `assets/images/dart-system/` 目录，然后在 `index.html` 中搜索 `image-placeholder`，替换为：

```html
<img src="assets/images/dart-system/your-photo.jpg" alt="描述" style="width:100%; border-radius: var(--radius-lg);">
```

### 5. 添加队员信息

编辑 `js/gallery.js` 中的 `members` 数组：

```js
var members = [
  {
    name: '你的名字',
    role: '机械结构',         // 可选：机械结构 / 电控算法 / 视觉识别 / 项目管理
    season: '2025 赛季',
    photo: '',                 // 留空显示首字母头像，或填写路径如 'assets/images/members/name.jpg'
    quote: '你的一句话寄语。'
  },
  // ... 更多队员
];
```

### 6. 添加队员照片

将队员照片放入 `assets/images/members/`，并在 `gallery.js` 中填写对应路径。

## 🎨 自定义样式

所有 CSS 变量定义在 `css/variables.css` 中，可直接修改：

- 配色方案：修改 `--color-*` 变量
- 字体：修改 `--font-sans` 和 `--font-mono`
- 间距：修改 `--space-*` 变量

## 📱 响应式支持

| 宽度 | 布局 |
|------|------|
| < 640px | 单列，移动端优化 |
| 640-767px | 照片墙 2 列 |
| 768-1023px | 导航横向展开 |
| 1024-1279px | 照片墙 3 列，完整体验 |
| ≥ 1280px | 照片墙 4 列，最大宽度 1200px |

## 🎯 功能特性

- ✅ 单页滚动，6 个 Section
- ✅ 标签页切换（资料汇总 + 系统说明）
- ✅ 队员照片墙 + 灯箱浏览
- ✅ URL hash 支持（分享特定标签页链接）
- ✅ 深色科技风主题
- ✅ 移动端汉堡菜单
- ✅ 滚动入场动画
- ✅ 键盘可访问（Tab 导航、ESC 关闭灯箱）
- ✅ 零依赖，纯 HTML + CSS + JS

## 📝 许可

Built with HTML + CSS + JS for RoboMaster.
# web_dart

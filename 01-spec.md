# 云创科技官网 - 技术规格文档

**文档版本**: 1.0  
**创建日期**: 2026-06-13  
**项目类型**: 企业官网（静态多页面应用）  
**技术栈**: HTML5 + CSS3 + Vanilla JavaScript

---

## 目录

1. [项目概述](#1-项目概述)
2. [系统架构](#2-系统架构)
3. [文件结构设计](#3-文件结构设计)
4. [组件规范](#4-组件规范)
5. [数据流设计](#5-数据流设计)
6. [接口定义](#6-接口定义)
7. [性能指标](#7-性能指标)
8. [安全考虑](#8-安全考虑)
9. [实现约束](#9-实现约束)
10. [浏览器兼容性](#10-浏览器兼容性)
11. [可访问性要求](#11-可访问性要求)
12. [部署方案](#12-部署方案)

---

## 1. 项目概述

### 1.1 项目背景

云创科技是一家企业数字化转型服务商，需要建设官方企业网站展示公司形象、服务能力、客户案例，并提供在线联系渠道。

### 1.2 项目目标

- 建立专业的企业品牌形象
- 清晰展示三大核心服务（网站建设、移动开发、技术咨询）
- 通过客户案例增强信任度
- 提供便捷的在线咨询渠道
- 实现 12 项核心交互功能

### 1.3 目标用户

- **企业决策者**：CEO、CTO、运营总监，关注商业价值和服务能力
- **技术负责人**：技术总监、IT 经理，关注技术实力和案例细节
- **混合受众**：需要兼顾商业价值和技术深度

### 1.4 核心指标

| 指标 | 目标值 |
|------|--------|
| 首屏加载时间 | < 2 秒 |
| Lighthouse 性能评分 | > 90 |
| 页面数量 | 4 个独立页面 |
| 交互功能 | 12 项 |
| 响应式断点 | 768px |

---

## 2. 系统架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                      用户浏览器                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ index    │  │ services │  │  cases   │  │contact │ │
│  │  .html   │  │  .html   │  │  .html   │  │ .html  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │              │              │             │      │
│       └──────────────┴──────────────┴─────────────┘      │
│                      │                                   │
│              ┌───────┴────────┐                          │
│              │  style.css     │                          │
│              │  (共享样式)     │                          │
│              └────────────────┘                          │
│                      │                                   │
│       ┌──────────────┴──────────────┐                   │
│       │                             │                   │
│  ┌────┴─────┐                ┌──────┴──────┐           │
│  │ main.js  │                │  page-*.js  │           │
│  │ (共享逻辑)│                │ (页面逻辑)   │           │
│  └──────────┘                └─────────────┘           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 技术栈选型

| 层级 | 技术 | 说明 |
|------|------|------|
| 结构层 | HTML5 | 语义化标签，SEO 友好 |
| 表现层 | CSS3 | CSS 变量、Flexbox/Grid、动画 |
| 行为层 | Vanilla JavaScript (ES6+) | 无框架依赖，轻量高效 |
| 构建工具 | 无 | 纯静态文件，零构建 |
| 版本控制 | Git | 代码版本管理 |

### 2.3 架构设计原则

1. **零依赖**：不使用任何前端框架或库，保持轻量
2. **模块化**：JavaScript 按功能模块组织，避免全局污染
3. **可维护性**：CSS 变量统一管理，便于主题切换
4. **性能优先**：最小化资源请求，优化加载速度
5. **渐进增强**：核心内容优先，交互功能增强体验

---

## 3. 文件结构设计

### 3.1 目录结构

```
scr/
├── index.html              # 首页
├── services.html           # 服务页
├── cases.html              # 案例页
├── contact.html            # 联系页
├── assets/
│   ├── css/
│   │   └── style.css       # 全局样式
│   ├── js/
│   │   ├── main.js         # 共享逻辑（导航、汉堡菜单等）
│   │   ├── home.js         # 首页逻辑
│   │   ├── services.js     # 服务页逻辑
│   │   ├── cases.js        # 案例页逻辑
│   │   └── contact.js      # 联系页逻辑
│   └── images/
│       ├── logo.png        # 公司 Logo
│       ├── clients/        # 客户 Logo（可选）
│       └── cases/          # 案例相关图片（可选）
└── docs/
    └── 01-spec.md          # 技术规格文档
```

### 3.2 文件职责说明

| 文件 | 职责 | 大小预估 |
|------|------|----------|
| style.css | 全局样式、CSS 变量、组件样式、响应式 | ~15KB |
| main.js | 导航高亮、汉堡菜单、滚动监听工具 | ~3KB |
| home.js | 数字滚动、Logo 轮播、卡片悬浮 | ~4KB |
| services.js | Tab 切换、价格切换、FAQ 手风琴 | ~3KB |
| cases.js | 筛选、弹窗逻辑 | ~3KB |
| contact.js | 表单验证、提交动画 | ~3KB |

---

## 4. 组件规范

### 4.1 全局组件

#### 4.1.1 导航栏组件 (Navigation)

**结构**：
```
Header
├── Logo（文字/图片）
├── Nav Menu
│   ├── 首页
│   ├── 服务
│   ├── 案例
│   └── 联系我们
└── Hamburger Button（移动端）
```

**行为规范**：
- 固定定位（position: fixed）
- 滚动时添加阴影效果
- 当前页导航项高亮（active class）
- 移动端：汉堡菜单点击展开/收起
- 断点：768px

**CSS 变量**：
```css
--nav-height: 60px;
--nav-bg: #ffffff;
--nav-text: #333333;
--nav-active-color: #0066cc;
```

#### 4.1.2 页脚组件 (Footer)

**结构**：
```
Footer
├── 公司信息区
│   ├── 公司名称
│   ├── 口号
│   └── 版权信息
├── 快速链接区
│   ├── 首页
│   ├── 服务
│   ├── 案例
│   └── 联系我们
└── 联系方式区
    ├── 邮箱
    ├── 电话
    └── 地址
```

### 4.2 首页组件

#### 4.2.1 Hero 区组件

**结构**：
```
Hero Section
├── 公司名标题
├── 口号副标题
└── CTA 按钮「了解服务」
```

**交互**：
- CTA 按钮点击跳转至 services.html
- 按钮悬停效果：背景色变化 + 轻微上浮

#### 4.2.2 数字统计组件

**结构**：
```
Stats Section
├── Stat Item 1
│   ├── 数字（200+）
│   └── 标签（客户）
├── Stat Item 2
│   ├── 数字（50+）
│   └── 标签（团队成员）
└── Stat Item 3
    ├── 数字（99%）
    └── 标签（满意度）
```

**交互逻辑**：
- 使用 Intersection Observer API 监听进入视口
- 数字从 0 动画滚动至目标值
- 动画时长：2 秒
- 缓动函数：ease-out
- 仅触发一次（unobserve after animation）

**数据配置**：
```javascript
const statsData = [
  { target: 200, suffix: '+', label: '客户' },
  { target: 50, suffix: '+', label: '团队成员' },
  { target: 99, suffix: '%', label: '满意度' }
];
```

#### 4.2.3 服务卡片组件

**结构**：
```
Service Card
├── 图标（可选）
├── 服务名称
└── 简短描述
```

**交互**：
- 鼠标悬停：transform: translateY(-8px)
- 阴影增强：box-shadow 加深
- 过渡时间：0.3s

#### 4.2.4 客户 Logo 轮播组件

**结构**：
```
Logo Carousel
├── Track Container
│   ├── Logo 1（某银行）
│   ├── Logo 2（某零售集团）
│   ├── Logo 3（某教育机构）
│   ├── Logo 4（某制造企业）
│   ├── Logo 5（某物流公司）
│   └── Logo 6（某医疗集团）
└── （复制一份用于无缝滚动）
```

**交互逻辑**：
- 自动横向滚动（CSS animation 或 JS requestAnimationFrame）
- 滚动速度：50px/s
- 鼠标悬停：暂停动画（animation-play-state: paused）
- 无缝循环：复制一份 Logo 列表

### 4.3 服务页组件

#### 4.3.1 Tab 切换组件

**结构**：
```
Tab Container
├── Tab Buttons
│   ├── Tab 1（网站建设）
│   ├── Tab 2（移动开发）
│   └── Tab 3（技术咨询）
└── Tab Contents
    ├── Content 1
    │   ├── 服务名称
    │   ├── 详细描述（80 字）
    │   ├── 特点列表（4 项）
    │   └── 代表案例
    ├── Content 2
    └── Content 3
```

**交互逻辑**：
- 点击 Tab 按钮切换对应内容
- 当前 Tab 按钮高亮（active class）
- 内容切换使用淡入效果（opacity + transition）
- 默认显示第一个 Tab

**数据结构**：
```javascript
const servicesData = [
  {
    id: 'website',
    name: '网站建设',
    description: '...', // 80 字描述
    features: ['特点1', '特点2', '特点3', '特点4'],
    case: '某银行官网项目'
  },
  // ... 其他服务
];
```

#### 4.3.2 价格表格组件

**结构**：
```
Pricing Section
├── Toggle Switch（月付/年付）
└── Pricing Table
    ├── Column 1（基础版）
    │   ├── 价格
    │   ├── 功能列表
    │   └── CTA 按钮
    ├── Column 2（专业版）
    └── Column 3（企业版）
```

**交互逻辑**：
- 点击切换按钮：月付 ↔ 年付
- 年付价格 = 月付价格 × 10
- 年付模式显示「省 2 个月」标签
- 价格数字切换动画（淡入淡出）

**数据配置**：
```javascript
const pricingData = {
  basic: { monthly: 2999, features: [...] },
  pro: { monthly: 5999, features: [...] },
  enterprise: { monthly: 9999, features: [...] }
};
```

#### 4.3.3 FAQ 手风琴组件

**结构**：
```
FAQ Container
├── FAQ Item 1
│   ├── Question
│   └── Answer（默认隐藏）
├── FAQ Item 2
├── FAQ Item 3
└── FAQ Item 4
```

**交互逻辑**：
- 点击问题展开/收起答案
- 同时只能展开一个（排他性）
- 展开时显示箭头旋转动画
- 高度过渡动画（max-height + transition）

### 4.4 案例页组件

#### 4.4.1 筛选栏组件

**结构**：
```
Filter Bar
├── Button（全部）
├── Button（金融）
├── Button（零售）
├── Button（教育）
└── Button（制造）
```

**交互逻辑**：
- 点击筛选按钮过滤案例卡片
- 当前筛选按钮高亮
- 使用 CSS 类控制显示/隐藏（display: none）
- 添加淡入淡出过渡效果

#### 4.4.2 案例卡片组件

**结构**：
```
Case Card
├── 行业标签
├── 客户名称
└── 一句话描述
```

**数据属性**：
```html
<div class="case-card" data-category="金融" data-id="1">
  <!-- 内容 -->
</div>
```

**交互**：
- 点击卡片弹出详情弹窗
- 鼠标悬停：轻微上浮效果

#### 4.4.3 详情弹窗组件

**结构**：
```
Modal Overlay（半透明遮罩）
└── Modal Content
    ├── 关闭按钮（×）
    ├── 客户名称
    ├── 行业标签
    ├── 详细描述（100 字）
    └── 技术栈标签列表
```

**交互逻辑**：
- 点击卡片打开弹窗
- 遮罩层：background: rgba(0,0,0,0.5)
- 弹窗居中显示
- 打开动画：scale + opacity
- 关闭方式：
  - 点击关闭按钮
  - 点击遮罩层
  - 按 ESC 键
- 打开时禁止背景滚动（overflow: hidden）

**数据配置**：
```javascript
const casesData = [
  {
    id: 1,
    category: '金融',
    client: '某银行',
    summary: '一句话描述',
    description: '...', // 100 字详细描述
    techStack: ['React', 'Node.js', 'MySQL']
  },
  // ... 其他案例（共 6 个）
];
```

### 4.5 联系页组件

#### 4.5.1 联系表单组件

**结构**：
```
Contact Form
├── 姓名输入框
├── 邮箱输入框
├── 公司输入框
├── 需求类型下拉框
├── 留言文本域
├── 错误提示区
└── 提交按钮
```

**表单字段配置**：
```javascript
const formFields = {
  name: {
    type: 'text',
    required: true,
    validate: (value) => value.trim() !== '',
    errorMessage: '请输入姓名'
  },
  email: {
    type: 'email',
    required: true,
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: '请输入正确邮箱'
  },
  company: {
    type: 'text',
    required: false
  },
  serviceType: {
    type: 'select',
    required: true,
    options: ['网站建设', '移动开发', '技术咨询', '其他']
  },
  message: {
    type: 'textarea',
    required: true,
    validate: (value) => value.trim().length >= 10,
    errorMessage: '请至少输入 10 个字'
  }
};
```

**实时验证逻辑**：
- 触发时机：失焦（blur）+ 输入（input）
- 验证失败：显示错误提示，输入框边框变红
- 验证成功：隐藏错误提示，输入框边框恢复正常
- 提交按钮状态：所有必填字段验证通过后启用

**提交流程**：
```
1. 用户点击提交
2. 按钮变为加载状态（禁用 + 转圈动画）
3. 模拟异步请求（setTimeout 1.5 秒）
4. 显示成功提示（绿色对勾 + 文案）
5. 重置表单
```

#### 4.5.2 联系信息组件

**结构**：
```
Contact Info
├── 公司地址
├── 邮箱
├── 电话
└── 工作时间
```

#### 4.5.3 地图占位组件

**结构**：
```
Map Placeholder
├── 灰色背景区块
└── 标记点图标（居中）
```

**样式**：
- 背景色：#e0e0e0
- 高度：300px
- 标记点：使用 CSS 绘制或 SVG 图标

---

## 5. 数据流设计

### 5.1 页面加载流程

```
用户访问页面
    ↓
浏览器解析 HTML
    ↓
加载 style.css（阻塞渲染）
    ↓
加载 main.js（共享逻辑）
    ↓
加载页面特定 JS（home.js/services.js/cases.js/contact.js）
    ↓
DOM 就绪（DOMContentLoaded）
    ↓
初始化组件
    ↓
绑定事件监听器
    ↓
页面可交互
```

### 5.2 交互事件流

#### 5.2.1 数字滚动动画流程

```
用户滚动页面
    ↓
Intersection Observer 检测到统计区域进入视口
    ↓
触发 animateNumbers() 函数
    ↓
requestAnimationFrame 循环
    ↓
计算当前进度（0-1）
    ↓
应用缓动函数（ease-out）
    ↓
更新数字显示
    ↓
达到目标值 → 停止动画 → unobserve
```

#### 5.2.2 表单提交流程

```
用户填写表单
    ↓
实时验证（blur + input 事件）
    ↓
所有字段验证通过 → 启用提交按钮
    ↓
用户点击提交
    ↓
阻止默认提交行为
    ↓
按钮进入加载状态（disabled + loading spinner）
    ↓
模拟异步请求（1.5 秒）
    ↓
请求完成
    ↓
显示成功提示
    ↓
重置表单
```

#### 5.2.3 弹窗交互流程

```
用户点击案例卡片
    ↓
获取 data-id 属性
    ↓
从 casesData 中查找对应数据
    ↓
渲染弹窗内容
    ↓
显示遮罩层 + 弹窗（添加动画类）
    ↓
禁止背景滚动（body.overflow = 'hidden'）
    ↓
用户操作：
├── 点击关闭按钮 → 关闭弹窗
├── 点击遮罩层 → 关闭弹窗
└── 按 ESC 键 → 关闭弹窗
    ↓
移除动画类 → 恢复背景滚动
```

### 5.3 状态管理

由于项目规模较小，采用简单的 DOM 状态管理：

- **Tab 状态**：通过 active class 标识当前 Tab
- **筛选状态**：通过 data-active 属性标识当前筛选条件
- **表单状态**：通过 validity 属性和自定义 data-valid 属性管理
- **弹窗状态**：通过 body.modal-open class 控制

---

## 6. 接口定义

### 6.1 表单提交接口（预留）

**接口地址**：`POST /api/contact`

**请求头**：
```
Content-Type: application/json
```

**请求体**：
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "company": "某某公司",
  "serviceType": "网站建设",
  "message": "我们需要建设一个企业官网..."
}
```

**响应**：
```json
{
  "success": true,
  "message": "提交成功，我们将在 24 小时内联系您"
}
```

**错误响应**：
```json
{
  "success": false,
  "message": "提交失败，请稍后重试"
}
```

### 6.2 JavaScript 模块接口

#### 6.2.1 main.js 导出接口

```javascript
// 初始化导航高亮
function initNavigation() {}

// 初始化汉堡菜单
function initHamburgerMenu() {}

// 工具函数：平滑滚动
function smoothScrollTo(target) {}

// 工具函数：防抖
function debounce(func, wait) {}

// 工具函数：节流
function throttle(func, limit) {}
```

#### 6.2.2 页面模块初始化接口

```javascript
// home.js
function initHome() {
  initNumberAnimation();
  initLogoCarousel();
  initServiceCards();
}

// services.js
function initServices() {
  initTabs();
  initPricingToggle();
  initFAQ();
}

// cases.js
function initCases() {
  initFilter();
  initModal();
}

// contact.js
function initContact() {
  initFormValidation();
  initFormSubmit();
}
```

---

## 7. 性能指标

### 7.1 核心 Web 指标目标

| 指标 | 目标值 | 说明 |
|------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 最大内容绘制 |
| FID (First Input Delay) | < 100ms | 首次输入延迟 |
| CLS (Cumulative Layout Shift) | < 0.1 | 累积布局偏移 |
| FCP (First Contentful Paint) | < 1.8s | 首次内容绘制 |
| TTFB (Time to First Byte) | < 600ms | 首字节时间 |

### 7.2 资源大小限制

| 资源类型 | 大小限制 | 优化策略 |
|----------|----------|----------|
| HTML 文件 | < 50KB/页 | 语义化标签，避免冗余 |
| CSS 文件 | < 20KB | CSS 变量复用，避免冗余 |
| JavaScript 文件 | < 15KB/文件 | 模块化，按需加载 |
| 图片资源 | < 100KB/张 | WebP 格式，懒加载 |
| 总页面大小 | < 500KB | 压缩，Gzip |

### 7.3 性能优化策略

#### 7.3.1 加载优化

- **CSS 放在 `<head>`**：避免渲染阻塞
- **JS 放在 `</body>` 前**：使用 `defer` 属性
- **资源预加载**：关键资源使用 `<link rel="preload">`
- **DNS 预解析**：外部资源使用 `<link rel="dns-prefetch">`

#### 7.3.2 渲染优化

- **避免强制同步布局**：批量读写 DOM
- **使用 CSS transform**：替代 top/left 动画
- **will-change 属性**：提示浏览器优化动画元素
- **减少重绘重排**：合并样式修改

#### 7.3.3 运行时优化

- **事件委托**：减少事件监听器数量
- **防抖节流**：高频事件优化（scroll、resize、input）
- **Intersection Observer**：替代 scroll 事件监听
- **requestAnimationFrame**：流畅动画

#### 7.3.4 图片优化

- **懒加载**：非首屏图片使用 `loading="lazy"`
- **响应式图片**：使用 `<picture>` 和 `srcset`
- **图片格式**：优先 WebP，降级 JPEG/PNG
- **图片尺寸**：按实际显示尺寸提供

### 7.4 缓存策略

```
Cache-Control: public, max-age=31536000
ETag: "5d8c72a1ed8ed21:0"
Last-Modified: Thu, 13 Jun 2026 12:00:00 GMT
```

- **静态资源**：长期缓存（1 年）
- **HTML 文件**：不缓存或短期缓存（5 分钟）
- **文件名哈希**：CSS/JS 文件名包含内容哈希

---

## 8. 安全考虑

### 8.1 XSS 防护

#### 8.1.1 输入验证

- **客户端验证**：表单字段正则校验
- **服务端验证**：后端必须再次验证（预留接口时考虑）
- **白名单机制**：只允许预期的输入格式

#### 8.1.2 输出编码

- **DOM 操作**：使用 `textContent` 而非 `innerHTML`
- **属性设置**：使用 `setAttribute()` 而非直接拼接
- **URL 参数**：使用 `encodeURIComponent()` 编码

#### 8.1.3 Content Security Policy

建议配置 CSP 头：
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```

### 8.2 表单安全

#### 8.2.1 防重复提交

- 提交后禁用按钮
- 记录提交时间戳，限制提交频率
- 服务端幂等性处理（预留接口时考虑）

#### 8.2.2 敏感信息保护

- 不在前端存储敏感信息
- 表单提交使用 HTTPS
- 不在 URL 中传递敏感参数

### 8.3 代码安全

#### 8.3.1 避免 eval

- 不使用 `eval()`、`new Function()`
- 不使用 `setTimeout/setInterval` 字符串参数

#### 8.3.2 第三方资源

- 不引入未经验证的第三方脚本
- 使用 SRI（Subresource Integrity）校验外部资源

### 8.4 数据安全

#### 8.4.1 本地存储

- 不使用 localStorage 存储敏感信息
- 清理过期的本地缓存

#### 8.4.2 Cookie 安全

- 使用 `HttpOnly`、`Secure`、`SameSite` 属性
- 不存储敏感信息在 Cookie 中

---

## 9. 实现约束

### 9.1 技术约束

| 约束项 | 说明 |
|--------|------|
| 无框架依赖 | 纯 HTML + CSS + Vanilla JS |
| 无构建工具 | 不使用 Webpack、Gulp 等 |
| 无预处理器 | 不使用 Sass、Less |
| 无包管理器 | 不使用 npm、yarn |
| 浏览器兼容 | 支持现代浏览器最新两个版本 |

### 9.2 设计约束

| 约束项 | 说明 |
|--------|------|
| 配色方案 | 自由设计，使用 CSS 变量管理 |
| 响应式断点 | 768px（移动端/桌面端） |
| 字体选择 | 系统字体栈或免费商用字体 |
| 图标方案 | CSS 绘制、SVG 内联或免费图标库 |

### 9.3 内容约束

| 约束项 | 说明 |
|--------|------|
| 语言 | 全站中文 |
| 服务数量 | 3 个（网站建设、移动开发、技术咨询） |
| 案例数量 | 6 个（金融、零售、教育、制造等行业） |
| FAQ 数量 | 4 个常见问题 |

### 9.4 交互约束

| 约束项 | 说明 |
|--------|------|
| 交互总数 | 12 项（必须全部实现） |
| 动画时长 | 0.3s - 2s（视场景而定） |
| 表单验证 | 实时验证（blur + input） |
| 弹窗关闭 | 支持点击遮罩、关闭按钮、ESC 键 |

### 9.5 性能约束

| 约束项 | 说明 |
|--------|------|
| 首屏加载 | < 2 秒 |
| 页面大小 | < 500KB |
| HTTP 请求 | < 20 个/页 |
| DOM 节点 | < 500 个/页 |

---

## 10. 浏览器兼容性

### 10.1 支持范围

| 浏览器 | 版本要求 | 市场份额 |
|--------|----------|----------|
| Chrome | 最新两个版本 | ~65% |
| Firefox | 最新两个版本 | ~10% |
| Safari | 最新两个版本 | ~15% |
| Edge | 最新两个版本 | ~5% |
| 移动端 Safari | iOS 14+ | ~10% |
| 移动端 Chrome | Android 10+ | ~20% |

### 10.2 降级策略

| 特性 | 降级方案 |
|------|----------|
| CSS Grid | Flexbox 布局 |
| CSS Variables | 预编译颜色值 |
| Intersection Observer | scroll 事件监听 |
| ES6+ | Babel 转译（如需） |
| WebP | JPEG/PNG 降级 |

### 10.3 前缀处理

使用 Autoprefixer 或手动添加浏览器前缀：
```css
-webkit-transform: translateY(-8px);
-moz-transform: translateY(-8px);
-ms-transform: translateY(-8px);
transform: translateY(-8px);
```

---

## 11. 可访问性要求

### 11.1 WCAG 2.1 AA 级标准

#### 11.1.1 感知性

- **文本替代**：所有图片提供 alt 属性
- **字幕和替代**：视频内容提供字幕
- **可适配**：内容结构语义化
- **可区分**：前景与背景对比度 ≥ 4.5:1

#### 11.1.2 可操作性

- **键盘可访问**：所有交互元素可通过键盘操作
- **足够时间**：动画可暂停或停止
- **癫痫安全**：不使用闪烁内容
- **导航辅助**：提供跳过导航链接

#### 11.1.3 可理解性

- **可读性**：语言属性声明（lang="zh-CN"）
- **可预测性**：交互行为一致
- **输入辅助**：表单错误提示清晰

#### 11.1.4 健壮性

- **解析兼容**：HTML 语义化
- **辅助技术兼容**：ARIA 属性正确使用

### 11.2 键盘导航

| 元素 | 键盘操作 |
|------|----------|
| 导航链接 | Tab 键聚焦，Enter 键激活 |
| Tab 按钮 | Tab 键聚焦，Enter/Space 键切换 |
| FAQ 问题 | Tab 键聚焦，Enter/Space 键展开 |
| 案例卡片 | Tab 键聚焦，Enter/Space 键打开弹窗 |
| 弹窗 | Tab 键循环聚焦，ESC 键关闭 |
| 表单 | Tab 键切换字段，Enter 键提交 |

### 11.3 屏幕阅读器支持

- 使用语义化标签（nav、main、section、article）
- 提供 ARIA 标签（aria-label、aria-labelledby）
- 状态变化通知（aria-expanded、aria-hidden）
- 动态内容更新（aria-live）

---

## 12. 部署方案

### 12.1 部署架构

```
用户浏览器
    ↓
CDN（可选）
    ↓
静态文件服务器
├── index.html
├── services.html
├── cases.html
├── contact.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── docs/
```

### 12.2 部署选项

#### 12.2.1 静态托管服务

- **GitHub Pages**：免费，适合开源项目
- **Netlify**：免费额度，自动部署
- **Vercel**：免费额度，全球 CDN
- **阿里云 OSS**：国内访问快，按量计费

#### 12.2.2 传统服务器

- **Nginx**：高性能静态文件服务器
- **Apache**：兼容性好，配置灵活

### 12.3 部署流程

```
1. 代码审查
   ↓
2. 本地测试
   ↓
3. 构建优化（可选）
   ├── HTML 压缩
   ├── CSS 压缩
   ├── JS 压缩
   └── 图片压缩
   ↓
4. 上传至服务器
   ↓
5. 配置 CDN（可选）
   ↓
6. 配置 HTTPS
   ↓
7. 验证部署
```

### 12.4 监控与维护

#### 12.4.1 性能监控

- Google Analytics：用户行为分析
- Google Search Console：SEO 监控
- 自定义性能监控：上报 Core Web Vitals

#### 12.4.2 错误监控

- 前端错误捕获：window.onerror
- 404 页面监控：分析死链
- 表单提交监控：成功率统计

#### 12.4.3 内容更新

- 案例更新：定期添加新案例
- 内容审核：确保信息准确性
- 版本管理：Git 版本控制

---

## 附录

### A. 术语表

| 术语 | 说明 |
|------|------|
| LCP | Largest Contentful Paint，最大内容绘制 |
| FID | First Input Delay，首次输入延迟 |
| CLS | Cumulative Layout Shift，累积布局偏移 |
| FCP | First Contentful Paint，首次内容绘制 |
| TTFB | Time to First Byte，首字节时间 |
| CSP | Content Security Policy，内容安全策略 |
| ARIA | Accessible Rich Internet Applications |
| WCAG | Web Content Accessibility Guidelines |

### B. 参考资料

- [MDN Web Docs](https://developer.mozilla.org/zh-CN/)
- [W3C 标准](https://www.w3.org/)
- [Web.dev](https://web.dev/)
- [Can I Use](https://caniuse.com/)

### C. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-06-13 | 初始版本 |

---

**文档结束**

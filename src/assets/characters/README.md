# 奶龙角色图片资源

开发者将 PNG 图片放入对应角色目录即可，无需修改任何代码。

## 目录结构

```
characters/
  warm/
    idle.png      # 默认状态（必须）
    happy.png     # 开心状态（可选，缺失时降级为 idle）
    sad.png       # 低落状态（可选）
    shy.png       # 害羞状态（可选）
  adventure/
    idle.png
    happy.png
  tsundere/
    idle.png
    happy.png
  mystery/
    idle.png
    happy.png
```

## 规则

- 图片格式：PNG（透明背景推荐）
- `idle.png` 是降级兜底，建议每个角色至少提供此文件
- 缺失任何 emotion 图片时自动使用 `idle.png`
- 完全没有图片时使用内嵌 SVG 奶龙作为占位
- 重新构建后新图片生效（`npm run build`）

## 禁止

- 用户无法上传或替换图片
- 没有图片管理后台
- 这是开发者手动管理的资源目录

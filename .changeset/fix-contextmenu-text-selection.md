---
"@lovinsp/core": patch
---

修复右键时文本被选中的问题

- 在 handleContextMenu 中添加 stopImmediatePropagation 阻止事件透传
- 新增 handleSelectStart 阻止 Shift+点击触发的浏览器扩展选择行为

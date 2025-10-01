---
title: 关于在OpenWebUI中处理Base64返回的图片
published: 2025-10-01T17:59:24
description: '接入一些图片模型发现有的不是直接返回图片链接，而是Base64编码的图片数据，本文介绍如何处理这种情况。'
image: '/uploads/images/openwebui-base-image.png'
tags: [OpenWebUI, AI绘画, Base64]

draft: false 
lang: ''
---

::github{repo="Besty0728/OpenWebUI-Base64-Image"}

# 关于在OpenWebUI中处理Base64返回的图片
## 1.打开OpenWebUI的函数界面直接选择从新连接导入
```bash
https://github.com/Besty0728/OpenWebUI-Base64-Image/blob/main/image_decoder_pipe.py
```
## 2.安装完成后填写对应的参数
- API基础URL：自定义请求模型供应商地址
- API Key：自定义请求模型供应商的Key
- 模型ID：自定义请求模型供应商的模型名称
- 每次生成费用（元）：自定义请求模型供应商单次生成费用（可配合计费插件使用）
- 请求超时时间（秒）：自定义请求模型供应商的请求超时时间（等待图片）

完成后效果如下
![](/uploads/images/baseimage1.png)
---
![](/uploads/images/baseimage2.png)
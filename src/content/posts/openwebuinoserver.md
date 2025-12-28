---
title: 使用云应用无服务器部署OpenWebUI
published: 2025-10-01T12:21:05
description: '使用雨云的云应用来无服务器部署OpenWebUI'
image: '/images/OpenwebuiNO.webp'
tags: [无服务器, OpenWebUI, Cloudflare]

draft: false 
lang: ''
---
[视频链接](https://www.bilibili.com/video/BV1CGHJzaEor/)

[雨云注册链接](https://www.rainyun.com/star666_)优惠码：```star666```

# 今天给大家带来无服务器部署OpenWebUI

# 雨云云应用商店选择OpenWebUI
![](/images/rainopenwebui1.webp)
## 然后选择创建即可，核心与内存建议2h2g，记住你的端口号（后续域名访问要用）
![](/images/rainopenwebui.webp)
## 稍作等待，等你的公网ip+端口可访问后我们进入域名配置访问

# Cloudflare配置域名访问
## 1.先去DNS配置，采取a记录，将你需要访问的域名（例：aiweb.cloudrunmax.top）;名称则为aiweb、解析内容为公网ip
## 2.配置端口转发规则，来到规则页面选择Origin Rules
### 名称随意，如下填写为：域名/*
![](/images/openwebuicf1.webp)
### 传入端口则为上文你公网ip访问后的端口号
![](/images/openwebuicf2.webp)
## 3.配置完成均激活后访问即可成功
![](/images/openwebuidomain.webp)
---
title: 国内使用Gemini的官方模型
published: 2025-10-08T17:37:02
description: '通过EdgeOne的AI网关免魔法法使用Gemini的官方模型'
image: '/uploads/images/eoopenwebuispeed.png'
tags: [EdgeOne, Gemini, OpenWebUI]

draft: false 
lang: ''
---

## 通过EdgeOne的AI网关安全使用Gemini的官方模型
### **是否苦恼于具有Gemini的免费层级的API Key但是无法在国内使用？以及搭建中转服务器价格过于高昂？今天给大家带来一个新的解决方案，使用EdgeOne的AI网关来访问Gemini的官方模型**
## 使用EdgeOne的AI网关的访问速度（国内）
这个速度可以说是比我们开启魔法或中转都要快，并且是官方模型，以下是AI网关的访问速度
![](/uploads/images/eoaiurl.png)
## 1.获得AI Studio的API Key(Gemini官方且具有免费层级)
[AI Studio](https://aistudio.google.com/)请开启**魔法**进入

或者你已经具有自己的Gemini API Key也可以
## 2.注册EdgeOne并创建AI网关，进入该界面选择Gemini AI
![](/uploads/images/eoaiurlgs.png)
> [!NOTE]
> 记住以下内容
> - OE Key（请求头模板对应值）
> - Gateway Name（请求头模板对应值）
> - OE-AI-Provider（请求头模板对应值）
## 3.使用OpenWebUI来访问
### 3.1.进入OpenWebUI的函数页面来下载我的Pipe
::github{repo="Besty0728/OpenWebUI-EdgeOne-AI-Gemini"}

安装链接
```bash
https://github.com/Besty0728/OpenWebUI-EdgeOne-AI-Gemini/blob/main/edgeone_ai.py
```
### 3.2.安装后进行配置
对照上面的信息进行填写
- 自定义API请求地址（例：https://ai-gateway.eo-edgefunctions7.com/v1）
- 你的 API Key（使用负载均衡则使用,隔开）
- 模型名称（多个模型使用英文逗号,隔开）
- OE Key（请求头模板对应值）
- Gateway Name（请求头模板对应值）
- OE-AI-Provider（请求头模板对应值）
### 3.3.开启后对话效果，十分迅速！
![](/uploads/images/eoopenwebuispeed.png)
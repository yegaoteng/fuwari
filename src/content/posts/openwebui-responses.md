---
title: 关于如何在OpenWebUI中启用OpenAI的responses端点的模型
published: 2025-09-21T17:50:42
description: '最近发现OpenWebUI尚未支持OpenAI的新responses端点模型，（Cloudflare提供的OSS模型以及官方O系列模型）社区解决方案如下'
image: '/uploads/images/cloudflare-color.png'
tags: [OpenWebUI, OpenAI, Cloudflare, API端点兼容]

draft: false 
lang: ''
---
## 1.此次我们采用了社区关于responses端点的解决方案
[社区解决方案链接](https://github.com/jrkropp/open-webui-developer-toolkit/tree/main/functions/pipes/openai_responses_manifold)
先按照社区文档的步骤进行操作，安装这个Pipe；安装链接如下
```bash
https://github.com/jrkropp/open-webui-developer-toolkit/blob/main/functions/pipes/openai_responses_manifold/openai_responses_manifold.py
```
安装后需要我们对此Pipe进行一些修改，主要是修改你要请求的端点以及模型等
![](/uploads/images/OPRmanager.png)
## 2.本文以Cloudflare的OSS模型为例
[Cloudflare OSS模型调用文档](https://developers.cloudflare.com/changelog/2025-08-05-openai-open-models/)（如果你需要调用官方的O系列模型也是类似的）
### 1.首先你需要去Cloudflare注册一个账号，然后创建一个API Token、获得你的账户ID，获得方法如图
- 账户ID获得方法
![](/uploads/images/CFAI1.png)

- 创建API Token，选择后续的WorkerAI模板即可
![](/uploads/images/CFAI2.png)

创建完成后你会获得一个API Token，复制保存好
### 2.然后我们需要修改我们刚才安装的Pipe
- 请求端点如下
```plaintext
https://api.cloudflare.com/client/v4/accounts/<account_id>/ai/v1/responses
```
- 将上面的`<account_id>`替换为你自己的账户ID，例如id为114514
```plaintext
https://api.cloudflare.com/client/v4/accounts/114514/ai/v1/responses
```
- API Key处填写你刚才创建的API Token

- 模型名称处填写你要调用的模型名称，例如本次的`@cf/openai/gpt-oss-120b`，如果你要调用其他模型请参考Cloudflare的文档（以上只适用于responses端点的模型）

**后续填入依旧如图**
![](/uploads/images/OPRmanager.png)
### 3.最后别忘了启用该Pipe，以及某些模型的特定修改
例如本文的Cloudflare的OSS模型需要我们在参数处选择禁用`Stream Chat Response`（流式对话响应/流式输出；因为CF不支持流式输出调用该模型）
![](/uploads/images/OSSSetting.png)

### 4.完成后即可愉快使用
实测支持OpenWebUI的联网工具等
![](/uploads/images/OP-OSS.png)
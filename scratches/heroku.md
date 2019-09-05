## [heroku](https://lightnoway.herokuapp.com/db)
### 费用
- 免费 1000h(信用卡)，多个app 公用
  - 只1个app 可 720h（30天24小时）在线
    - 注意 半小时没访问则休眠
  - 查看剩余时间`heroku ps`  
### heroku-cli 来管理
  - 部署 git push 到 heroku  
  - addons,配置服务，数据库等
### 概念
- 作为容器: 远程连接
  - 通过 process.env 组合各服务 
- 项目 
  - heroku local // process.env+= .env 
### 思考
- 容器化程序如何连接 ~ process.env
- 易用：在项目中 操控远端


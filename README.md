# vue-node-app backstage

## Build Setup

``` bash
# 安装依赖环境
cnpm install

# serve with hot reload at localhost:8080项目将在本地8080端口运行（同时启动5000端口的mongodb服务）
cnpm run dev

# 构建
npm run build

# 恢复mongodb数据库
mongorestore -h 127.0.0.1:27017 -d test --dir ~/backstage mongodb

```

# Axios

Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它提供了一种简单而优雅的方式来处理 HTTP 请求和响应。
Axios 支持多种 HTTP 请求方法，如 GET、POST、PUT、DELETE 等。以下是一些示例：

```js
// GET 请求
axios
    .get('/user?ID=12345')
    .then(function (response) {
        // 处理成功情况
        console.log(response);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    });

// POST 请求
axios
    .post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone',
    })
    .then(function (response) {
        // 处理成功情况
        console.log(response);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    });
```

## 项目封装 axios

### 请求参数 📖

| 参数    | 描述                     | 类型    | 默认值                     | 是否必填 |
| :------ | :----------------------- | :------ | :------------------------- | :------- |
| url     | 请求 api                 | string  | /                          | 是       |
| params  | 请求参数                 | object  | {}                         | 是       |
| loading | 用于指示是否显示加载状态 | boolean | setting.js【isLoading】    | 否       |
| cancel  | 用于指示是否取消请求     | boolean | setting.js【cancelRepeat】 | 否       |

### 请求拦截 📚

Axios 提供了请求和响应拦截器，可以在请求或响应被 then 或 catch 处理前拦截它们。
此处主要写入请求的配置，token 等信息。

Axios 支持取消请求，这对于避免发送不必要的请求非常有用。可以使用 CancelToken 来取消请求.

### 响应拦截 📚

Axios 使用 Promise，因此可以使用 catch 方法来处理错误。
此处主要用于对返回信息的二次处理，如 token 过期等。
请求提示语已做合并处理，避免反复出现全屏提示。

| 响应码 | 参数名            | 描述           |
| :----- | :---------------- | :------------- |
| 200    | successCode       | 操作正常       |
| 500    | errorCode         | 系统错误       |
| 401    | overdueCode       | 会话过期       |
| 404    | noCode            | 找不到接口     |
| 400    | badRequestCode    | 请求参数错误   |
| 403    | noPermissionCode  | 无接口权限     |
| 405    | methodAllowedCode | 请求方法不支持 |
| 406    | notAcceptableCode | 未被接受       |
| 502    | badGatewayCode    | 网关错误       |
| 503    | serviceUnavCode   | 服务不可用     |

### 常用请求

| 方法     | 描述   |
| :------- | :----- |
| get      | get    |
| post     | post   |
| put      | put    |
| delete   | delete |
| download | blob   |

### 框架用法

该框架中使用 pont 自动连接 api 地址生成接口文件，每个 api 生成单个接口 js 文件（详见 Pont 介绍）,接口统一需要使用以下方式调用

```js
import { get, post, put, delete, download } from '@/utils/request'
//mods.文件目录.接口名(参数)
await mods.system.login({ id: 1 }).then(async (res)=>{}).catch(()=>{})
```

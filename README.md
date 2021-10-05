# 做个记录在这 也许会回头看

## Vite中配置别名

vite.config.js 中引入 path 模块，然后在 defineConfig 中添加
```js
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
},
```
这样就好了。但是在typescript中还需要做一些配置。

在 tsconfig.json 中添加:

```json
"baseUrl": "./",
"paths": {
  "@": ["src"],
  "@/*": ["src/*"],
}
```
这样 typescript 就不会给警告了。

## 不能将类型“boolean | undefined”分配给类型“Boolean

由于存在 undefined 情况需要加上!!

## 登录路由鉴权

鉴权就一个 if 判断: if (!token) return <Login />
重点在于 useToken.ts 
一个 getToken, 和 saveToken 对应 localSotrage.getItem/sessionStorage.getItem 和 localSotrage.setItem/sessionStorage.getItem
用 useState 管理状态，让 React re-render
非常简单清晰，百度(Google)用中文一搜"React路由鉴权"都写的挺复杂而且不清晰，费了我好些时间，总之感觉不够普遍使用。(React非常灵活)

参考: [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)

还有就是 https://reactrouter.com/web/example/auth-workflow，ReactRouter官方有例子，之前没看到。
用 Context 全局管理，有过这想法。


## marked 样式丢失

这次再次使用 marked 没有出来样式，我终于发现原因了，之前还傻乎乎地跑去提 issues
罪魁祸首：tailwindcss
tailwindcss会去除标签原有的样式，比如 h。
export type routes = {
  path: string;
  component: React.FC<{}>,
  exact: boolean
}

export type PrivateRoutes = routes & {
  role: string; // 当前路由需要的角色权限
  backUrl: string; // 不满足权限跳转的路由
}
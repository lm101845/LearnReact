/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  // 等价于const currentUser = initialState?.currentUser
  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
  };
}

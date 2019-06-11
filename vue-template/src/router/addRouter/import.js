const map = {
  'Nested': () => import('@/views/layout/index.vue'),
  'Menu1': () => import('@/views/menu1/index.vue'),
  'Menu1-1': () => import('@/views/menu1/template/menu1-1.vue'),
  'Menu1-2': () => import('@/views/menu1/template/menu1-2.vue')
}


export default file => {
  return map[file] || null;
}
import _import from './import.js';

export default function addRouter(routerList) {
  const router = [];
  routerList.forEach(item => {
    let new_router = {
      path: item.path,
      name: item.name,
      component: _import(item.name)
    }
    console.log(new_router, '12345432')

    if (item.children) {
      new_router = Object.assign({}, new_router, {
        children: addRouter(item.children)
      })
    }
    if (item.redirect) {
      new_router = Object.assign({}, new_router, {
        redirect: item.redirect
      })
    }
    router.push(new_router)
  });
  return router;
}
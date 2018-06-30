

### acl 
re.:
https://github.com/OptimalBits/node_acl/issues/203
https://github.com/OptimalBits/node_acl

#### 角色分组
超级管理员组 管理员组 用户组 访客组

#### 角色
超级管理员 管理员 用户 访客



```
超级管理员可以编辑管理员，查看所有数据；

管理员可以编辑编辑用户，查看所有数据；

用户可以编辑自己的（供应商信息、客户信息、产品信息、产品批次信息、账单信息），
查看自己的所有信息；

访客暂无权限访问；

目前凡是注册的都是用户。

```


#### 权限
PERMISSION.js

####权限类型：
功能模块以及功能模块内的增删改查等都有对应权限；
eg:
```

allowedPermissions null { provider: [ 'add', 'view', 'edit' ],
  customer: [ 'add', 'view', 'edit' ],
  product: [ 'add', 'view', 'edit' ],
  product_batch: [ 'add', 'view', 'edit' ],
  bill: [ 'add', 'view', 'edit' ] }
whatResources null { bill: [ 'add', 'view', 'edit' ],
  product: [ 'add', 'view', 'edit' ],
  provider: [ 'add', 'view', 'edit' ],
  customer: [ 'add', 'view', 'edit' ],
  product_batch: [ 'add', 'view', 'edit' ] }
```


###### rbac 基于角色的权限访问控制

re.
http://www.cnblogs.com/vinozly/p/4851364.html


如“MENU”表示菜单的访问权限、“OPERATION”表示功能模块的操作权限、“FILE”表示文件的修改权限、“ELEMENT”表示页面元素的可见性控制等。




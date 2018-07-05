/**
 * Created by nick on 2018/1/27.
 */
// var acl = require('acl');
class MyPermissionUtil {
    constructor() {

    }

    init(acl) {
        this.acl = acl;
        // acl.allow('guest', 'business', 'view');
        // acl.allow('guest', 'business2', 'view');
        // return;
        // let dbInstance = db.mongodb_conn1.db;
        // let prefix = 'acl__';
        // let mongodbBackend = new acl.mongodbBackend(dbInstance, prefix);
        // acl = new acl(mongodbBackend);
        let resources = PERMISSION.resources;
        let permissions = PERMISSION.permissions;
        acl.allow([
            {
                roles : [ 'guest' ],
                allows : []
            },
            {
                roles : [ 'user' ],
                allows : [
                    {
                        resources : [
                            resources.provider,
                            resources.customer,
                            resources.product,
                            resources.product_batch,
                            resources.bill,
                        ],
                        permissions : [
                            permissions.view,
                            permissions.add,
                            permissions.edit,
                        ]
                    }
                ]
            },
            {
                roles : [ 'admin' ],
                allows : [
                    {
                        resources : [
                            resources.provider,
                            resources.customer,
                            resources.product,
                            resources.product_batch,
                            resources.bill,
                        ],
                        permissions : [
                            permissions.view,
                        ]
                    },
                    {
                        resources : [
                            resources.user,
                        ],
                        permissions : [
                            permissions.view,
                            permissions.add,
                            permissions.edit,
                        ]
                    },
                ]
            },
            {
                roles : [ 'super_admin' ],
                allows : [
                    {
                        resources : [
                            resources.provider,
                            resources.customer,
                            resources.product,
                            resources.product_batch,
                            resources.bill,
                        ],
                        permissions : [
                            permissions.view,
                        ]
                    },
                    {
                        resources : [
                            resources.admin,
                        ],
                        permissions : [
                            permissions.view,
                            permissions.add,
                            permissions.edit,
                        ]
                    },
                ]
            },
        ]);
    }

    test() {
        let acl = this.acl;
        console.log('test');
        let resources = PERMISSION.resources;
        let permissions = PERMISSION.permissions;
        console.log(acl);
        console.log(acl.addUserRoles);
        acl.addUserRoles('joed', 'user', function (err, res) {
            console.log('addUserRoles', err, res);

            if (err) {
                console.log(err);

            }
            if (res) {
                console.log("User joed is allowed to view blogs")
            }
        })
        acl.userRoles('joed', function (err, res) {
            console.log('userRoles', err, res);

            if (err) {
                console.log(err);

            }
            if (res) {
                console.log("User joed is allowed to view blogs")
            }
        })
        acl.roleUsers('user', function (err, res) {
            console.log('roleUsers', err, res);

            if (err) {
                console.log(err);

            }
            if (res) {
                console.log("User joed is allowed to view blogs")
            }
        })
        acl.isAllowed('joed', resources.provider, permissions.view, function (err, res) {
            console.log('isAllowed provider', err, res);

            if (err) {
                console.log(err);

            }
            if (res) {
                console.log("User joed is allowed to view blogs")
            }
        })
        acl.isAllowed('joed', resources.admin, permissions.view, function (err, res) {
            console.log('isAllowed admin', err, res);

            if (err) {
                console.log(err);

            }
            if (res) {
                console.log("User joed is allowed to view blogs")
            }
        })

        acl.whatResources('user', function (err, res) {
            console.log('whatResources', err, res);
        });

        acl.allowedPermissions('joed', [
            resources.provider,
            resources.customer,
            resources.product,
            resources.product_batch,
            resources.bill,
        ], function (err, permissions) {
            console.log('allowedPermissions', err, permissions)
        })
    };

    get_acl() {
        return this.acl;
    };
}

export default new MyPermissionUtil();


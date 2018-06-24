var redisClient = require('../common/db').redis;
var RbacModel = require('../models/YBSystemModel');
var TagModel = require('../models/YBTagModel');
var User_CompanyModel = require('../models/YBUser_CompanyModel');
var SystemModel = require('../models/YBSystemModel');
var md5 = require('./YBEncryption').md5;

// 读取system表的权限
exports.permissions_list = function(callback) {
    redisClient.get('permissions', function(error, response) {
        if (error) {
            callback(null, error)
        } else if (!response) {
            RbacModel.findOne({}, { permissions: 1, roles: 1 }, function(error, response) {
                var permiss = JSON.stringify(response);
                redisClient.set('permissions', permiss);
                callback(null, response)
            })
        } else {
            callback(null, JSON.parse(response));
        }
    })
}

/*
 * Tag表Redis存储读取
 */
exports.tags_list = function(callback) {
    redisClient.get('tag', function(error, redisResult) {
        if (error) {
            callback(error, null);
            return;
        }
        if (redisResult != null) {
            callback(null, JSON.parse(redisResult));
        } else {
            TagModel.findOne({}, function(error, tagResult) {
                if (error) {
                    callback(error, null);
                    return;
                }
                redisClient.set('tag', JSON.stringify(tagResult));
                callback(null, tagResult);
            })
        }
    })
}

/**
 * 将access_token作为key。user_id和company_id作为value存储到redis中
 */
exports.set_access_token_user_company = function(user_id, company_id, access_token, callback) {
    redisClient.hset("access_token", md5(user_id + company_id), JSON.stringify({
        user_id: user_id,
        company_id: company_id,
        access_token: access_token
    }))
};

/*
 * user_info表Redis存储读取
 */
exports.user_info_list = function(user_id, company_id, callback) {
    redisClient.hget('user_company_info', md5(user_id + company_id), function(error, userResult) {
        if (error) {
            callback(error, null);
            return;
        }
        if (userResult != null) {
            callback(null, JSON.parse(userResult));
        } else {
            User_CompanyModel.findOne({ 'user_id': user_id, 'company_id': company_id }, function(error, company_idResult) {
                if (error) {
                    callback(error, null);
                    return;
                }

                var user_company_info = {
                    "company_id": company_id,
                    "user_id": user_id,
                    "permissions": company_idResult.permissions,
                    "role": company_idResult.roles,
                    "user_system_role": {
                        "user_system_role_value": company_idResult.user_system_roles.user_system_role_value,
                        "user_system_role_name": company_idResult.user_system_roles.user_system_role_name
                    },
                    "user_enable_state": company_idResult.user_enable_state
                }
                redisClient.hset('user_company_info', md5(user_id + company_id), JSON.stringify(user_company_info));
                callback(null, user_company_info);
            })
        }
    })
}

/*
 * request_verify表Redis存储读取
 */
exports.request_verify_list = function(callback) {
    redisClient.get('request_verify', function(error, findResult) {
        if (error) {
            callback(error, null);
            return;
        }
        if (findResult != null) {
            callback(null, JSON.parse(findResult));
        } else {
            SystemModel.findOne({}, function(error, systemResult) {
                if (error) {
                    callback(error, null);
                    return;
                }
                redisClient.set('request_verify', JSON.stringify(systemResult.request_verify));
                callback(null, systemResult.request_verify);
            })
        }
    })
}

/*
 * service_modes表Redis存储读取
 */
exports.service_modes_list = function(callback) {
    redisClient.get('service_modes', function(error, findResult) {
        if (error) {
            callback(error, null);
            return;
        }
        if (findResult != null) {
            callback(null, JSON.parse(findResult));
        } else {
            SystemModel.findOne({}, function(error, systemResult) {
                if (error) {
                    callback(error, null);
                    return;
                }
                redisClient.set('service_modes', JSON.stringify(systemResult.service_modes));
                callback(null, systemResult.service_modes);
            })
        }
    })
}

/*
 * provide表Redis存储读取
 */
exports.provide_list = function(callback) {
    redisClient.get('provide', function(error, findResult) {
        if (error) {
            callback(error, null);
            return;
        }
        if (findResult != null) {
            callback(null, JSON.parse(findResult));
        } else {
            SystemModel.findOne({}, function(error, systemResult) {
                if (error) {
                    callback(error, null);
                    return;
                }
                redisClient.set('provide', JSON.stringify(systemResult.provide));
                callback(null, systemResult.provide);
            })
        }
    })
}
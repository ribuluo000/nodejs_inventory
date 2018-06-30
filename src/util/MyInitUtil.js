/**
 * Created by nick on 2018/1/27.
 */

import MyGlobalUtil from "./MyGlobalUtil";

import MyAccessLogUtil from "./MyAccessLogUtil";
import MyLogUtil from "./MyLogUtil";
import MyPermissionUtil from "./MyPermissionUtil";

class InitUtil {
    init(app) {
        MyGlobalUtil.init(app);
        MyAccessLogUtil.init(app);
        MyLogUtil.init(app);
        MyPermissionUtil.init(app);

    }
}

export default new InitUtil();


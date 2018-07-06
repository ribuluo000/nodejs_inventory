/**
 * Created by nick on 2018/1/27.
 */

import MyGlobalUtil from "./MyGlobalUtil";

import MyAccessLogUtil from "./MyAccessLogUtil";
import MyPermissionUtil from "./MyPermissionUtil";

class InitUtil {
    init(app) {
        // MyLogUtil.init(app); //todo 使用 morgan 记录 access log，也就是 MyAccessLogUtil
        MyAccessLogUtil.init(app);
        MyGlobalUtil.init(app);


        if (app.get('env') === 'production') {
            console.log = ()=>{};
        }

    }
}

export default new InitUtil();


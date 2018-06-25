import config_debug from '../common/config_debug.json';
import config_release from '../common/config_release.json';
import MyConstantUtil from '../util/MyConstantUtil';

var debug_mode = MyConstantUtil.DEBUG;

var config = {};

if (debug_mode === MyConstantUtil.DEBUG) {
    config = config_debug;
} else {
    config = config_release;
}

export default config;
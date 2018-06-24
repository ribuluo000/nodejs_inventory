import config_debug from '../common/config_debug.json';
import config_release from '../common/config_release.json';

var debug_mode = ConstantUtil.DEBUG;

var config = {};

if (debug_mode == ConstantUtil.DEBUG) {
    config = config_debug;
} else {
    config = config_release;
}

export default config;
'use strict';

module.exports = {
	port: 8001,
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	},
    "i18n_config" : {
        "lang" : "zh-CN",
        "lang_en" : "en",
        "langFile" : "./../../src/i18n/locale.json"
    },
}
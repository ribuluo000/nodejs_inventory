/**
 * Created by nick on 2018/1/27.
 */
import Hashids from 'hashids';

function obj(){

    /**
     * 6位随机码(数值+字母 / 数值+字母+特殊字符 / 纯数字)
     */
    this.random_code = (num, type) => {
        let pwd = '';
        if (type == 1) {
            for (let item = 0;
                item < num;
                item++) {
                pwd = pwd + ((Math.random() * 16) & (0x5 | 0x9)).toString(16);
            }
            return pwd;
        } else if (type == 2) {
            for (let item = 0;
                item < num;
                item++) {
                pwd = pwd + String.fromCharCode(parseInt(Math.random() * 93 + 33));
            }
            return pwd;
        } else if (type == 3) {
            for (let item = 0;
                item < num;
                item++) {
                let seed = parseInt(Math.random() * 9);
                pwd += '' + seed;
            }
            return pwd;
        }
    };

    /**
     * 订单流水号生成 时间年月6位(171201) + 类型1位(1付钱,2收钱) +  毫秒时间戳后5位 + 用户ID后4位 共16位
     */
    this.get_bill_order_number = (parameter) => {
        let type = Number(parameter.type);
        let user_id = parameter.user_id || this.random_code(6, 1); // b.substr(b.length-4,4)

        let date = new Date();
        let nowTime = Math.round(new Date() / 1000);
        let month = (date.getMonth()) + 1;
        let day = date.getDate();

        if (day < 10) {
            day = '0' + String(date.getDate());
        } else {
            day = String(day);
        }

        if (month < 10) {
            month = '0' + String((date.getMonth()) + 1);
        } else {
            month = String(month);
        }

        let year = date.getYear();
        year = year < 2000 ? year + 1900 : year;
        year = year.toString().substr(2, 2);

        let sRandom = String(nowTime).substr(String(nowTime).length - 5, 5);
        let sUserId = user_id.substr(user_id.length - 4, 4);

        return `${year}${month}${day}${type}${sRandom}${sUserId}`;
    };

    /**
     * 生成8位唯一ID
     * 参数:
     */
    this.create_short_id = () => {
        let hashids = new Hashids('123456', 8);

        let nNowTime = parseInt(new Date().getTime() / 1000);

        let nRandom = this.random_code(8, 3);
        let id = hashids.encode(nNowTime + nRandom);
        return id;
    };
}

export default new obj();
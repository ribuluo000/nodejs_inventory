/**
 * Created by nick on 2018/1/29.
 */
function MyDateTimeUtil(){


    /**
     * 获取当前时间
     */
    this.nowTime = function () {
        return Math.round(new Date().getTime());
    };



    /**
     * 设置七牛云路径 时间戳
     */
    this.serial_number = () => {
        var date = new Date();
        var year = String(date.getFullYear());
        var month = (date.getMonth()) + 1;
        var day = String(date.getDate());
        var hours = String(date.getHours());
        var minutes = String(date.getMinutes());
        var seconds = String(date.getSeconds());
        if (month < 10) {
            month = '0' + String((date.getMonth()) + 1);
        } else {
            month = String((date.getMonth()) + 1);
        }
        if (day < 10) {
            day = '0' + String(date.getDate());
        } else {
            day = String(date.getDate());
        }
        if (hours < 10) {
            hours = '0' + String(date.getHours())
        } else {
            hours = String(date.getHours())
        }
        if (minutes < 10) {
            minutes = '0' + String(date.getMinutes())
        } else {
            minutes = String(date.getMinutes())
        }
        if (seconds < 10) {
            seconds = '0' + String(date.getSeconds());
        } else {
            seconds = String(date.getSeconds());
        }

        var number = year + month + day + hours + minutes + seconds;
        return number;
    };



}
module.exports = new MyDateTimeUtil();
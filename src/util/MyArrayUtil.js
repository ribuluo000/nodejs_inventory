/**
 * Created by nick on 2018/1/29.
 */
function MyArrayUtil(){


    /**
     * 分页
     * pageNo:第几页
     * pageSize:每页多少条
     * array:要分页的数组
     */
    this.pagination = function (pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + Number(pageSize) >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + Number(pageSize));
    };



    /*
     * 数组去重
     * @param arr
     * @param parameter
     * @returns {Array}
     */
    this.unique = function (arr, parameter) {
        var result = [],
            isRepeated;
        for (var i = 0, len = arr.length; i < len; i++) {
            isRepeated = false;
            for (var j = 0, len1 = result.length; j < len1; j++) {

                if (arr[i][parameter] == result[j][parameter]) {
                    isRepeated = true;
                    break;
                }
            }
            if (!isRepeated) {
                result.push(arr[i]);
            }
        }

        return result;
    };


    /**
     * 数组去重
     * 数组@array
     */
    this.unique2=function(array){
        let hash = {};
        array = array.reduce(function(item, next) {
            hash[next.UserId] ? '' : hash[next.UserId] = true && item.push(next);
            return item
        }, []);
        return array;
    };

    /*
     * 对象数组排序
     */
    this.compare = function (property) {
        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value2 - value1; // 升序
        };
    };
    //xxx = array.sort(compare('具体属性'));
    // arr.sort(compare).reverse();

}
export default new MyArrayUtil();




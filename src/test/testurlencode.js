/**
 * Created by nick on 2018/1/25.
 */
var urlencode = require('urlencode');

console.log(urlencode('苏千')); // default is utf8
console.log(urlencode('苏千', 'gbk')); // '%CB%D5%C7%A7'

// decode gbk
{
    let s = urlencode.decode('%CB%D5%C7%A7', 'gbk');
    console.log(s);
} // '苏千'

// parse gbk querystring
{
    let s = urlencode.parse('nick=%CB%D5%C7%A7', {charset: 'gbk'});
    console.log(s);

} // {nick: '苏千'}

// stringify obj with gbk encoding
var str = 'x[y][0][v][w]=' + urlencode('雾空', 'gbk'); // x[y][0][v][w]=%CE%ED%BF%D5
var obj =  {'x' : {'y' : [{'v' : {'w' : '雾空'}}]}};
// urlencode.stringify(obj, {charset: 'gbk'}).should.equal(str);
console.log(str);
console.log(urlencode.stringify(obj, {charset: 'gbk'}));

console.log(JSON.stringify(obj));


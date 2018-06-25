let first = (size, ...args) => [...args].slice(0, size);


console.log(first(2,1,2,3));

let StringUtil = require('../util/StringUtil');
let DateTimeUtil = require('../util/MyDateTimeUtil');
{
    let s = StringUtil.random_code(6,1);
    console.log(s);
}
{
    let s = StringUtil.random_code(6,2);
    console.log(s);
}
{
    let s = StringUtil.random_code(6,3);
    console.log(s);
}
{
    let s = StringUtil.create_short_id();
    console.log(s);
}

{
    let s = DateTimeUtil.nowTime();
    console.log(s);

}


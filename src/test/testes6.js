/**
 * Created by nick on 2018/1/29.
 */


// node 7+ with async function

(async function () {
    const res = await {a:1,b:"2"};
    console.log(res);
})();
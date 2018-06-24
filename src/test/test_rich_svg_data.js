/**
 * Created by nick on 2018/6/8.
 */
var hanzi_to_pinyin = require("hanzi_to_pinyin");

let a = hanzi_to_pinyin.hanzi_to_pinyin("测试");
console.log(a);

var pinyinlite = require('pinyinlite');
let b = pinyinlite('增长');
console.log(b);
// return;
var fs = require("fs");

{
    //json
    let pathRead = '/Users/nick/Downloads/git/rnGit/rnVarProject/rnInit/src/lib/svg_uri/svg/';
    let pathWrite = '/Users/nick/Downloads/0Nick/test/nodejs/foo/src/data/';
    let fileNameWrite = 'svg_local.js';
    console.log(pathRead);
    let files = fs.readdirSync(pathRead);

    console.log(files);
    let retString = '';

    let strKv = '';
    let strItem = '';
    let strStart = '{';
    let strEnd = '}';

    files.map((item, i) => {
        console.log(item);
        let data = fs.readFileSync(pathRead + item);
        let dataItem = data.toString();
        console.log("同步读取: " + dataItem);
        let name = item.substring(0, item.length - 4);
        let py = pinyinlite(name);
        console.log(py);
        let name_py = '';
        py.map((item, i) => {
            if (item.length > 0) {
                if (item.indexOf('hang') > -1) {
                    name_py += 'hang';

                } else {
                    name_py += item[ 0 ] + '_';

                }

            }
        });

        if (name_py.charAt(name_py.length - 1) === '_') {
            name_py = name_py.substring(0, name_py.length - 1);
        }
        strKv += `
        "${name_py}":"${name_py}",
        `;
        strItem += `
    "${name_py}": {
        "local": '${dataItem}',
        "url": "",
        "name": "${name_py}"
    },`;

    });

    strItem = strItem.substring(0, strItem.length - 1);

    retString = strStart + '\n' + strItem + '\n' + strEnd;
    retString += '\n\n' + strStart + '\n' + strKv + '\n' + strEnd;

    console.log("strItem: \n" + strItem);
    console.log("retString: \n" + retString);

    fs.writeFileSync(pathWrite + fileNameWrite, retString);

    let data = fs.readFileSync(pathWrite + fileNameWrite);
    console.log("同步读取: \n" + data.toString());

    return;
}
{
    //js
    let pathRead = '/Users/nick/Downloads/git/rnGit/rnVarProject/rnInit/src/lib/svg_uri/svg/';
    let pathWrite = '/Users/nick/Downloads/0Nick/test/nodejs/foo/src/data/';
    let fileNameWrite = 'svg_local.js';
    console.log(pathRead);
    let files = fs.readdirSync(pathRead);

    console.log(files);
    let retString = '';

    let strImport = '';
    let strItem = '';
    let strStart = 'export default {';
    let strEnd = '}';

    files.map((item, i) => {
        console.log(item);
        // let data = fs.readFileSync(pathRead+item);
        // console.log("同步读取: " + data.toString());
        let name = item.substring(0, item.length - 4);
        let py = pinyinlite(name);
        console.log(py);
        let name_py = '';
        py.map((item, i) => {
            if (item.length > 0) {
                if (item.indexOf('hang') > -1) {
                    name_py += 'hang';

                } else {
                    name_py += item[ 0 ] + '_';

                }

            }
        });

        if (name_py.charAt(name_py.length - 1) === '_') {
            name_py = name_py.substring(0, name_py.length - 1);
        }

        strImport += `\nimport ${name_py} from ` + `'` + `./svg/${item}` + `';`;

        strItem += `
    "${name_py}": {
        "local": ${name_py},
            "url": "",
            "name": "${name_py}"
    },`;

    });

    strItem = strItem.substring(0, strItem.length - 1);

    retString = strImport + '\n' + strStart + '\n' + strItem + '\n' + strEnd;

    console.log("strImport: \n" + strImport);
    console.log("strItem: \n" + strItem);
    console.log("retString: \n" + retString);

    fs.writeFileSync(pathWrite + fileNameWrite, retString);

    let data = fs.readFileSync(pathWrite + fileNameWrite);
    console.log("同步读取: \n" + data.toString());

}

console.log("程序执行完毕。");
/**
 * Created by nick on 2018/6/8.
 */

var fs = require("fs");

{
    //json
    let pathRead = '/Users/nick/Downloads/gitExp/mine/react_inventory/inventory/app/translations/';
    let pathWrite = '/Users/nick/Downloads/gitExp/mine/nodejs_inventory/src/data/';
    let fileNameWrite = 'message.txt';
    console.log(pathRead);
    let files = fs.readdirSync(pathRead);

    console.log(files);
    let retString = '';

    let strKv = '';
    let strStart = '{';
    let strEnd = '}';

    {
        let data = fs.readFileSync(pathRead + 'en.json');
        let dataItem = data.toString();
        let jsonObj = JSON.parse(dataItem);
        console.log("同步读取: " + dataItem);
        console.log("同步读取: " + jsonObj);
        for (let k in
            jsonObj) {
            let v = jsonObj[ k ];
            strKv += `
        "${k}":{
        "id":"${k}",
        "defaultMessage":"${v}",
        },
        `;
        }

    }

    retString += strStart + '\n' + strKv + '\n' + strEnd;

    console.log("retString: \n" + retString);

    fs.writeFileSync(pathWrite + fileNameWrite, retString);

    let data = fs.readFileSync(pathWrite + fileNameWrite);
    console.log("同步读取: \n" + data.toString());

}


console.log("程序执行完毕。");
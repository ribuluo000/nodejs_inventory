/**
 * 一个用户处理Excel和json互转的工具类
 */

import xlsx from 'node-xlsx';
/**
 * 将Excel转成JSON返回JSON数据
 */
exports.excel_to_json = function(req, res, next) {
    //解析上传过来的Excel文件
    var file_path = req.files.file.path;
    var file_name = req.files.file.name;
    fs.renameSync(file_path, file_path + file_name); // 对文件重命名
    var new_file_path = file_path + file_name;
    var workbook = XLSX.readFile(new_file_path);
    var sheetNames = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheetNames[0]];
    var JsonData = XLSX.utils.sheet_to_json(worksheet);
    // 返回json数据
    return JsonData;
}


/**
 * 将json转成excel
 */
exports.json_to_excel = function(josnData) {
    var xlsx_buffer = xlsx.build([{ name: "Sheet1", data: josnData }]);
}
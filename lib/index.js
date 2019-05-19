"use strict";
exports.__esModule = true;
var XLSX = require("xlsx");
/**
 * 从input中加载 WorkBook
 * @param file input获取的File对象
 */
function loadWbFromFile(file) {
    if (typeof file === 'string') {
        return Promise.resolve(XLSX.readFile(file));
    }
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(reader.result);
            var workbook = XLSX.read(data, { type: 'array' });
            resolve(workbook);
        };
        reader.readAsArrayBuffer(file);
    });
}
exports.loadWbFromFile = loadWbFromFile;
/**
 * 从 WorkBook 中获取 Sheet
 * @param sheetFlag 可以是sheet名称或索引
 * @param wb WorkBook
 */
function selectSheet(sheetFlag, wb) {
    var name = typeof sheetFlag === 'string'
        ? sheetFlag
        : wb.SheetNames[sheetFlag];
    return wb.Sheets[name];
}
exports.selectSheet = selectSheet;
function selectColumn(colKey, sheet) {
    var arr = sheet2JSON(sheet, { header: 'A' });
    if (typeof colKey === 'string') {
        return arr.map(function (it) { return it[colKey]; });
    }
    var keys = Object.keys(colKey);
    return arr.map(function (it) {
        var rowObj = {};
        keys.forEach(function (k) {
            rowObj[colKey[k]] = it[k];
        });
        return rowObj;
    });
}
exports.selectColumn = selectColumn;
function selectCell(cell, sheet) {
    if (typeof cell === 'string') {
        return (sheet[cell] || {}).v;
    }
    return cell.map(function (c) { return (sheet[c] || {}).v; });
}
exports.selectCell = selectCell;
/**
 * 获取所有行的值
 * @param sheet Sheet
 */
function allRowValues(sheet) {
    return sheet2JSON(sheet, { header: 1 });
}
exports.allRowValues = allRowValues;
/**
 * Sheet to JSON
 * @param sheet Sheet
 * @param format 参考 https://docs.sheetjs.com/#json
 */
function sheet2JSON(sheet, format) {
    return XLSX.utils.sheet_to_json(sheet, format);
}
exports.sheet2JSON = sheet2JSON;
exports["default"] = {
    loadWbFromFile: loadWbFromFile,
    selectCell: selectCell,
    selectColumn: selectColumn,
    selectSheet: selectSheet,
    allRowValues: allRowValues,
    sheet2JSON: sheet2JSON
};

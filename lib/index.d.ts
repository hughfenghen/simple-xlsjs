import * as XLSX from 'xlsx';
/**
 * 从input中加载 WorkBook
 * @param file input获取的File对象
 */
export declare function loadWbFromFile(file: File | string): Promise<XLSX.WorkBook>;
/**
 * 从 WorkBook 中获取 Sheet
 * @param sheetFlag 可以是sheet名称或索引
 * @param wb WorkBook
 */
export declare function selectSheet(sheetFlag: number | string, wb: XLSX.WorkBook): XLSX.Sheet;
/**
 * 获取某一列或多列的值
 * @param colKey column key or column keyMap
 * @param sheet Sheet
 * example:
 *  selectColumn('A', sheet) => [1, 2, 3]
 *  selectColumn({ A: code }, sheet) => [{ code: 1 }, { code: 2 }, { code: 3 }]
 */
export declare function selectColumn(colKey: string, sheet: XLSX.Sheet): Array<any>;
export declare function selectColumn(colKey: object, sheet: XLSX.Sheet): Array<object>;
/**
 * 获取单元格的值
 * @param cell 单元格
 * @param sheet Sheet
 * example：
 *  selectCell('A1', sheet) => 1
 *  selectCell(['A1', 'A2', 'A3'], sheet) => [1, 2, 3]
 */
export declare function selectCell(cell: string, sheet: XLSX.Sheet): any;
export declare function selectCell(cell: Array<string>, sheet: XLSX.Sheet): Array<any>;
/**
 * 获取所有行的值
 * @param sheet Sheet
 */
export declare function allRowValues(sheet: XLSX.Sheet): Array<any>;
/**
 * Sheet to JSON
 * @param sheet Sheet
 * @param format 参考 https://docs.sheetjs.com/#json
 */
export declare function sheet2JSON(sheet: XLSX.Sheet, format?: object): Array<object>;
declare const _default: {
    loadWbFromFile: typeof loadWbFromFile;
    selectCell: typeof selectCell;
    selectColumn: typeof selectColumn;
    selectSheet: typeof selectSheet;
    allRowValues: typeof allRowValues;
    sheet2JSON: typeof sheet2JSON;
};
export default _default;

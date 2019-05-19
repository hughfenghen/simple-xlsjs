import * as XLSX from 'xlsx';

/**
 * 从input中加载 WorkBook
 * @param file input获取的File对象
 */
export function loadWbFromFile(file: File | string): Promise<XLSX.WorkBook> {
  if (typeof file === 'string') {
    return Promise.resolve(XLSX.readFile(file))
  }

  return new Promise((resolve) => {
    const reader: FileReader = new FileReader();
    
    reader.onload = function (e) {
      const data = new Uint8Array(<ArrayBuffer>reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
      resolve(workbook)
    };
   
    reader.readAsArrayBuffer(file);
  })
}

/**
 * 从 WorkBook 中获取 Sheet
 * @param sheetFlag 可以是sheet名称或索引
 * @param wb WorkBook
 */
export function selectSheet(
  sheetFlag: number | string, 
  wb: XLSX.WorkBook
): XLSX.Sheet {
  let name = typeof sheetFlag === 'string'
    ? sheetFlag
    : wb.SheetNames[sheetFlag]
  
  return wb.Sheets[name]
}

/**
 * 获取某一列或多列的值
 * @param colKey column key or column keyMap
 * @param sheet Sheet
 * example: 
 *  selectColumn('A', sheet) => [1, 2, 3]
 *  selectColumn({ A: code }, sheet) => [{ code: 1 }, { code: 2 }, { code: 3 }]
 */
export function selectColumn(colKey: string, sheet: XLSX.Sheet): Array<any>
export function selectColumn(colKey: object, sheet: XLSX.Sheet): Array<object>
export function selectColumn(
  colKey: string | object,
  sheet: XLSX.Sheet
) {
  const arr = sheet2JSON(sheet, { header: 'A' })
  if (typeof colKey === 'string') {
    return arr.map((it) => it[colKey])
  }
  const keys = Object.keys(colKey)
  return arr.map((it) => {
    const rowObj = {}
    keys.forEach((k) => {
      rowObj[colKey[k]] = it[k]
    })
    return rowObj
  })
}

/**
 * 获取单元格的值
 * @param cell 单元格
 * @param sheet Sheet
 * example：
 *  selectCell('A1', sheet) => 1
 *  selectCell(['A1', 'A2', 'A3'], sheet) => [1, 2, 3]
 */
export function selectCell(cell: string, sheet: XLSX.Sheet): any;
export function selectCell(cell: Array<string>, sheet: XLSX.Sheet): Array<any> 
export function selectCell(cell: string | Array<string>, sheet: XLSX.Sheet) {
  if (typeof cell === 'string') {
    return (sheet[cell] || {}).v
  }
  return cell.map((c) => (sheet[c] || {}).v)
}

/**
 * 获取所有行的值
 * @param sheet Sheet
 */
export function allRowValues(sheet: XLSX.Sheet): Array<any> {
  return sheet2JSON(sheet, { header: 1 })
}

/**
 * Sheet to JSON
 * @param sheet Sheet
 * @param format 参考 https://docs.sheetjs.com/#json
 */
export function sheet2JSON(sheet: XLSX.Sheet, format?: object):Array<object> {
  return XLSX.utils.sheet_to_json(sheet, format)
}

export default {
  loadWbFromFile,
  selectCell,
  selectColumn,
  selectSheet,
  allRowValues,
  sheet2JSON,
}
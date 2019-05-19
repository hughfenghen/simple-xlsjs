import * as path from 'path'
import { loadWbFromFile, selectSheet, selectColumn, selectCell, allRowValues, sheet2JSON } from '../lib/index';

// =========文件中的数据========
// S	I	M	P	L	E - X	L	S	X
// JS	0	1	2	3	4	5	6	7	8	9
// JS	0	1	2	3	4	5	6	7	8	9
// JS	0	1	2	3	4	5	6	7	8	9
// JS	0	1	2	3	4	5	6	7	8	9
// JS	0	1	2	3	4	5	6	7	8	9
// JS	0	1	2	3	4	5	6	7	8	9
// ===========================

let workBook
let sheet

beforeAll(async () => {
  workBook = await loadWbFromFile(path.resolve(__dirname, './simple-xlsxjs.xlsx'))
  sheet = selectSheet(0, workBook)
})

test('loadWbFromFile(file: string)', () => {
  expect(loadWbFromFile(path.resolve(__dirname, './simple-xlsxjs.xlsx')))
    .resolves
    .toHaveProperty('Sheets');
});

test('selectSheet(sheetFlag: number)', () => {
  expect(selectSheet(0, workBook)).toHaveProperty('!ref')
})

test('selectSheet(sheetFlag: string)', () => {
  expect(selectSheet('test1', workBook)).toHaveProperty('!ref')
})

test('selectColumn(colKey: string)', () => {
  expect(selectColumn('A', sheet)).toBeInstanceOf(Array)
})

test('selectColumn(colKey: object)', () => {
  expect(selectColumn({ A: 'type' }, sheet)).toBeInstanceOf(Array)
  expect(selectColumn({ A: 'type' }, sheet)).toHaveProperty([0, 'type'])
})

test('selectCell(cell: string)', () => {
  expect(selectCell('A1', sheet)).toEqual('S')
})

test('selectCell(cell: Array<String>)', () => {
  expect(selectCell(['A1', 'B1', 'C1'], sheet)).toEqual(['S', 'I', 'M'])
})

test('allRowValues(sheet)', () => {
  expect(allRowValues(sheet)).toBeInstanceOf(Array)
  expect(allRowValues(sheet)[0].join('')).toEqual('SIMPLE-XLSX')
})

test('sheet2JSON(sheet)', () => {
  expect(
    Object.keys(sheet2JSON(sheet)[0])
      .join('')
  ).toEqual('SIMPLE-XL_1S_1X_1') // 重复的列名称会追加数字
})

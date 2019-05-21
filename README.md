# simple-xlsjs
基于xlsx封装简单易用的api

### 安装
`yarn add simple-xlsjs`  
或  
`npm i simple-xlsjs`

### 使用
```js
import sxls from 'simple-xlsjs';

document
  .getElementById('file')
  .addEventListener('change', async (evt) => {
    const file = evt.target.files[0]
    const wb = await sxls.loadWbFromFile(file) // => WorkBook
    const sheet = sxls.selectSheet(0, wb)  // => 第一个Sheet

    console.log(
      selectCell(['A1', 'B2', 'C2'], sheet),        // 三个特定三元个
      allRowValues(sheet)[2],                       // 第三行的数据
      selectColumn({ A: 'type', B: 'code'}, sheet), // 获取A、B 两列命名为 type、code
      sheet2JSON(sheet),                            // 整个sheet转json
    )
  })
```

### 注意事项
`xlsx`模块bundle size是个问题，关于其`dist`目录下 
[xlsx.full.min.js > xlsx.core.min.js > xlsx.min.js 三者的区别](https://github.com/SheetJS/js-xlsx/issues/596):  
* 如果你必须支持老读写版本的`.xls`文件，就选择`xlsx.full.min.js`(xlsx模块默认，**不需要**配置alias)  
* 否则选择`xlsx.core.min.js`，alias配置：  
* `xlsx.min.js`最小，其中不包含`jszip`，如果你项目已其他方式依赖`jszip`，就选择这个  
```js
// alias配置
alias: {
  xlsx: './node_modules/xlsx/dist/xlsx.core.min.js'
  // xlsx: './node_modules/xlsx/dist/xlsx.min.js'
  // jszip的alias配置没有试验过
}
```

```
-rw-r--r--  1 fenghen  staff    11K  5 17 22:45 LICENSE
-rw-r--r--  1 fenghen  staff   460K  5 17 22:45 cpexcel.js
-rw-r--r--  1 fenghen  staff   281K  5 17 22:45 jszip.js
-rw-r--r--  1 fenghen  staff   5.5K  5 17 22:45 shim.min.js
-rw-r--r--  1 fenghen  staff   467K  5 17 22:45 xlsx.core.min.js
-rw-r--r--  1 fenghen  staff   703K  5 17 22:45 xlsx.core.min.map
-rw-r--r--  1 fenghen  staff   971K  5 17 22:45 xlsx.extendscript.js
-rw-r--r--  1 fenghen  staff   901K  5 17 22:45 xlsx.full.min.js
-rw-r--r--  1 fenghen  staff   823K  5 17 22:45 xlsx.full.min.map
-rw-r--r--  1 fenghen  staff   682K  5 17 22:45 xlsx.js
-rw-r--r--  1 fenghen  staff   389K  5 17 22:45 xlsx.min.js
-rw-r--r--  1 fenghen  staff   574K  5 17 22:45 xlsx.min.map
```

### [API](https://github.com/hughfenghen/simple-xlsjs/blob/master/lib/index.d.ts)  

### [Unit Test](https://github.com/hughfenghen/simple-xlsjs/blob/master/test/index.test.ts)

### 预览图
![preview](https://raw.githubusercontent.com/hughfenghen/simple-xlsjs/master/example/simple-xlsjs.png)


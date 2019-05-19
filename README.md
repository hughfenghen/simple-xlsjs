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
    const wb = await loadWbFromFile(file) // => WorkBook
    const sheet = selectSheet(0, wb)  // => 第一个Sheet
  })
```

### [API](https://github.com/hughfenghen/simple-xlsjs/blob/master/lib/index.d.ts)  

### [Unit Test](https://github.com/hughfenghen/simple-xlsjs/blob/master/test/index.test.ts)

### 预览图
![preview](https://raw.githubusercontent.com/hughfenghen/simple-xlsjs/master/example/simple-xlsjs.png)

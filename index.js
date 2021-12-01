const express = require('express')
const app = express();

app.get('/', function (req, res) {
  res.send('访问/create创建文件')
})

app.get('/create', function (req, res) {
  create()
  res.send('文件创建成功，files 目录下面有你创建的文件')
})

let create = async () =>{
  // 1. 引入fs文件系统
  const fs = require('fs');

  // 2. 读取一个模板内容
  var dataContent = await fs.readFileSync('files/modal.vue')

  // 3. 读取json文件，（这个其实就是数据，一般是后端接口提供）
  const { data } = require('./data/templete.json');

  // 4. 遍历生成
  for (const item of data) {
      for (const file of item.files) {

          var path = `${item.folder}/${file.filename}.vue`;

          // 4.1. 判断文件夹是否存在，不存在创建
          var checkDir = fs.existsSync('files/'+item.folder);
          if(!checkDir){
              await fs.mkdir('files/'+item.folder,{ recursive: true }, (err) => {
                if (err) throw err;
              });
          }

          // 4.2. 判断文件是否存在，不存在创建
          var checkFile = fs.existsSync('files/'+path);
          if(!checkFile){

              // 4.3. 替换文件里面的内容
              var content = dataContent.toString()
              content = content.replace(/{频道id}/g, file.id)
              .replace(/{二级id}/g, file.lid)
              .replace(/{标题}/g, file.title)
              .replace(/{关键字}/g, file.keywords)
              .replace(/{描述}/g, file.description)
              .replace(/{频道链接}/g, file.url);
              
              // 4.4. 创建并写入文件
              fs.writeFileSync('files/'+path, content);
          }
      }
    }
}


app.listen(3000)
const fs = require('fs');

function writeFile(text) {
   dp = utools.getPath('home') + '/' + 'weekly' + '.json'
   fs.readFile(dp, { encoding: 'utf-8' }, function (err, data) {
      if (!text) {
         return
      }
      if (err) {
         const arr = [{
            title: text,
            description: text,
            date: new Date()
         }]
         fs.appendFile(dp, '\r\n' + JSON.stringify(arr), (err) => {
            if (err) {
               utools.showNotification(err)
            }
            utools.showNotification('添加成功')
         })

      } else {
         const arr = JSON.parse(data)
         arr.push({
            title: text,
            description: text,
            date: new Date()
         })
         fs.writeFile(dp, JSON.stringify(arr), (err) => {
            if (err) {
               utools.showNotification(err)
            }
            utools.showNotification('添加成功')
         })
      }
   })

}

let textVal = ''
function init() {
   utools.setSubInput(({ text }) => {
      textVal = text
   }, '添加周报')
}


document.onkeydown = function (event) {
   event = event || window.event;
   if (event.keyCode === 13) {
      writeFile(textVal)
   }
}



window.exports = {
   "zb_add": {
      mode: 'none',
      args: {
         enter: () => {
            init()
         }
      }
   },
   "zb_list": {
      mode: "list",
      args: {
         enter: (action, callbackSetList) => {
            dp = utools.getPath('home') + '/' + 'weekly' + '.json'
            fs.readFile(dp, { encoding: 'utf-8' }, function (err, data) {
               callbackSetList(JSON.parse(data))
            })
         }
      }
   },
   "zb_clear": {
      mode: "none",
      args: {
         enter: () => {
            dp = utools.getPath('home') + '/' + 'weekly' + '.json'
            fs.writeFile(dp, JSON.stringify([]), function (err, data) { })
         }
      }
   },
   "zb_exprot": {
      mode: "none",
      args: {
         enter: () => {
            const dp = utools.getPath('downloads') + '/' + 'weekly' + '.txt'
            const oldDp = utools.getPath('home') + '/' + 'weekly' + '.json'

            fs.readFile(oldDp, { encoding: 'utf-8' }, function (err, data) {
               if (err) {
                  utools.showNotification('未找到周报文件')
                  return
               } else {
                  const arr = JSON.parse(data)
                  let str = ''
                  arr.forEach((ele, idx) => {
                     const t = idx + 1 + '、' + ele.title
                     str += '\r\n' + t
                  });
                  fs.writeFile(dp, str, (err) => {
                     if (err) {
                        utools.showNotification(err)
                     }
                     utools.shellShowItemInFolder(dp)
                  })
               }
            })
         }
      }
   },
}




// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    currentDate
  } = event

  return db.collection("todoList")
    .where({
      userToken: wxContext.OPENID,
      finished: false
    })
    .get()
    .then(res => {
      var todoList = res.data
      return db.collection("todoList")
        .where({
          userToken: wxContext.OPENID,
          finished: true,
          date: currentDate
        })
        .get()
        .then( res => {
          return todoList.concat(res.data)
        })
    })
}
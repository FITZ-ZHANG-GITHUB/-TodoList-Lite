const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    date,
    content
  } = event
  var todo = {
    userToken: wxContext.OPENID,
    date: date,
    content: content,
    finished: false
  }
  return db.collection("todoList")
    .add({
      data: todo
    })
    .then(res => {
      todo["_id"] = res._id
      return {
        code: 500,
        todo: todo,
        msg: res.errMsg
      }
    })
}
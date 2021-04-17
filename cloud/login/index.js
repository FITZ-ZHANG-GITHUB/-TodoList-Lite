const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    currentDate
  } = event

  const todos = [
    {
      userToken: wxContext.OPENID,
      date: currentDate,
      content: "你好，欢迎使用👏",
      finished: false
    },
    {
      userToken: wxContext.OPENID,
      date: currentDate,
      content: "点击添加按钮开始添加待办吧！😊",
      finished: false
    }
  ]

  return db.collection("todoList")
    .where({ userToken: wxContext.OPENID }).count()
    .then(res => {
      if (res.total > 0) {
        return {
          code: 500,
          msg: "登录成功"
        }
      } else {
        return db.collection("todoList")
          .add({
            data: todos
          })
          .then(res => {
            return {
              code: 500,
              msg: "初始化登录成功"
            }
          })
      }
    })
}

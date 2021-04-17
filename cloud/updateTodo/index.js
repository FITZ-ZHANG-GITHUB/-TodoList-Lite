// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { 
    todoId,
    finished,
    currentDate
   } = event
   
  return db.collection("todoList")
    .doc(todoId)
   .update({
    data: {
      finished: finished,
      date: currentDate
    }
   })
   .then( res => {
     return {
       code: 500,
       msg: res
     }
   })
   .catch( err => {
     return {
       code: 200,
       msg: err
     }
   })
}
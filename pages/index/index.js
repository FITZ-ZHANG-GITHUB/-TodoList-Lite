// index.js
var util = require('../../utils/util')

const today = util.formatDate(new Date())

Page({
  data: {
    today: today,
    todoList:[],
    showAddTodoPage: false,
    initDataSuccess: false,
    initDataFail: false,
    newTodoData: "",
  },

  onLoad: function() {
    console.log("index onload")
    this.login()
    this.getTodoList(today)
  },

  //登录
  login() {
    wx.cloud.callFunction({
      name: "login",
      data: { currentDate: today },
      success: res => { console.log("success:",res) },
      fail: err => { console.log("fail") }
    })
  },

  //获取TODO列表
  getTodoList() {
    wx.cloud.callFunction({
      name: "getTodoList",
      data: {currentDate: today},
      success: res => {
        console.log("getTodoList success:",res)
        this.setData({
          todoList: res.result,
          initDataSuccess: true
        })
      },
      fail:err => {
        this.setData({
          initDataFail: true
        })
        console.log("getTodoList fail:",err)
      }
    })
  },

  //重新加载数据
  reloadData() {
    console.log("reload data")
    this.getTodoList()
  },

  //待办完成
  itemDidSelected(e) {
    var todos = this.data.todoList
    var todo = todos[e.target.dataset.index]
    todo.finished = !todo.finished
    const todoData = {
      todoId: todo._id,
      finished: todo.finished,
      currentDate: today
    }
    this.setData({
      todoList: todos
    })
    wx.cloud.callFunction({
      name: "updateTodo",
      data: todoData,
      success: res => {
        console.log("update todo success",res)
      },
      fail: err => {
        console.log("update todo fail",err)
      }
    })
  },

  //添加待办
  addNewTodo() {
    this.setData({ showAddTodoPage: !this.data.showAddTodoPage })
    var newTodos = this.data.todoList;
    const todo = { 
      date: today,
      content: this.data.newTodoData
    };
    wx.cloud.callFunction({
      name: "addTodo",
      data: todo,
      success: res => {
        newTodos.push(res.result.todo)
        this.setData({
          todoList: newTodos
        })
        console.log("add todo success",res.result)
      },
      fail: err => {
        console.log("add fail:",err)
      }
    })
  },

  //点击添加按钮事件
  addTodoButtonTap() {
    this.setData({
      showAddTodoPage: !this.data.showAddTodoPage
    })
  },

  inputTodo(e) {
    this.setData({
      newTodoData: e.detail.value
    })
  },

  dismissAddNewTodoPage() {
    this.setData({
      showAddTodoPage: !this.data.showAddTodoPage
    })
  }
  //点击添加按钮事件

})

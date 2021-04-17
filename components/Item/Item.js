Component({
  //外部传入的属性
  properties: {
    content: {
      type: String,
      value: ''
    },
    isFinished: {
      type: Boolean,
      value: false
    },
  },

  //当前组件的数据
  data: {
    itemIsFinished: true
  },

  //方法
  methods: {
    boxSelected(e) {
      this.setData({
        itemIsFinished: !this.data.itemIsFinished
      })
      this.triggerEvent('itemDidSelected')
    }
  },
  
  //生命周期
  lifetimes: {
    created() {
      console.log("item created!");
    },

    attached () {
      this.setData({
        itemIsFinished: this.properties.isFinished
      });
    },

    detached() {
      console.log("item detached!");
    }

  }
})
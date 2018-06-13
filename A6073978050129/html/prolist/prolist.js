//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    selectPrice: false,
    selectType: false,
    selectMore: false,
    houselist:{},
    pmin:'',
    pmax:'',
    htype:'',
    hstatus:'',
    page: 1,
    pricenum:0,
    typenum:0,
    statusnum:0
  },
  methods:{
    //资讯详情事件处理函数
    bindViewproview: function(id){
      glo.open_win('../proview/proview', {id: id});
    }
  }
})
apiready = function() {
  //初始化必须调用
  glo.init();
  //初始化数据
  glo.post('/api/house/getHouses', {}, function (res) {
      vue.getHouses =  res.data;
      glo.echo(res.data);
  });
  /**
    * 页面上拉触底事件的处理函数
    */
  glo.scrolltobottom(function() {
    // 页数+1
    var page = vue.page+1;
    glo.post('/api/house/getHouses', {page: page}, function (res) {
      if(res.Code){
        var news_list = vue.houselist;
        for (var i = 0; i < res.data.length; i++) {
          house_list.push(res.data[i]);
        }
        vue.houselist = house_list;
        vue.page = page+1
      }
    });
  })
};
// Page({
  // onLoad: function (options) {
  //   var obj = this;
  //   //获取楼盘列表
  //   wx.request({
  //     url: obj.data.server_host + '/api/house/getHouses', //仅为示例，并非真实的接口地址
  //     data: { regionid: wx.getStorageSync('regionid')},
  //     success: function (res) {
  //       obj.setData({ houselist: res.data.data });
  //     }
  //   })
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   var obj = this;
  //   // 显示加载图标
  //   wx.showLoading({
  //     title: '玩命加载中',
  //   })
  //   // 页数+1
  //   var page = obj.data.page + 1;
  //   wx.request({
  //     url: obj.data.server_host + '/api/house/getHouses?page=' + page, //仅为示例，并非真实的接口地址
  //     data: { regionid: wx.getStorageSync('regionid') },
  //     success: function (res) {
  //       // 回调函数
  //       if (res.data.Code) {
  //         var house_list = obj.data.houselist;
  //
  //         for (var i = 0; i < res.data.data.length; i++) {
  //           house_list.push(res.data.data[i]);
  //         }
  //         // 设置数据
  //         obj.setData({
  //           houselist: obj.data.houselist,
  //           page: page + 1
  //         })
  //       }
  //
  //       // 隐藏加载框
  //       wx.hideLoading();
  //     }
  //   })
  //
  // },
  //提交筛选
//   searchhouse:function(e){
//     var obj = this;
//     var pmin = obj.data.pmin;
//     var pmax = obj.data.pmax;
//     var htype = obj.data.htype;
//     var hstatus = obj.data.hstatus;
//     wx.request({
//       url: obj.data.server_host + '/api/house/getHouses', //仅为示例，并非真实的接口地址
//       data: {
//         regionid: wx.getStorageSync('regionid'),
//         pmin:pmin,
//         pmax:pmax,
//         htype: htype,
//         hstatus: hstatus
//       },
//       success: function (res) {
//         if(res.data.Code){
//           obj.setData({ houselist: res.data.data });
//         }else{
//           obj.setData({ houselist: {} });
//         }
//
//         obj.setData({
//           selectPrice: false,
//           selectType: false,
//           selectMore: false
//         })
//       }
//     })
//   },
//   selectprice:function(e){
//     var obj = this;
//     obj.setData({
//       pricenum: e.target.dataset.pricenum,
//       pmin: e.currentTarget.dataset.pmin,
//       pmax: e.currentTarget.dataset.pmax
//     })
//   },
//   selecttype:function(e){
//     var obj = this;
//     obj.setData({
//       typenum: e.target.dataset.typenum,
//       htype: e.currentTarget.dataset.type
//     })
//   },
//   selectstatus:function(e){
//     var obj = this;
//     obj.setData({
//       statusnum: e.target.dataset.statusnum,
//       hstatus: e.currentTarget.dataset.status
//     })
//   },
//   //  点击日期组件确定事件
//   bindDateChange: function (e) {
//     this.setData({
//       date: e.detail.value
//     })
//   },
//   //楼盘详情事件处理函数
//   bindViewproview: function (e) {
//     wx.navigateTo({
//       url: '../proview/proview?id=' + e.currentTarget.dataset.id
//     })
//   },
//   bindCancel: function (e) {
//     this.setData({
//       selectPrice: false,
//       selectType: false,
//       selectMore: false
//     })
//   },
//   bindPrice: function (e) {
//     this.setData({
//       selectPrice: true,
//       selectType: false,
//       selectMore: false
//     })
//   },
//   bindType: function (e) {
//     this.setData({
//       selectPrice: false,
//       selectType: true,
//       selectMore: false
//     })
//   },
//   bindMore: function (e) {
//     this.setData({
//       selectPrice: false,
//       selectType: false,
//       selectMore: true
//     })
//   }
// })

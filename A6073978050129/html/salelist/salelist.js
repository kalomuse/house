// pages/salelist/salelist.js
var vue = new Vue({
  el: '.container',

  /**
   * 页面的初始数据
   */
  data: {
    website: website,
    server_host: "https://house.jiashanquan.top",
    agentlist:{},
    isAgent:0,
    page: 1
  },
  onLoad: function (options) {
    var obj = this;
    //获取经纪人列表
    wx.request({
      url: obj.data.server_host + '/api/agent/getAgent',
      success: function (res) {
        obj.setData({ agentlist: res.data.data });
      }
    }),
    //是否为经纪人
      wx.request({
        url: obj.data.server_host + '/api/agent/isAgent',
        data: { 'uid': wx.getStorageSync('userid')},
        success: function (res) {
          if(res.data.Code){
            obj.setData({ isAgent: 1 });
          }else{
            obj.setData({ isAgent: 0 });
          }

        }
      })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var obj = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    var page = obj.data.page + 1;
    wx.request({
      url: obj.data.server_host + '/api/agent/getAgent?page=' + page,
      success: function (res) {
        // 回调函数
        if (res.data.Code) {
          var agent_list = obj.data.agentlist;

          for (var i = 0; i < res.data.data.length; i++) {
            agent_list.push(res.data.data[i]);
          }
          // 设置数据
          obj.setData({
            agentlist: obj.data.agentlist,
            page: page + 1
          })
        }

        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },
  //经济人事件处理函数
  function bindViewsale() {
    //glo.open_win('salelist/salelist');
    glo.open_win('sale/sale');
  },
  //查看客户事件处理函数
  function bindViewsale() {
    //glo.open_win('salelist/salelist');
    glo.open_win('userlist/userlist');
  }
})

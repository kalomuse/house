//经济人事件处理函数
function bindViewsale() {
  //glo.open_win('salelist/salelist');
  glo.check_login('../sale/sale');
}
//查看客户事件处理函数
function bindViewuserlist() {
  //glo.open_win('salelist/salelist');
  glo.open_win('../userlist/userlist');
}
// pages/salelist/salelist.js
var vue = new Vue({
  el: '.container',

  /**
   * 页面的初始数据
   */
  data: {
    website: website,
    agentlist:{},
    isAgent:0,
    page: 1
  }
});
function binddivsale() {
  glo.open_win('../sale/sale');
}
//楼盘事件处理函数
function bindViewpro() {
  glo.open_frame('../main');
}
//资讯事件处理函数
function bindViewnews() {
  glo.open_frame('../news/news');
}
//房价事件处理函数
function bindViewprice() {
  glo.open_frame('../real_search/real_search');
}

  apiready = function() {
    //初始化必须调用
    glo.init();
    //初始化数据
    glo.post('/api/agent/getAgent', {}, function (res) {
        vue.agentlist =  res.data;
    });
    /**
      * 页面上拉触底事件的处理函数
      */
    glo.scrolltobottom(function() {
      // 页数+1
      var page = vue.page+1;
      glo.post('/api/agent/getAgent', {page: page}, function (res) {
        if(res.Code){
          var news_list = vue.agentlist;
          for (var i = 0; i < res.data.length; i++) {
            agent_list.push(res.data[i]);
          }
          vue.agentlist = agent_list;
          vue.page = page+1
        }
      });
    })
  };

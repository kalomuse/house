//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    agentlist:{},
    isAgent:0,
    isStatus:0,
    page: 1,
    token: '',
  },
  methods:{
    //楼盘详情事件处理函数
    callMobile: function(tel){
      api.call({
          type: 'tel_prompt',
          number: tel
      });
    }
  }
})

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
function bindViewsale() {
  glo.check_login('../sale/sale');
}
//查看客户事件处理函数
function bindViewuserlist() {
  glo.open_win('../userlist/userlist');
}
function reload() {
  location.reload();
}

apiready = function() {
  //初始化必须调用
  glo.init();
  vue.token = $api.getStorage('token');
  //获取经纪人列表
  if ($api.getStorage('regionid') && $api.getStorage('region') != 'undefined') {
    regionid =  $api.getStorage('regionid');
  } else {
    regionid =  330421;
  }
  glo.post('/api/agent/getAgent', { regionid: regionid }, function (res) {
      vue.agentlist = res.data;
  });

  //是否为经纪人
  glo.post('/api/agent/isAgent', {}, function (res) {
    if(res.Code){
      vue.isAgent = 1;
      vue.isStatus = res.data.status;
    }
  });
  /**
    * 页面上拉触底事件的处理函数
    */
  glo.scrolltobottom(function() {
    // 页数+1
    var page = vue.page+1;
    glo.post('/api/agent/getAgent', { regionid: regionid,page: page}, function (res) {
      if(res.Code){
        glo.alert('玩命加载中...');
        var agent_list = vue.agentlist;
        for (var i = 0; i < res.data.length; i++) {
          agent_list.push(res.data[i]);
        }
        vue.page =  page + 1;
      } else {
        glo.alert('加载完毕');
      }
    });
  })
};

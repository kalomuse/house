//需要登录
//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    userInfo: {},
    hasUserInfo: false,
    searchlist: [],
    hotwordlist:{}
  },
  methods:{
    bindViewsearch_result: function(keyword){
      glo.open_win('../real_time/real_time', {keyword: keyword});
    },
  }
})

//点击事例，navigateTo对应open_win，redirectTo对应open_frame
function SearchHouse() {
  var keyword = $('#keyword').val();
  var searchlist = vue.searchlist;
  if(searchlist.length >= 3) {
    searchlist.pop();
    searchlist.unshift({keyword:keyword})
  } else {
    searchlist.unshift({keyword:keyword})
  }
  $api.setStorage('searchlist', searchlist);
  glo.open_win('../real_time/real_time', {keyword: keyword});
}
//楼盘事件处理函数
function bindViewpro() {
  glo.open_frame('../main');
}
//经济人事件处理函数
function bindViewsale() {
  glo.open_win('../salelist/salelist');
}
//资讯事件处理函数
function bindViewnews() {
  glo.open_frame('../news/news');
}

function bindClear_history() {
  $api.setStorage('searchlist', []);
  vue.searchlist =  []
  /*glo.post('/api/house/clearHistory', {}, function (res) {
      vue.searchlist = res.data;
      if (res.data.Code) {

      }
  });*/
}

apiready = function() {
  //初始化必须调用
  glo.init();
  vue.searchlist = $api.getStorage('searchlist')? $api.getStorage('searchlist'): [];
  //获取历史搜索
  /*glo.post('/api/house/getHistory', {}, function (res) {
      vue.searchlist = res.data;
  });*/

  //获取热门搜索
  glo.post('/api/house/getHotword', {}, function (res) {
      vue.hotwordlist = res.data;
  });
};

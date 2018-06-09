//需要登录
//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    userInfo: {},
    hasUserInfo: false,
    searchlist: {},
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
  glo.open_win('../real_time/real_time', {keyword: keyword});
}
function bindClear_history() {
  glo.post('/api/house/clearHistory', {}, function (res) {
      vue.searchlist = res.data;
      if (res.data.Code) {
        vue.searchlist =  {}
      }
  });
}

apiready = function() {
  //初始化必须调用
  glo.init();

  //获取历史搜索
  glo.post('/api/house/getHistory', {}, function (res) {
      vue.searchlist = res.data;
  });

  //获取热门搜索
  glo.post('/api/house/getHotword', {}, function (res) {
      vue.hotwordlist = res.data;
  });
};

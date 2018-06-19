//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    houseid:'',
    houseinfo:{},
    housetype:{},
    newlist:[],
  },
  methods:{
    //资讯详情事件处理函数
    bindViewnewsview: function(id){
      glo.open_win('../newsview/newsview', {id: id});
    }
  }
})

//点击事例，navigateTo对应open_win，redirectTo对应open_frame
//楼盘事件处理函数
function bindViewpro() {
  glo.open_frame('../main');
}
//经济人事件处理函数
function bindViewsale() {
  glo.check_login('../salelist/salelist',1);
}
//房价事件处理函数
function bindViewprice() {
  glo.open_frame('../real_search/real_search');
}

apiready = function() {
  //初始化必须调用
  glo.init();
  //初始化数据
  glo.post('/api/news/getNews', {}, function (res) {
      vue.newlist =  res.data;
  });
  /**
    * 页面上拉触底事件的处理函数
    */
  glo.scrolltobottom(function() {
    // 页数+1
    var page = vue.page+1;
    glo.post('/api/news/getNews', {page: page}, function (res) {
      if(res.Code){
        var news_list = vue.newlist;
        for (var i = 0; i < res.data.length; i++) {
          news_list.push(res.data[i]);
        }
        vue.newlist = news_list;
        vue.page = page+1
      }
    });
  })
};

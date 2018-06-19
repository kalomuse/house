//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
  }
})

//点击事例，navigateTo对应open_win，redirectTo对应open_frame
function bindViewsearch() {
  glo.open_win('../search/search');
}

//楼盘事件处理函数
function bindViewpro() {
  glo.open_frame('../main');
}
//经济人事件处理函数
function bindViewsale() {
  glo.open_frame('../salelist/salelist');
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
  //post事例
  glo.post('/api/region/setRegion', { regionid: vue.regionid }, function (res) {
      vue.region =  res.data.area;
  });
};

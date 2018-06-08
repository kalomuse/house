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

apiready = function() {
  //初始化必须调用
  glo.init();

  //post事例
  glo.post('/api/region/setRegion', { regionid: vue.regionid }, function (res) {
      vue.region =  res.data.area;
  });
};

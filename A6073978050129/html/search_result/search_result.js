//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    keyword: '',
    houselist:{}
  },
  methods:{
    //楼盘详情事件处理函数
    bindViewproview: function(id){
      glo.open_win('../proview/proview', {id: id});
    }
  }
})

apiready = function() {
  //初始化必须调用
  glo.init();
  if ($api.getStorage('regionid') && $api.getStorage('region') != 'undefined') {
    var regionid =  $api.getStorage('regionid');
  } else {
    var regionid =  330421;
  }
  vue.keyword = api.pageParam.keyword;
  glo.post('/api/house/getHouses', {keyword: vue.keyword, regionid: regionid}, function (res) {
    if (res.Code) {
      vue.houselist =  res.data
    }
  });
};

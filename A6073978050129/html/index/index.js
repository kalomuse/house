var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    userInfo: {},
    hasUserInfo: false,
    bannerlist:{},
    houselist:[1,2,3],
    regionid: 330421,
    region:'嘉善县',
    purpose:'填写购房意向，让经济人来帮你找房',
    purposeid:0
  }
})

//搜索事件处理函数
function bindViewsearch() {
  glo.open_win('search/search');
}
//定位事件处理函数
function bindViewhouse_location() {
  glo.open_win('house_location/house_location');
}
//经济人事件处理函数
function bindViewsale() {
  glo.open_win('salelist/salelist');
}
//资讯事件处理函数
function bindViewnews() {
  glo.open_frame('news/news');
}
//房价事件处理函数
function bindViewprice() {
  glo.open_win('real_search/real_search');
}
//楼盘详情事件处理函数
function bindViewproview(id) {
  glo.open_win('proview/proview', {id: id});
}

function bindViewhouse() {
  glo.open_win('prolist/prolist');
}

function bindViewintention() {
  if(vue.purposeid){
    glo.open_win('intention_result/intention_result');
  }else{
    glo.open_win('intention/intention');
  }
}

apiready = function() {
  glo.init();
  //====================================
  //首次登录APP后，设置无需再显示登录欢迎页
  //====================================
  var key = 'cur_appversion';
  $api.setStorage(key, api.appVersion);
  //====================================
  //回退按钮监听
  //====================================
  api.addEventListener({
      name : 'keyback'
  }, function(ret, err) {
      api.confirm({
          title : '提示',
          msg : '确认要退出吗?',
          buttons : ['确定', '取消']
      }, function(ret, err) {
          if (ret.buttonIndex == 1) {
              api.closeWidget({
                  silent : true
              });
          }
      });
  });

  if ($api.getStorage('regionid')){
    vue.regionid =  $api.getStorage('regionid');
  }
  $api.setStorage('regionid', vue.regionid);

  //获取地理信息
  glo.post('/api/region/setRegion', { regionid: vue.regionid }, function (res) {
      vue.region =  res.data.area;
  });

 //获取推荐楼盘
  glo.post('/api/index/getRemhouses', { regionid: vue.regionid }, function (res) {
      vue.houselist =  res.data;
  });

  //获取购房意向
  glo.post('/api/purpose/getPurpose',
  {
    uid: $api.getStorage('userid'),
    areaid: $api.getStorage('regionid')
  }, function (res) {
    if(res.data.Code){
      vue.purpose = res.data.title;
      vue.purposeid = res.data.id;
    };

  });
  //获取banner图
  var data = {regionid: $api.getStorage('regionid')};
  glo.post('/api/index/getBanner', data, function(res) {
    $('.banner').css('height', api.winWidth * 0.433);
    var img = [];
    for(var index in res.data) {
        img.push(website + res.data[index].img);
    }
    var UIScrollPicture = api.require('UIScrollPicture');
    UIScrollPicture.open({
        rect: {
            x: 0,
            y: 60,
            w: api.winWidth,
            h: api.winWidth * 0.433
        },
        data: {
            paths: img,
        },
        contentMode: 'scaleToFill',
        fixedOn: api.frameName,
        fixed: false,
        interval: 1000
    });
  });
};

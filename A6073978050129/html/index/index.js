
//搜索事件处理函数
function bindViewsearch() {
  glo.open_win('search/search');
}
//定位事件处理函数
function bindViewhouse_location() {
  glo.open_win('house_location/house_location');
}
//楼盘事件处理函数
function bindViewprolist() {
  //glo.open_win('salelist/salelist');
  glo.open_win('prolist/prolist');
}
//经济人事件处理函数
function bindViewsalelist() {
  glo.open_frame('salelist/salelist');
}
//资讯事件处理函数
function bindViewnews() {
  glo.open_frame('news/news');
}
//房价事件处理函数
function bindViewprice() {
  glo.open_frame('real_search/real_search');
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
function goSalelist() {
  glo.open_frame('salelist/salelist');
}
apiready = function() {

  vue = new Vue({
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
    },
    methods:{
      //楼盘详情事件处理函数
      bindViewproview: function(id){
        glo.open_win('proview/proview', {id: id});
      }
    }
  })
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

  if ($api.getStorage('regionid')) {
    vue.region =  $api.getStorage('region');
    vue.regionid =  $api.getStorage('regionid');
  } else {
    //定位
    var bMap = api.require('bMap');
    bMap.getLocationServices(function(ret, err) {
      if (ret.enable) {
        bMap.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
        }, function(ret, err) {
            if (ret.status) {
                $api.setStorage('lat', ret.lat);
                $api.setStorage('lon', ret.lon);
                var latlon = $api.getStorage('lat') + "," + $api.getStorage('lon'); 
                $.ajax({  
                  type: "POST",  
                  dataType: "jsonp",  
                  url: 'http://api.map.baidu.com/geocoder/v2/?ak=zYNPUG3MAwjKNlykePjz9aG7&callback=renderReverse&location=' + latlon + '&output=json&pois=0',  
                  success: function (json) {  
                    if (json.status == 0) {  
                      vue.region=json.result.addressComponent.district;
                      $api.setStorage('region', vue.region);
                      glo.post('/api/region/getRegionid', {region:json.result.addressComponent.district}, function() {
                        $api.setStorage('region', json.data);
                        vue.regionid = json.data;
                      });
                    }  
                  }
                });  
                bMap.stopLocation();
            } else {
                alert(err.code);
            }
        });
      } else {
          alert("未开启定位功能！");
      }
    });
  }

  //获取推荐楼盘
  glo.post('/api/index/getRemhouses', { regionid: vue.regionid }, function (res) {
      vue.houselist =  res.data;
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
            y: 95,
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
    glo.hide_progress();
  });
};

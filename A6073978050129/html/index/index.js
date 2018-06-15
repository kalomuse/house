
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
  glo.open_win('salelist/salelist');
  //glo.open_win('login/login');
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

apiready = function() {
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
        //alert(JSON.stringify(ret));
         $api.setStorage('lat', ret.lat);
         $api.setStorage('lon', ret.lon);
        // alert($api.getStorage("lat"));
        bMap.stopLocation();
    } else {
        alert(err.code);
    }
});
    } else {
        alert("未开启定位功能！");
    }
});

$(function () {  
  var latlon = null;  
  //ajax获取用户所在经纬度  
  latlon = $api.getStorage('lat') + "," + $api.getStorage('lon'); 
  //latlon = 30.804372+","+120.934912; 
  //ajax根据经纬度获取省市区  
  $.ajax({  
      type: "POST",  
      dataType: "jsonp",  
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=zYNPUG3MAwjKNlykePjz9aG7&callback=renderReverse&location=' + latlon + '&output=json&pois=0',  
      success: function (json) {  
        if (json.status == 0) {  
          vue.region=json.result.addressComponent.district;
          var city=json.result.addressComponent.district;
          // console.log(json);  
          //  alert(json.result.addressComponent.district);
          $.ajax({ 
            type: "POST", 
            dataType: "json", 
            url:'https://house.jiashanquan.top'+'/api/region/getRegionid',
            data:{region:json.result.addressComponent.district},
            success:function(json){
              vue.regionid=json.data;
              $('.index-location-btn').html(city+'<div class="iconfont icon-jikediancanicon13"></div>');
              //alert(json.result.addressComponent.district);
            }
          });  
        }  
      }  
    });  
});  



  if ($api.getStorage('regionid')){
    vue.regionid =  $api.getStorage('regionid');
  }
  $api.setStorage('regionid', vue.regionid);
  //glo.echo(vue.regionid);
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

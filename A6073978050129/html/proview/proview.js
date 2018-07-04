

var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    houseid:'',
    houseinfo:{},
    housetype:{}
  },
  methods:{
    //楼盘详情事件处理函数
    callMobile: function(tel){
      api.call({
          type: 'tel_prompt',
          number: vue.telephone
      });
    },
    openMap: function(lon, lat) {
      glo.open_win('../map/map', {lon:lon,lat:lat});
    }
  }
});

function callWechat(){
  alert('请加微信' + vue.wechat)
}

function bindVieworder(){
    var id = api.pageParam.id;
    glo.open_win('../order/order',{id:id,title:vue.houseinfo.title});
}
apiready = function() {
  //初始化必须调用
  glo.init();
  //初始化数据
  var id = api.pageParam.id;
  glo.post('/api/base/getConfig', { id: id }, function (res) {
    vue.telephone = res.data.telephone;
    vue.wechat = res.data.wechat;
  });

  glo.post('/api/house/getHousedetail', { id: id }, function (res) {
      vue.houseinfo =  res.data;
      //glo.echo(res.data.img);
      $('.banner').css('height', api.winWidth * 0.433);
      var img = [];
      for(var index in res.data.img) {
          img.push(website + res.data.img[index]);
      }
      var UIScrollPicture = api.require('UIScrollPicture');
      UIScrollPicture.open({
          rect: {
              x: 0,
              y: 65,
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
  glo.post('/api/house/getHousetype', { id: id }, function (res) {
      vue.housetype =  res.data;
  });
};
function share(){
  // alert(vue.houseinfo.img[0].replace("jpg","png"));
	var wx = api.require('wx');
wx.isInstalled(function(ret, err) {
    if (ret.installed) {
			wx.shareProgram({
        title:vue.houseinfo.title+'的房价只要'+vue.houseinfo.price+'元哦，快登陆禧乾居查看吧！',
				description:vue.houseinfo.title+'的房价只要'+vue.houseinfo.price+'元哦，快登陆禧乾居APP查看吧！',
		    thumb:'../../images/share.jpeg',//不是png无法显示
 webpageUrl: 'http://apicloud.com',
 userName: 'gh_a7f276a16ab6',
    path: '/pages/proview/proview?id='+api.pageParam.id,
		}, function(ret, err) {
		    if (ret.status) {
		        alert('分享成功');
		    } else {
		        alert(err.code);
		    }
		});
    } else {
        alert('当前设备未安装微信客户端');
    }
});
}

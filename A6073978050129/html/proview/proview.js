function show_menu() {
	var bd_top = $(document).scrollTop();
	if($('#menu').css('display')=='none') {
		$('#menu').removeClass('hid');
		$('#menu').addClass('show');

			$('#hed_id').removeClass('hd_box_float');
			$('#play_box').removeClass('p48');
			$('.mnav').css({"position":"relative"});

		//setcookie('hidtips','1');
	} else {
		$('#menu').removeClass('show');
		$('#menu').addClass('hid');

			$('#hed_id').addClass('hd_box_float');
			$('#play_box').addClass('p48');
			$('.mnav').css({"position":"absolute"});

		//setcookie('hidtips','1');
	}
 }

(function(){
   var $nav = $('.goods_nav');
   $(window).on("scroll", function() {
   $('#menu').removeClass('show');
	$('#menu').addClass('hid');
	});
 })();


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

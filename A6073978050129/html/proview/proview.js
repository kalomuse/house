var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    houseid:'',
    houseinfo:{},
    housetype:{}
  }
});
function callMobile() {
  api.call({
      type: 'tel_prompt',
      number: '10086'
  });
}
function callWechat(){
  alert('请加微信XXXXXXXXXXXXX')
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
  // alert(id);
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
      // glo.echo(res);
  });

  // callMobile:function(e){
  //     var obj=this;
  //     wx.makePhoneCall({
  //       phoneNumber: obj.data.telephone, //此号码并非真实电话号码，仅用于测试
  //     })
  //   },
  //   callWechat:function(e){
  //     var obj = this;
  //     wx.showToast({
  //       title: '请添加微信号：' + obj.data.wechat,
  //       icon: 'none',
  //       duration: 5000
  //     })
  //   },
};

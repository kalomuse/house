var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    houseid:'',
    houseinfo:{},
    housetype:{}
  }
});

apiready = function() {
  //初始化必须调用
  glo.init();
  //初始化数据
  var id = api.pageParam.id;
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

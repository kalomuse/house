//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    selectPrice: false,
    selectType: false,
    selectMore: false,
    houselist:{},
    pmin:'',
    pmax:'',
    htype:'',
    hstatus:'',
    page: 1,
    pricenum:0,
    typenum:0,
    statusnum:0
  },
  methods:{
    //资讯详情事件处理函数
    bindViewproview: function(id){
      glo.open_win('../proview/proview', {id: id});
    }
  }
})
apiready = function() {
  //初始化必须调用
  glo.init();
  //初始化数据
  var data = {
    regionid: $api.getStorage('regionid'),
    keyword: $api.getStorage('keyword'),
  };
  glo.post('/api/house/getHouses', data, function (res) {
      vue.houselist =  res.data;
      // glo.echo(res);
  });
  /**
    * 页面上拉触底事件的处理函数
    */
  glo.scrolltobottom(function() {
    // 页数+1
    var page = vue.page+1;
    glo.post('/api/house/getHouses', {page: page,regionid: $api.getStorage('regionid'),keyword:$api.getStorage('keyword')}, function (res) {
      if(res.Code){
        var news_list = vue.houselist;
        for (var i = 0; i < res.data.length; i++) {
          house_list.push(res.data[i]);
        }
        vue.houselist = house_list;
        vue.page = page+1
      }
    });
  })
};
$(function () {  
  $('.sub-btn').on('click',function(){
    var keyword=({
        regionid: $api.getStorage('regionid'),
        pmin:$(".txt-wrap .txt").eq(0).find('input').val(),
        pmax:$(".txt-wrap .txt").eq(1).find('input').val(),
        htype: vue.htype,
        hstatus: vue.hstatus
      });
  //  glo.echo(screen_data);
    glo.open_win('../prolist/prolist', {keyword:keyword});
  });
  function searchhouse(){
    alert(0);
    var keyword=({
        regionid: $api.getStorage('regionid'),
        pmin:$(".txt-wrap .txt").eq(0).find('input').val(),
        pmax:$(".txt-wrap .txt").eq(1).find('input').val(),
        htype: vue.htype,
        hstatus: vue.hstatus
      });
      glo.echo(keyword);
    var pmin = $(".txt-wrap .txt").eq(0).find('input').val();
    var pmax = $(".txt-wrap .txt").eq(1).find('input').val();
    var htype = vue.htype;
    var hstatus =vue.hstatus;
    // glo.post('/api/house/getHouses', {page: page}, function (res) {
    //   vue({
    //     regionid: $api.setStorage('regionid');
    //     pmin:pmin,
    //     pmax:pmax,
    //     htype: htype,
    //     hstatus: hstatus
    //   });
    //   if(res.Code){
    //     vue.houselist=res.data
    //   }else{
    //     vue.houselist={};
    //   }
    // });
  };


  $('.screen-wrap .scree-item').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.pop-wrap-bg').eq($(this).index()).addClass('pop-show').siblings().removeClass('pop-show');
  	//$('.pop-wrap-bg').eq($(this).index()).fadeIn(500).siblings().fadeOut(0);
  });
  $('.pop-choice-list01 label').on('click',function(){
    $(this).addClass('current').siblings().removeClass('current');
    vue.typenum= $(this).data('typenum');
    vue.htype= $(this).data('type');
  });
  $('.pop-choice-list03 label').on('click',function(){
    $(this).addClass('current').siblings().removeClass('current');
    vue.statusnum= $(this).data('statusnum');
    vue.hstatus= $(this).data('status');
  });
  $('.pop-choice-list02 label').on('click',function(){
    $(this).addClass('current').siblings().removeClass('current');
    $(".txt-wrap .txt").eq(0).find('input').val($(this).data('pmin'));
    $(".txt-wrap .txt").eq(1).find('input').val($(this).data('pmax'));
    vue.pricenum= $(this).data('pricenum');
    vue.pmin=$(this).data('pmin');
    vue.pmax= $(this).data('pmax');
  });
  $('.cancel-btn').on('click',function(){
    $('.screen-wrap .scree-item').removeClass('active');
    $('.pop-wrap-bg').removeClass('pop-show');
    return false;
  });
})

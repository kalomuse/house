
apiready = function() {
  //初始化必须调用
  $('#keyword').val(api.pageParam.keyword);
  realsearch();
};

//点击事例，navigateTo对应open_win，redirectTo对应open_frame
function realsearch() {
   var keyword = $('#keyword').val();//e.detail.value.keyword;
   if(!keyword){
     api.toast({
         msg : '请输入搜索的楼盘',
         duration : 2000,
         location : 'bottom'
     });
     return false
   }
   glo.show_progress('正在查询...');
   $api.post('http://scrapy.jiashanquan.top/?a='+api.pageParam.keyword, {},function (res) {
     glo.hide_progress();
     var pricedata = JSON.parse(res.msg);
          var index = res.msg.indexOf('{"report');
          if (index == 1) {
            index = 0;
          } else {
            index = 1;
          }
          var report = pricedata[index].report;
          if (report.length) {
            var title = pricedata[index].report[2] + pricedata[index].report[3] + pricedata[index].report[4] + pricedata[index].report[5] + pricedata[index].report[7];
            $('.tit').html(title);
            //获取数据
            var biao = JSON.parse(pricedata[index + 1].biao);
            var categories1 = biao[2].xAxis;
            var pricedata1 = biao[0].series[0].data;
            var y_mark = [];
            var pricedata = [];
            for (var i in pricedata1) {
              if (pricedata1[i] != '-') {
                pricedata.push(pricedata1[i]);
                y_mark.push(categories1[i]);
              }
            }
            var ctx = document.getElementById("myChart").getContext("2d");
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                 labels : y_mark,
                 datasets : [
                     {
                         label: "最新房价",  //当前数据的说明
                         fill: true,  //是否要显示数据部分阴影面积块  false:不显示
                         borderColor: "rgba(75,192,192,1)",//数据曲线颜色
                         pointBackgroundColor: "#fff", //数据点的颜色
                         data: pricedata,  //填充的数据
                     }
                 ]
              }
            });
          } else {
            glo.alert('没有查到对应信息');
          }
   });

}

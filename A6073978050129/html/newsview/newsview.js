//vue初始事例
var vue = new Vue({
  el: '.mt-85',
  data: {
    website: website,
    newid:0,
    newinfo:{},
    content: ''
  }
})

apiready = function() {
  //初始化必须调用
  glo.init();

  var id = api.pageParam.id;
  glo.post('/api/news/getNewdetail', { id: id }, function (res) {
      var content = res.data.content.replace(/src="/g, 'src="' + website);
      vue.newinfo =  res.data;
      $('.content').html(content);
  });
};

function bindClear_history() {
  vue.searchlist = [];
  $api.setStorage('searchlist', []);
}
function SearchHouse() {
  var keyword = $('#keyword').val();
  var searchlist = vue.searchlist;
  if(!keyword) {
    return glo.alert('请输入小区名称，如塞纳蓝湾');
  }
  if(searchlist.length >= 3) {
    searchlist.pop();
    searchlist.unshift({keyword:keyword})
  } else {
    searchlist.unshift({keyword:keyword})
  }
  $api.setStorage('searchlist', searchlist);
  glo.open_win('../search_result/search_result', {keyword:keyword});
}

var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    searchlist: [],
  },
  methods:{
    bindViewsearch_result: function(keyword) {
      glo.open_win('../search_result/search_result', {keyword:keyword});
    },
  }
})

apiready = function() {
  //初始化必须调用
  glo.init();
  var searchlist = $api.getStorage('searchlist');
  vue.searchlist = searchlist? searchlist: [];
};

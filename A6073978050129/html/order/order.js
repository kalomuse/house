var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    houseid:'',
    houseinfo:{},
    housetype:{}
  }
});
function submit(){
  var id = api.pageParam.id;
  var name= $.trim($('#name').val());
  var telephone= $.trim($('#telephone').val());
  var agent= $.trim($('agent').val());
  var uid= $api.getStorage('token');
  if(!name){
    glo.alert('请填写真实姓名');
  }
  else if (!telephone) {
    glo.alert('请填写手机号');
  }
  else if (!checkMobile(telephone)) {
    glo.alert('请输入正确手机号');
  }
  else {
    glo.post('/api/customer/postCustomer',{
      'uid': uid,
      'name': name,
      'telephone': telephone,
      'house_id': id,
      'agent': agent
    },function(res){
      if(res.Code){
        glo.alert('预约看房成功！请等待客服经理电话');
        setTimeout("api.closeWin()",2000);
      }
      else{
        glo.alert('预约看房失败，请检查网络');
      }
      // glo.echo(res);
    });
  }
}

apiready = function() {
    glo.init();
      var id = api.pageParam.id;
      var title=api.pageParam.title;
      // alert(title);
      vue.houseinfo={title:title};

}

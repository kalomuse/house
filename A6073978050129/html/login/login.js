//vue初始事例
var wait = 150;
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
  }
})

function sendvercode(o){
  var phone = $.trim($('#phone').val());
  if(phone==''){
    glo.alert('手机号不能为空');
    return false;
  }
  else if (!checkMobile(phone)) {
    glo.alert('手机号不匹配');
    return false;
  }
  else {
      sendcode(o);
  }

}
function sendcode(o){
  var phone = $.trim($('#phone').val());
  glo.post('/api/base/getCode',{
    telephone:phone
  },
function(res){
  if(res.Code==1){
      countdown(o);
  }else{
    glo.alert("获取失败！")
  }

}
)

}


function countdown(obj, msg) {
    obj = $(obj);
    if (wait == 0) {
        obj.removeAttr("disabled");
        obj.val(msg);
        wait = 150;
    } else {
        if (msg == undefined || msg == null) {
            msg = obj.val();
        }
        obj.attr("disabled", "disabled");
        obj.val(wait + "秒后重新获取");
        wait--;
        setTimeout(function() {
          countdown(obj, msg);
        }, 1000)
    }
}


function checkSub(){
  var phone = $.trim($('#phone').val());
  var verify_code = $.trim($('#dyn_pwd').val());
  if(phone==''){
    glo.alert('手机号不能为空');
    return false;
  }
  else if (!checkMobile(phone)) {
    glo.alert('手机号不匹配');
    return false;
  }
else  if(verify_code==''){
    glo.alert('验证码不能为空');
    return false;
  }
  else{
    glo.post('/api/user/appLogin',{
      mobile:phone,
      code:verify_code
    },function(res){
      if(res.Code==1){
        $api.setStorage('token', res.data);
      }else {
        api.execScript({
            name: 'main',
            script: "goSalelist()"
        });
        api.closeWin();
        //glo.alert("验证码有误")
      }
      // glo.echo(res);
    }
  );
  }


}

apiready = function() {
  //初始化必须调用
  glo.init();
};

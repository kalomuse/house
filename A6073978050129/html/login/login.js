//vue初始事例
var wait = 150;

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

//微信登录
function authWX() {
  api.showProgress({
    style: 'default',
    animationType: 'fade',
    title: '',
    text: '启动中...',
    modal: false
  });
  var wx = api.require('wx');
  wx.auth({

  }, function(ret, err) {
    api.hideProgress();
    glo.echo(ret);
    if (ret) {
      if (ret.status) {
        var code = ret.code;
        getToken(code);
      } else {
        glo.echo(ret);
      }
    } else {
      switch(err.code) {
        case -1:
          api.toast({
            msg: '未知错误',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 1:
          api.toast({
            msg: '用户取消',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 2:
          api.toast({
            msg: '用户拒绝授权',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 3:
          api.toast({
            msg: '当前设备未安装微信客户端',
            duration: 2000,
            location: 'middle'
          });
          break;
      }
    }
  });
}

function getToken(code) {
  var wx = api.require('wx');
  wx.getToken({
    apiKey: 'wx8519b390e429f7f8',
    apiSecret: '2a4882ce70898b679f7904c66859d5808',
    code: code
  }, function(ret, err) {
    if (ret) {
      glo.echo(ret);
      if (ret.status) {
        var accessToken=ret.accessToken;
        var dynamicToken=ret.dynamicToken;
        var openId=ret.openId;
        getUserInfo(accessToken,openId);
      } else {
        glo.echo(err);
      }
    } else {
      switch(err.code) {
        case -1:
          api.toast({
            msg: '未知错误',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 1:
          api.toast({
            msg: 'apiKey值为空或非法',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 2:
          api.toast({
            msg: 'apiSecret值为空或非法',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 3:
          api.toast({
            msg: 'code值为空或非法',
            duration: 2000,
            location: 'middle'
          });
          break;
        case 4:
          api.toast({
            msg: '网络超时',
            duration: 2000,
            location: 'middle'
          });
          break;
      }
    }
  });
}

function getUserInfo(accessToken,openId) {
  var wx = api.require('wx');
  wx.getUserInfo({
    accessToken: accessToken,
    openId: openId
  }, function(res, err) {
    glo.echo(res);
    var data = {
      'oauth': 'weixin',
      'openid' : res.openid,
      'nickname': res.nickname,
      'sex': res.sex,
      'head_pic': res.headimgurl,
      'unionid': res.unionid,
    }
    //注册
    glo.echo(data);
    //third_login(data);
  });
}

function third_login(data) {
  glo.post('/mobile/login/third_login', data, function(res) {
    if(res.status == 1) {
      glo.set_loginInfo(res);
      api.closeWin();
    } else {
      glo.echo(res.msg);
    }
  });
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
      mobile: phone,
      code: verify_code
    },function(res){
      if(res.Code==1){
        $api.setStorage('is_agent', res.data.is_agent);
        $api.setStorage('token', res.data.token);
        api.execScript({
            name: 'root',
            frameName: 'salelist_salelist',
            script: 'reload()'
        });
        if(res.data.is_agent) {
          api.closeWin();
        } else {
          glo.open_frame(api.pageParam.from);
        }
      } else {
        glo.alert("验证码有误")
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

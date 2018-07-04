 //var website = "http://house.jiashanquan.top";
 var website = "http://192.168.18.118:80";

var glo = {
  init: function(data) {
    this.fix_header('#header');
    token = $api.getStorage('token');

  },
  fix_header: function(name) {
    var header = $api.dom(name);
    $api.fixStatusBar(header);
    api.setStatusBarStyle({
        style: 'dark',
        color: '#999999'
    });
  },
  open_frame: function(url, pageParams){
      var arr = url.split('/');
      var name = arr[arr.length - 1].split('.')[0];
      if(!arr[arr.length - 2]) {
        alert('url不规范');
        return;
      } else if(arr[arr.length - 2] && arr[arr.length - 2] == '.') {
        var href = location.href.split('/');
        name = href[href.length - 2] + '_' + name;
      } else {
        name = arr[arr.length - 2] + '_' + name;
      }
      if(arr[arr.length - 1].search(".html") == -1) {
        url += '.html';
      }
      api.openFrame({
        name: name,
        url: url,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: pageParams
    });
  },
  open_win: function(url, pageParams){
    var arr = url.split('/');
    var name = arr[arr.length - 1].split('.')[0];
    if(!arr[arr.length - 2]) {
      alert('url不规范');
      return;
    } else if(arr[arr.length - 2] && arr[arr.length - 2] == '.') {
      var href = location.href.split('/');
      name = href[href.length - 2] + '_' + name;
    } else {
      name = arr[arr.length - 2] + '_' + name;
    }
    if(arr[arr.length - 1].search(".html") == -1) {
      url += '.html';
    }
    api.openWin({
      name: name,
      url: url,
      pageParam: pageParams
  });
  },
  get: function(url, callback) {
    var url_split = url.split(website);
    if(!url_split[1]) {
      url = website + url;
    }
    if($api.getStorage('token')) {
      var token = $api.getStorage('token');
      url = addParama(url, 'token', token);
    }

    url = addParama(url, 'device_code', '1');
    $api.get(url, callback);
  },
  post: function(url, data, callback) {
    var url_split = url.split(website);
    if(!url_split[1]) {
      url = website + url;
    }

    if($api.getStorage('token')) {
      var token = $api.getStorage('token');
      url = addParama(url, 'token', token);
    }

    url = addParama(url, 'device_code', '1');
    $api.post(url, {values: data}, callback);
  },

  check_login: function(redirect, is_frame, is_root) {
    var self = this;
    if($api.getStorage('token')) {
      if(is_frame) {
        self.open_frame(redirect, {'from': redirect});
      } else {
        self.open_win(redirect, {'from': redirect});
      }
      return true;
    } else {
      if(is_root) {
        self.open_win('login/login', {'from': redirect});
      } else {
        self.open_win('../login/login', {'from': redirect});
      }
      return false;
    }
  },
  set_loginInfo: function(res) {
    $api.setStorage('user_id', res.user_id);
    $api.setStorage('head_pic', res.head_pic);
    $api.setStorage('uname', res.uname);
    $api.setStorage('mobile', res.mobile);
    $api.setStorage('token', res.token);
    var timestamp = Date.parse(new Date()) / 1000;
    $api.setStorage('expire', timestamp + 2 * 30 * 24 * 3600 - 600);
  },
  echo: function(object) {
    if(typeof(object) == "string") {
      alert(object)
    } else {
      alert(JSON.stringify(object));
      //jsonToStr
    }
  },
  alert: function(msg, duration) {
    if(!duration)
      duration = 3000;
    api.toast({
        msg : msg,
        duration : duration,
        location : 'bottom'
    });
  },
  clear: function() {
    $api.rmStorage('region');
    $api.rmStorage('regionid');
    $api.rmStorage('token');
    api.toast({
        msg : '清除成功',
        duration : 2000,
        location : 'bottom'
    });
  },
  logout: function() {
    var self = this;
    $api.rmStorage('token');
    api.toast({
        msg : '注销成功',
        duration : 2000,
        location : 'bottom'
    });
    location.reload();
    /*
    glo.get('/mobile/login/logout', function() {
      self.clear();
      api.closeWin();

    });
    */
  },
  reload: function(callback) {
    var self = this;
    api.setCustomRefreshHeaderInfo({
      bgColor: '#fff',
    }, function() {
      api.refreshHeaderLoadDone();
      callback();
    });
  },
  scrolltobottom: function(callback){
    var callback2 = function() {
      api.toast({
          msg : '玩命加载中',
          duration : 2000,
          location : 'bottom'
      });
      callback();
    }
    api.addEventListener({
      name:'scrolltobottom',
      extra:{
         threshold:0     //设置距离底部多少距离时触发，默认值为0，数字类型
       }
     }, callback2
   );
  },
  show_progress: function(str) {
    var str = str?str:'拼命的在加载...';
    var test = "api.showProgress({style: 'default',animationType: 'zoom',title: '',text: '" + str + "',modal: true});";
    setTimeout(test, 300);
    setTimeout("glo.hide_progress()",3000);
 },
 hide_progress: function(){
     api.hideProgress();
 },


}
function checkMobile(tel) {
    var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
    if (reg.test(tel)) {
        return true;
    }else{
        return false;
    };
}
function addParama(url, key, val) {
  if (url.indexOf('?') != -1) {
    url += '&' + key + '=' + val;
  } else {
    url += '?' + key + '=' + val;
  }
  return url;
}

//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    array: ['身份证', '护照'],
    bankarray: ['请选择开户银行','工商银行','建设银行', '农业银行', '中国银行'],
    provinces: [],
    province: "浙江省",
    provinceid: 330000,
    citys: [],
    city: "嘉兴市",
    cityid: 330400,
    countys: [],
    county: '嘉善县',
    countyid: 330421,
    value: [10, 3, 3],
    values: [0, 0, 0],
    condition: false,
    telephone:'',
    currentTime: 61,
    codemsg:'验证码',
    headimg:'',
    showimg:'../../images/upIMG.png',
    agentinfo:{name:'',wechat:'',card:'',account:''}
  }
})

//定位事件处理函数
function bindViewagreement() {
  glo.open_win('../agreement/agreement');
}

apiready = function() {
  //初始化必须调用
  glo.init();
  //post事例
  glo.post('/api/region/setRegion', { regionid: vue.regionid }, function (res) {
      vue.region =  res.data.area;
  });
};

function PostAgent() {
  var status = 1;
  var agreement = $('#agreement').val();
  var name = $('#name').val();
  var headimg = $('#headimg').val();
  var wechat = $('#wechat').val();
  var cardtype = $('#cardtype').val();
  var card = $('#card').val();
  var address = vue.countyid;
  var bank = $('#bank').val();
  var account = $('#account').val();
  if(status==1 && !agreement){
    status = 0;
    glo.alert('请先阅读并同意《经纪人协议》');
  }
  if (status == 1 && !name){
    status = 0;
    glo.alert('请填写真实姓名');
  }
  var data = {
      'name': name,
      'headimg': headimg,
      'wechat':wechat,
      'cardtype': cardtype,
      'card': card,
      'address': address,
      'bank': bank,
      'account': account
  };
  if(status==1){
    glo.post('/api/agent/postAgentForApp', data, function (res) {
        if(res.Code) {
          glo.echo('提交完成')
          setTimeout(function () {
            glo.open_win('../salelist/salelist');
          }, 2000);
        } else{
          glo.echo(res.Header.ErrorMessage)
        }
    });
  }
}

function initArea() {
  if(typeof UIActionSelector !='undefined') {
    UIActionSelector.show();
  }
  UIActionSelector = api.require('UIActionSelector');
  UIActionSelector.open({
      datas: 'widget://script/city.json',
      layout: {
          row: 5,
          col: 3,
          height: 30,
          size: 12,
          sizeActive: 14,
          rowSpacing: 5,
          colSpacing: 10,
          maskBg: 'rgba(f,f,f,0.8)',
          bg: 'rgba(f,f,f,0.8)',
          color: '#888',
          colorActive: '#3483ee',
          colorSelected: '#3483ee'
      },
      animation: true,
      cancel: {
          text: '取消',
          size: 12,
          w: 90,
          h: 35,
          bg: '#fff',
          bgActive: '#ccc',
          color: '#888',
          colorActive: '#fff'
      },
      ok: {
          text: '确定',
          size: 12,
          w: 90,
          h: 35,
          bg: '#fff',
          bgActive: '#ccc',
          color: '#888',
          colorActive: '#fff'
      },
      title: {
          text: '请选择',
          size: 12,
          h: 44,
          bg: '#eee',
          color: '#888'
      },
      fixedOn: api.frameName
  }, function(ret, err) {
      if (ret) {
        vue.province = ret.selectedInfo[0].name;
        vue.city = ret.selectedInfo[1].name;
        vue.county = ret.selectedInfo[2].name;
        vue.countyid = ret.selectedInfo[ret.selectedInfo.length -1].code;
      } else {
          alert(JSON.stringify(err));
      }
  });
}

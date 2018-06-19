//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    num: 0,
    page01: true,
    page02: false,
    page03: false,
    page04: false,
    page05: false,
    price : '0',
    housetype : '0',
    areaid : '0',
    arealist:{},
    item:[
      { name: '地铁房', checked: false },
      { name: '近学校', checked: false },
      { name: '朝南', checked: false },
      { name: '有电梯', checked: false },
      { name: '绿化好', checked: false },
      { name: '有停车位', checked: false },
    ],
    name:'',
    telephone:''
  },
  methods:{
    //楼盘详情事件处理函数
     selectitem: function(item){
       var newitem = vue.item;
       for(var i in vue.item){
         if (vue.item[i].name==item){
           if (vue.item[i].checked){
             newitem[i].checked = false;
           }else{
             newitem[i].checked = true;
           }
         }
       }
       vue.item =  newitem;
    },
    selectarea: function(areaid) {
          vue.areaid = areaid
    }
  }
})

function bindtapback() {
  if (vue.num == 1) {
    vue.num = 0;
    vue.page01 = true;
    vue.page02 = false;
    vue.page03 = false;
    vue.page04 = false;
    vue.page05 = false;
  } else if (vue.num == 2) {
      vue.num = 1,
      vue.page01 = false;
      vue.page02 = true;
      vue.page03 = false;
      vue.page04 = false;
      vue.page05 = false;
  } else if (vue.num == 3) {
      vue.num = 2,
      vue.page01 = false,
      vue.page02 = false,
      vue.page03 = true,
      vue.page04 = false,
      vue.page05 = false
  } else if (vue.num == 4) {
      vue.num = 3,
      vue.page01 = false,
      vue.page02 = false,
      vue.page03 = false,
      vue.page04 = true,
      vue.page05 = false
  } else if (vue.num == 0) {
    glo.open_frame('../index/index')
  }
}
function bindtap01() {
    vue.num = 1;
    vue.page01 = false;
    vue.page02 = true;
    vue.page03 = false;
    vue.page04 = false;
    vue.page05 = false
}
function bindtap02() {
    vue.num = 2;
    vue.page01 = false;
    vue.page02 = false;
    vue.page03 = true;
    vue.page04 = false;
    vue.page05 = false
}
function bindtap03() {
    vue.num = 3;
    vue.page01 = false;
    vue.page02 = false;
    vue.page03 = false;
    vue.page04 = true;
    vue.page05 = false
}
function bindtap04() {
    vue.num = 4;
    vue.page01 = false;
    vue.page02 = false;
    vue.page03 = false;
    vue.page04 = false;
    vue.page05 = true
}

function selectprice(price){
    vue.price = price;
}
function selecttype(housetype) {
    vue.housetype = housetype
}

function postPurpose() {
    var status = 1;
    var name = $('#name').val();
    var telephone = $('#telephone').val();
    var price = vue.price;
    var housetype = vue.housetype;
    var areaid = vue.areaid;
    var item = '';
    for (var i in vue.item) {
      var a = '';
      if (vue.item[i].checked) {
        a = vue.item[i].name;
        if (item) {
          item += ',' + a;
        } else {
          item = a;
        }
      }
    }
    if (status == 1 && !areaid) {
      status = 0;
      glo.alert('请选择位置');
    }
    if (status == 1 && !name) {
      status = 0;
      glo.alert('请填写您的姓名');
    }
    if (status == 1 && !telephone) {
      status = 0;
      glo.alert('请填写联系方式');
    }

    if (status == 1) {
      glo.post('/api/purpose/postPurpose', {
        'name': name,
        'telephone': telephone,
        'price': price,
        'housetype': housetype,
        'areaid': areaid,
        'item':item
      }, function (res) {
        if (res.Code) {
          glo.alert('您的购房意向已提交完成');
          setTimeout("api.closeWin()", 2000);
        } else {
          glo.alert(res.Header.ErrorMessage);
        }
      });
    }
}


apiready = function() {
  //初始化必须调用
  glo.init();

  //获取地理信息
  glo.post('/api/purpose/getRegion', {regionid: $api.getStorage('regionid')}, function (res) {
      vue.arealist= res.data;
  });
};

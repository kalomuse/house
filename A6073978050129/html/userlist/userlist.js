
//vue初始事例
var vue = new Vue({
  el: '.container',
  data: {
    website: website,
    agentid:0,
    array: ['有意向', '已洽谈', '已看房','已交定金','已成交'],
    index:0,
    customerlist:[]
  }
})

function bindPickerstate(key,cid,status,nowstatus) {
    if (status > nowstatus){
      //修改客户状态
      glo.post('/api/customer/changeStatus', { 'cid': cid, 'status': status }, function(res) {
        var newcustomer = vue.customerlist;
        newcustomer[key].status = status;
        vue.customerlist = newcustomer;
      })
    }
  }

apiready = function() {
  //初始化必须调用
  glo.init();
  //是否为经纪人
  glo.post('/api/agent/isAgent', {}, function (res) {
    if (res.Code) {
      vue.agentid = res.data.id
      if(res.data.status==2){//审核未通过
        alert('经纪人审核未通过，请重新提交');
        glo.open_win('../sale/sale');
      } else if (res.data.status == 0) {//审核中
        alert('经纪人正在审核，请耐心等待');
        api.closeWin();
      }
      //获取我的客户
      glo.post('/api/customer/myCustomer', {'agentid': vue.agentid}, function (res) {
        vue.customerlist = res.data;
      });
    } else {
      glo.open_win('../sale/sale');
    }
  });
};

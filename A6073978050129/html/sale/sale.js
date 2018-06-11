// pages/sale/sale.js
//获取应用实例
var tcity = require("../../utils/citys.js");
var app = getApp()
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server_host: "https://house.jiashanquan.top",
    array: ['身份证', '护照'],
    bankarray: ['建设银行', '农业银行', '招商银行'], 
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    telephone:'',
    currentTime: 61,
    codemsg:'验证码',
    headimg:'',
    showimg:'../../images/upIMG.png'
  },
  bindPickerCertificates: function (e) { 
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerBank: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  //定位事件处理函数
  bindViewagreement: function () {
    wx.navigateTo({
      url: '../agreement/agreement'
    })
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      //console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      //console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  //楼盘事件处理函数
  bindViewpro: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  //经济人事件处理函数
  bindViewsale: function () {
    wx.navigateTo({
      url: '../salelist/salelist'
    })
  },
  //资讯事件处理函数
  bindViewnews: function () {
    wx.redirectTo({
      url: '../news/news'
    })
  },
  //房价事件处理函数
  bindViewprice: function () {
    wx.navigateTo({
      url: '../real_search/real_search'
    })
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function () {
    //console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    //console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    //console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      /*'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name*/
      'province': '',
      'city': '',
      'county':''
    })


  },
  getHeadimg:function(e){
    var obj = this;
    wx.chooseImage({
      count: 1,  
      sizeType: ['compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths; 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;  
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {  
          wx.uploadFile({
            url: obj.data.server_host + '/api/agent/postHeadimg',
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              var d = JSON.parse(res.data); 
              obj.setData({
                headimg: d.file_path,
                showimg: obj.data.server_host + d.file_path
              });

              //如果是最后一张,则隐藏等待中  
             // if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              //  }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });  
        }
      }
    });  
  },
  TelephoneInputEvent: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  SendCode:function(e){
    var telephone = this.data.telephone;
    if (telephone.length == 0) {
         wx.showToast({
             title: '请输入手机号！',
             icon: 'none',
             duration: 2000
          })
        return false;
     }
    if (telephone.length != 11) {
           wx.showToast({
             title: '手机号长度有误！',
             icon: 'none',
             duration: 2000
          })
        return false;
     }
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     if (!myreg.test(telephone)) {
           wx.showToast({
             title: '手机号有误！',
             icon: 'none',
             duration: 2000
          })
        return false;
     }
     var that = this;
     wx.request({
       url: that.data.server_host + '/api/base/getCode', //仅为示例，并非真实的接口地址
       data: {
         'telephone': telephone,
       },
       success: function (res) {
         if (res.data.Code) {
           wx.showToast({
             title: '发送成功',
             icon: 'success',
             duration: 2000
           })
         } else {
           wx.showToast({
             title: '发送失败',
             icon: 'none',
             duration: 2000
           })
           clearInterval(interval)
           that.setData({
             codemsg: '重新发送',
             currentTime: 61,
             disabled: false
           })
         }

       }
     })
     
     var currentTime = that.data.currentTime
     interval = setInterval(function () {
       currentTime--;
       that.setData({
         codemsg: currentTime + '秒'
       })
       if (currentTime <= 0) {
         clearInterval(interval)
         that.setData({
           codemsg: '重新发送',
           currentTime: 61,
           disabled: false
         })
       }
     }, 1000)  

  },
  PostAgent:function(e){
    var obj = this;
    var status = 1;
    var agreement = e.detail.value["agreement"].join(",");
    var name = e.detail.value.name;
    var telephone = e.detail.value.telephone;
    var headimg = obj.data.headimg;
    var code = e.detail.value.code;
    var cardtype = e.detail.value.cardtype;
    cardtype = this.data.array[cardtype]; 
    var card = e.detail.value.card;
    var address = e.detail.value.address;
    address = address.replace('常住地: ','');
    var bank = e.detail.value.bank;
    var account = e.detail.value.account;
    if(status==1 && !agreement){
      status = 0;
      wx.showToast({
        title: '请先阅读并同意《经纪人协议》',
        icon: 'none',
        duration: 2000
      })
    }
    if (status == 1 && !name){
      status = 0;
      wx.showToast({
        title: '请填写真实姓名',
        icon: 'none',
        duration: 2000
      })
    }
    if (status == 1 && !telephone) {
      status = 0;
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none',
        duration: 2000
      })
    }
    if (status == 1 && !code) {
      status = 0;
      wx.showToast({
        title: '请填写验证码',
        icon: 'none',
        duration: 2000
      })
    }
    if(status==1){
     
      wx.request({
        url: obj.data.server_host + '/api/agent/postAgent', //仅为示例，并非真实的接口地址
        data: {
          'uid': wx.getStorageSync('userid'),
          'name': name,
          'telephone': telephone,
          'headimg': headimg,
          'code': code,
          'cardtype': cardtype,
          'card': card,
          'address': address,
          'bank': bank,
          'account': account
        },
        success: function (res) {
          if(res.data.Code){
            wx.showToast({
              title: '提交完成',
              icon: 'success',
              duration: 2000,
              complete:function(e){
                wx.navigateTo({
                  url: '../userlist/userlist'
                })
              }
            })
          }else{
            wx.showToast({
              title: res.data.Header.ErrorMessage,
              icon: 'none',
              duration: 2000
            })
          }
          
        }
      })
    }
  }
})

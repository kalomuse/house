apiready = function() {
  //初始化必须调用
  glo.init();
  var city = $api.getStorage('region');
  if(city && city != 'undefined')
    $('#city').html(city);
  else {
    $('#city').html('未开启定位');
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
          //maskBg: 'rgba(f,f,f,0.8)',
          //bg: 'rgba(f,f,f,0.8)',
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
        var county = ret.selectedInfo[2].name,
        countyid = ret.selectedInfo[ret.selectedInfo.length -1].code;
        $('#city').html(county)
        $api.setStorage('region', county);
        $api.setStorage('regionid', countyid);
        api.execScript({
            name: 'main',
            //script: 'switchCity("' + county + '", "' + countyid + '")',
            script: 'getData()'
        });
      } else {
          alert(JSON.stringify(err));
      }
  });
}

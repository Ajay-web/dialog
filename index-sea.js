define(function(require, exports, module){
  var _Dialogs = require('dialogs');

  Dialogs.init();

  function alertPlay(){
    var _msg = document.querySelector('[name=alert]').value;
    console.log(_msg)
    if(!_msg){
      _msg = '请输入提示内容';
    }
    Dialogs.alert(_msg, 1500);
  }

  function confirmPlay(){
    var _msg = document.querySelector('[name=confirm]').value;
    if(!_msg){
      _msg = '请输入需要确认的内容信息';
      Dialogs.alert(_msg, 1500);
      return false;
    }
    Dialogs.confirm({
      msg: _msg,
      continueFn: function(){
        console.log('continue ....')
      },
      cancelFn: function(){
        console.log('cancel....')
      }
    });
  }

  window.onload = function(){
    var _alertBtn = document.querySelector('#alertBtn'), _confirmBtn = document.querySelector('#confirmBtn');
    _alertBtn.onclick = function(){
      alertPlay();
    };
    _confirmBtn.onclick = function(){
      confirmPlay();
    };
  };
});
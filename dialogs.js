(function(root, factory){
  "use strict";
  // 忽略判断执行环境是否为NODE，直接默认是浏览器window
  if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = factory(root, true);
  }else{
    factory(root);
  }
}(window, function(window, noGlobal){
  var exports = {};
  // START==================================================================== //

  /***********/
  var EventUtil = {
    addHandler: function(el, type, handler){
      if(el.addEventListener){
        el.addEventListener(type, handler, false);
      }else if(el.attachEvent){
        el.attachEvent('on' + type, handler);
      }else{
        el['on' + type] = handler;
      }
    },
    removeHandler: function(el, type, handler){
      if(el.removeEventListener){
        el.removeEventListener(type, handler, false);
      }else if(el.detachEvent){
        el.detachEvent('on' + type, handler);
      }else{
        el['on' + type] = null;
      }
    },
    getEvent: function(event){
      return event ? event : window.event;
    },
    getTarget: function(event){
      return event.target || event.srcElement;
    },
    preventDefault: function(event){
      if(event.preventDefault){
        event.preventDefault();
      }else{
        event.returnValue = false;
      }
    },
    stopPropagation: function(event){
      if(event.stopPropagation){
        event.stopPropagation();
      }else{
        event.cancelBubble = true;
      }
    }
  };

  function _extend(target, source){
    for(var i in source){
      target[i] = source[i];
    }
    return target;
  }

  /***********/
  function _render(){
    var _this = this;
    var _body = document.querySelector('body');
    var _D = document.createElement('section');
    var _alert = '<div role="alert"><div role="alert-body"></div></div>';
    var _confirm = '<div role="confirm">' +
        '<div role="confirm-body">' +
          '<div role="confirm-con"></div>' +
          '<div role="confirm-action">' +
            '<div class="unitAction" role="confirm-cancel">取消</div><div class="unitAction" role="confirm-continue">继续</div>' +
          '</div>' +
        '</div></div>';
    //_confirm = '';
    _D.id = 'DialogBox';
    _D.innerHTML = _alert + _confirm;
    _body.appendChild(_D);
    // cache dom
    exports.alertDOM = document.querySelector('[role=alert]');
    exports.confirmDOM = document.querySelector('[role=confirm]');
    exports.confirmCancelDOM = exports.confirmDOM.querySelector('[role=confirm-cancel]');
    exports.confirmContinueDOM = exports.confirmDOM.querySelector('[role=confirm-continue]');
  }

  function _event(){
    var _alert = exports.alertDOM, _alertBody = _alert.querySelector('[role=alert-body]');
    var _confirm = exports.confirmDOM, _continue = exports.confirmContinueDOM, _cancel = exports.confirmCancelDOM;
    // alert
    EventUtil.addHandler(_alert, 'click', function(e){
      e = EventUtil.getEvent(e);
      _alert.className = '';
      setTimeout(function(){
        _alert.style.display = 'none';
      }, 200);
      e.stopPropagation();
    });
    EventUtil.addHandler(_alertBody, 'click', function(e){
      e = EventUtil.getEvent(e);
      e.stopPropagation();
    });
    // confirm
    var _opt = exports.confirmOpt;
    EventUtil.addHandler(_continue, 'click', function(e){
      e = EventUtil.getEvent(e);
      if(_opt.continueFn && typeof(_opt.continueFn) === 'function'){
        _opt.continueFn();
      }
      _confirm.style.display = 'none';
      _confirm.className = '';
      e.stopPropagation();
    });
    EventUtil.addHandler(_cancel, 'click', function(e){
      e = EventUtil.getEvent(e);
      if(_opt.cancelFn && typeof(_opt.cancelFn) === 'function'){
        _opt.cancelFn();
      }
      _confirm.style.display = 'none';
      _confirm.className = '';
      e.stopPropagation();
    });

  }

  /******API*****/
  exports.alert = function(msg, timer){
    var _this = this, _DOM = _this.alertDOM, _BD = _DOM.querySelector('[role=alert-body]'), _BDH = 0;
    _BD.innerHTML = msg;
    _DOM.style.display = 'block';
    _BDH = _BD.clientHeight;
    _BD.style.marginTop = '-' + _BDH / 2 + 'px';
    _DOM.className = 'running';
    if(_this.timerAlert){
      clearTimeout(_this.timerAlert);
    }
    if(isNaN(parseInt(timer))) return false;
    _this.timerAlert = setTimeout(function(){
      _DOM.className = '';
      setTimeout(function(){
        _DOM.style.display = 'none';
      }, 200);
      _BD.innerHTML = '';
    }, timer);
  };
  exports.confirmOpt = {
    msg: '',
    continueTxt: '继续',
    continueFn: null,
    cancelTxt: '取消',
    cancelFn: null
  };
  exports.confirm = function(_opt){
    var _this = this, _DOM = _this.confirmDOM, _BD = _DOM.querySelector('[role=confirm-body]'), _BDH = 0;
    var _Opt = _extend(_this.confirmOpt, _opt);
    _BD.querySelector('[role=confirm-con]').innerHTML = _Opt.msg;
    _this.confirmContinueDOM.innerHTML = _Opt.continueTxt;
    _this.confirmCancelDOM.innerHTML = _Opt.cancelTxt;
    _DOM.style.display = 'block';
    _BDH = _BD.clientHeight;
    _BD.style.marginTop = '-' + _BDH / 2 + 'px';
    _DOM.className = 'running';
  };

  exports.init = function(){
    _render();
    _event();
  };


  // END==================================================================== //
  if(typeof define === 'function' && define.cmd){
    define('', [], function(){
      return exports;
    });
  }
  // 正常src引入
  if(!noGlobal){
    window.Dialogs = exports;
  }

  return exports;
}));
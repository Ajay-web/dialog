# dialog

  
## alert(msg, timer)

msg 必选，用户提示文本内容<br>
timer 可选，若需让提示在指定的时间之后隐藏，可传入该参数

## confrim(opt)

opt 必选，对象

```javascript
{
  msg: '',
  continueTxt: '确认',
  continueFn: null,
  cancelTxt: '取消',
  cancelFn: null
}
```

msg 具体确认的文本信息<br>
continueTxt 确认按钮显示文本<br>
continueFn 确认之后，调用回调<br>
cancelTxt 取消按钮显示文本<br>
cancelFn 取消之后，调用回调

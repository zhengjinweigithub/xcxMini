function inputV(type,nocode,val,obj){
  if (type == 'number' || type == 'Number'){
    val = val ? val:0;
  } else if (type == 'text' ){
    val = val ? val:"";
  }else{
    val = val ? val : "";
  }
  obj.setData({
    [nocode]:val
  });
}
module.exports = {
  inputV: inputV
}
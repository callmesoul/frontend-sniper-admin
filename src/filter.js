/**** ****** *******  **** ****** ** *****/
/*              过滤器                    */
/**** ****** *******  **** ****** ** *****/
import moment from 'moment'
const filter={
  //momnent 自定义输出时间格式
  moment:(value, formatString)=>{
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment(value).format(formatString);
  },
  //发布时间先当前时间的间距
  time:(value)=>{
    var now = new Date().getTime(),
      oldTime = new Date(value).getTime(),
      difference = now - oldTime,
      result='',
      minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      halfamonth = day * 15,
      month = day * 30,
      year = month * 12,

      _year = difference/year,
      _month =difference/month,
      _week =difference/(7*day),
      _day =difference/day,
      _hour =difference/hour,
      _min =difference/minute;
    if(_year>=1) {result= "" + ~~(_year) + " 年前"}
    else if(_month>=1) {result= "" + ~~(_month) + " 个月前"}
    else if(_week>=1) {result= "" + ~~(_week) + " 周前"}
    else if(_day>=1) {result= "" + ~~(_day) +" 天前"}
    else if(_hour>=1) {result= "" + ~~(_hour) +" 个小时前"}
    else if(_min>=1) {result= "" + ~~(_min) +" 分钟前"}
    else result="刚刚";
    return result;
  },
  screen:(value,{key:_value})=>{
    if(value[key]===_value){
      return ''
    }else {
      return value;
    }
  }
}
export default filter;

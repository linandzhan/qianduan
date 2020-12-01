// 封装的是常用的方法

//获取QueryString的数组
export function getQueryString() {
  var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
  if (result == null) {
    return "";
  }
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].substring(1);
  }
  return result;
}

//根据QueryString参数名称获取值
export function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}

//根据QueryString参数索引获取值
export function getQueryStringByIndex(index) {
  if (index == null) {
    return "";
  }
  var queryStringList = getQueryString();
  if (index >= queryStringList.length) {
    return "";
  }
  var result = queryStringList[index];
  var startIndex = result.indexOf("=") + 1;
  result = result.substring(startIndex);
  return result;
}

export function setCookie(cName, value, expiredays) {
  if (expiredays > 0 && expiredays != "100") {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + escape(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  }
  if (expiredays === "100") {
    var exdate = new Date('2118-01-01 00:00:00')
    document.cookie = cName + '=' + escape(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  }

};
export function getCookie(cName) {
  if (document.cookie.length > 0) {
    var cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      var cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
};

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//清除cookie
export function clearCookie(name) {
  setCookie(name, "", -1);
}
/**
 * 合并两个数组
 * @param  {[type]} originList  旧数组，也是目标数组
 * @param  {[type]} newList     新数组
 * @return {[type]}            [description]
 */
export function mergeList(originList, newList) {
  var resultList = []
  for (var i = 0; i < originList.length; i++) {
    resultList.push(originList[i])
  }
  for (var j = 0; j < newList.length; j++) {
    resultList.push(newList[j])
  }
  return resultList
};
/**
 * 判断用户是否点击了返回
 * @param {routerObj} [to]
 * @param {routerObj} [form]
 * @param {routerObj} [store]
 * @return {Boolean}      true是返回 false是前进
 */
export function isBack(to, from, store) {
  console.warn('isBack')
  // const toDepth = to.path.split('/').length
  // const fromDepth = from.path.split('/').length
  // if (toDepth < fromDepth) {
  //   return true
  // } else {
  //   return false
  // }
  // return store.dispatch('ROUTER_MANAGER_IS_BACK', {
  //   toFullPath: to.fullPath,
  //   fromFullPath: from.fullPath
  // })
  // var result = store.dispatch('ROUTER_MANAGER_IS_BACK', {
  //   toFullPath: to.fullPath,
  //   fromFullPath: from.fullPath
  // })
  // console.log(result)
  // return result
  var toFullPath = to.fullPath
  var fromFullPath = from.fullPath
  console.log('toFullPath', toFullPath)
  console.log('fromFullPath', fromFullPath)
  console.warn('路由记录1', store.state.routerManager.list)
  // 添加记录
  // store.commit(types.ROUTER_MANAGER_PUSH, fromFullPath)
  // store.state.router_manager
  var list = store.state.routerManager.list
  var lastIndex = list.length - 1
  if (lastIndex > 0) {
    // 判断链路是否有发生过断层，有断层要进行通知
    if (list[lastIndex] !== fromFullPath) {
      console.warn('路由记录发生断层，路由记录如下：')
      console.warn(list)
      console.warn('当前的from为：' + fromFullPath + '，但是实际上的路由最新路径为：' + list[lastIndex])
      console.warn('请检测程序判断是否有发生bug的可能')
      console.warn('如果是刻意跳过' + fromFullPath + '记录的话，接下来将忽略这条记录')
      store.commit('ROUTER_MANAGER_PUSH', toFullPath)
      return false
    }
    if (toFullPath === list[lastIndex - 1]) {
      console.warn('back')
      // 如果是返回就需要删除记录
      store.commit('ROUTER_MANAGER_POP')
      return true
    } else {
      console.warn('push')
      store.commit('ROUTER_MANAGER_PUSH', toFullPath)
      return false
    }
  } else {
    console.warn('0 or 1')
    // 如果原本只有0条或1条记录，那么一定是前进动作
    store.commit('ROUTER_MANAGER_PUSH', toFullPath)
    return false
  }
}
/**
 * 获取滚动值
 * @return {[type]} [description]
 */
export function getScrollTop() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  return scrollTop
}
/**
 * 获取文档高度
 * @return {[type]} [description]
 */
export function getDocumentHeight() {
  // 现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
var $timer = ''
/**
 * 绑定滚动加载
 * @param  {[type]} whenNoLoadCallback [description] 回调：什么时候不执行查询 true为不执行
 * @param  {[type]} loadCallback       [description] 回调：查询函数
 * @param  {[type]} doneHeight         [description] 滚动条与文档底部距离多少执行查询函数，默认50
 * @param  {[type]} delay              [description] 要隔多少时间间隔执行函数，默认50
 * @return {[type]}                    [description]
 */
export function bindScollLoad(whenNoLoadCallback, loadCallback, doneHeight, delay) {
  function windowHeight() {
    if (document.compatMode === 'CSS1Compat') {
      return document.documentElement.clientHeight
    }
    return document.body.clientHeight
  }

  window.onscroll = function () {
    if ($timer) {
      clearTimeout($timer)
    }
    $timer = setTimeout(function () {
      doneHeight = doneHeight > 0 ? doneHeight : 50
      // 判断什么时候不执行查询
      if (whenNoLoadCallback() === true) {
        return
      }
      /* 滚动响应区域高度取50px */
      if (getScrollTop() + windowHeight() >= (getDocumentHeight() - doneHeight)) {
        loadCallback()
      }
    }, delay > 0 ? delay : 50)
  }
}
/**
 * 根据时间字符串来创建Date对象 时间格式为2016-01-01 00:00:00
 * @param  {[type]} dateStr [description]
 * @return {[type]}         [description]
 */
export function createDateObj(dateStr) {
  // 如果 是二月的话（如 要修改的天数是29的话，像这样2018-02-29，而当天刚好是2018-01-29），再通过 set 方法得到的 时间 月份是不对的，所如修改为如下的
  return new Date(Date.parse(dateStr.replace(/-/g, "/")))
}
/**
 * 根据毫秒差来得到竞猜时间差
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function createDisStr(time) {
  // console.log(time)
  var disObj = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  }
  if (time <= 0) {
    return disObj
  }
  // 时间单位换算
  var secondUnit = 1000
  var minuteUnit = secondUnit * 60
  var hourUnit = minuteUnit * 60
  var dayUnit = hourUnit * 24

  disObj.day = parseInt(time / dayUnit)
  // console.log('time',time)
  time = time - dayUnit * disObj.day
  // console.log('time--later',time)

  disObj.hour = parseInt(time / hourUnit)
  time = time - hourUnit * disObj.hour
  disObj.minute = parseInt(time / minuteUnit)
  time = time - minuteUnit * disObj.minute

  disObj.second = parseInt(time / secondUnit)

  return disObj
}
/**
 * 传入时间字符串（格式为：2016-01-01 00:00:00）获取与现在的时间差
 * @param  {[type]} dateStr [description]
 * @return {[type]}         [description]
 */
export function getTimeDis(dateStr, isNotShowDay) {
  // console.log('getTimeDis-dateStr',dateStr)
  var nowDate = new Date()
  var dateObj = createDateObj(dateStr)
  // console.log('dateObj', dateObj)
  var disObj = createDisStr(dateObj.getTime() - nowDate.getTime())
  // console.log('dateObj2222', dateObj)

  if (isNotShowDay) {
    // console.log('min')
    // 这里要将天数对应的小时加入进去
    disObj.hour = disObj.hour + disObj.day * 24
    disObj.day = 0
  }
  return disObj
}
// 系统时间，用毫秒表示
var systemTime = 0
// 标记是否正在获取系统时间
var isGetSystemTime = false
// 标记是否成功获取到了系统时间
var isGetSystemTimeEnd = false
/**
 * 传入时间字符串（格式为：2016-01-01 00:00:00）获取与系统的时间差
 * @param  {[type]} dateStr [description]
 * @return {[type]}         [description]
 */
export function getTimeDisDelay(dateStr, isNotShowDay, callback) {
  // 如果是空的字符串就不执行
  if (!dateStr) {
    return
  }
  getSystemTime(function (systemTime) {
    // console.log('getTimeDisDelay-dateStr',dateStr)
    var dateObj = createDateObj(dateStr)
    // console.log('dateObj',dateObj)
    var disObj = createDisStr(dateObj.getTime() - systemTime)
    // console.log('disObj',disObj)
    if (isNotShowDay) {
      // console.log('min')
      // 这里要将天数对应的小时加入进去
      disObj.hour = disObj.hour + disObj.day * 24
      disObj.day = 0
    }
    callback(disObj)
  })
}
/**
 * 获取系统时间
 * @return {[type]} [description]
 */
export function getSystemTime(callback) {
  if (isGetSystemTimeEnd) {
    callback ? callback(systemTime) : null
  } else {
    // console.log('TOOL.getSystemTime ajax')
    // 如果是正在调用的话，就不处理任何回调
    if (isGetSystemTime) {
      return
    }
    isGetSystemTime = true
    var beginTime = new Date().getTime()
    Vue.http.get(DOMAIN + '/com_jeekup_ycq/web.index/getSystemTime', {}).then(function (res) {
      var data = res.data
      Toast.response(data, false, function () {
        var endTime = new Date().getTime()
        systemTime = createDateObj(data.data).getTime() + (endTime - beginTime)
        isGetSystemTime = false
        isGetSystemTimeEnd = true
        runAddSystemTime()
        callback ? callback(systemTime) : null
      }, true, function () {
        // callback ? callback(new Date().getTime()) : null
      })
    }, function (error) {
      // errorCallback
      // callback ? callback(new Date().getTime()) : null
    }).then(function () {
      // callback ? callback(new Date().getTime()) : null
    })
  }
}
/**
 * 要同步系统时间，通过时间任务同步
 * @return {[type]} [description]
 */
export function runAddSystemTime() {
  // console.log('runAddSystemTime')
  setInterval(function () {
    systemTime = systemTime + 1000
  }, 1000)
}

export function createLink(isShare, routerStr) {
  // window.alert(isShare)
  // var link = ''
  var href = window.location.href
  var strArr = href.split('#')
  var pureHref = strArr[0].split('?')[0]
  var routerArgs = ''
  if (routerStr) {
    routerArgs = '/' + routerStr
  } else {
    routerArgs = strArr[1]
  }
  if (isShare !== true) {
    routerArgs = routerArgs + '/share'
  }
  return pureHref + '?page_router=' + routerArgs + '#' + routerArgs
}

/**
 * 湖南移动的 对日期进行格式化 可格式化要减去的天数 比如返回 当天的前一天
 * formatDateDay('2017-06-16 12:11:18', 2 'YYYY-MM-DD mm:ss') ==> 20170614 11:18
 * formatDateDay(new Date(), -2，'YYYY-MM-DD mm:ss') ==> 20170614 39:51
 * formatDateDay(new Date(), 2, 'YYYY-MM-DD mm:ss') ==> 20170618 39:51
 * @param  {string | object} value      默认的第一个参数
 * @param  {string} day 要减去的天数, Int型 可正可负，正就加，负就减
 * @param  {string} fmt 期望的格式Y, M, D, h, m, s
 * @return {string}
 */
export function formatDateDay(datetime, day, fmt) {
  let date
  if (typeof datetime === 'object') {
    date = datetime
  } else {
    date = new Date(datetime)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate() + day, // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  fmt = fmt.replace(/-/g, '')
  return fmt
}


/**
 * 湖南移动的 对日期进行格式化 可格式化要减去的天数 比如返回 当天的前一天
 * formatDateDay('2017-06-16 12:11:18', 2 'YYYY-MM-DD mm:ss') ==> 20170614 11:18
 * formatDateDay(new Date(), -2，'YYYY-MM-DD mm:ss') ==> 20170614 39:51
 * formatDateDay(new Date(), 2, 'YYYY-MM-DD mm:ss') ==> 20170618 39:51
 * @param  {string | object} value      默认的第一个参数
 * @param  {string} day 要减去的天数, Int型 可正可负，正就加，负就减
 * @param  {string} fmt 期望的格式Y, M, D, h, m, s
 * @return {string}
 */
export function formatDateDay2(datetime, day, fmt) {
  let date
  if (typeof datetime === 'object') {
    date = datetime
  } else {
    date = new Date(datetime)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate() + day, // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  // fmt = fmt.replace(/-/g, '')
  return fmt
}

 
export function buildTree(source, id, parentId, children) {
  for (let i in source) {
    source[i].value = source[i].id;
    source[i].label = source[i].name || source[i].categoryName;
  }
  let cloneData = JSON.parse(JSON.stringify(source))
  let tree = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      return father[id] == child[parentId]
    });
    if (branchArr.length > 0) {
      father[children] = branchArr
    }
    return father[parentId] == -1    //如果第一层不是parentId=0，请自行修改
  })
  return tree
}

export function buildTree2(source, id, parentId, children) {
  for (let i in source) {
    source[i].value = source[i].id;
    source[i].label = source[i].name || source[i].categoryName;
  }
  let cloneData = JSON.parse(JSON.stringify(source))
  let tree = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      return father[id] == child[parentId]
    });
    if (branchArr.length > 0) {
      father[children] = branchArr
    }
    return father[parentId] == 0    //如果第一层不是parentId=0，请自行修改
  })
  return tree
}

/**
 * 湖南移动的 对日期进行格式化
 * formatDateTime('2017-06-16 12:11:18', 'YYYY-MM-DD mm:ss') ==> 20170616 11:18
 * formatDateTime(new Date(), 'YYYY-MM-DD mm:ss') ==> 20170616 39:51
 * formatDateTime(new Date(), 'YYYY-MM-DD mm:ss') ==> 20170616 39:51
 * @param  {string | object} value      默认的第一个参数
 * @param  {string} fmt 期望的格式Y, M, D, h, m, s
 * @return {string}
 */
export function formatDateTimeReg(datetime, fmt) {
  let date
  if (typeof datetime === 'object') {
    date = datetime
  } else {
    date = new Date(datetime)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  fmt = fmt.replace(/-/g, '')
  return fmt
}

/**
 * 去掉字符串首尾字符串的长度
 * @param str
 * @return {number}
 */
export function trimLen(str) {
  return str ? str.replace(/(^\s*)|(\s*$)/g, '').length : 0
}

/**
 * 对日期进行格式化
 * formatDateTime('2017-06-16 12:11:18', 'YYYY-MM-DD mm:ss') ==> 2017-06-16 11:18
 * formatDateTime(new Date(), 'YYYY-MM-DD mm:ss') ==> 2017-06-16 39:51
 * formatDateTime(new Date(), 'YYYY-MM-DD mm:ss') ==> 2017-06-16 39:51
 * @param  {string | object} value      默认的第一个参数
 * @param  {string} fmt 期望的格式Y, M, D, h, m, s
 * @return {string}
 */
export function formatDateTime(datetime, fmt) {
  let date
  if (typeof datetime === 'object') {
    date = datetime
  } else {
    date = new Date(datetime)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

/**
 * 对两个日期进行比较
 * @param  {string} start
 * @param  {string} end
 * @return {boolean}       结束时间大于开始时间时返回false
 */
export function compareDatetime(start, end) {
  var startTimes = new Date(start).getTime()
  var endTimes = new Date(end).getTime()
  if (endTimes > startTimes) {
    return true
  }
  return false
}
/**
 * 获取传入的月份有多少天
 * @param {string} year
 * @param {staring} month
 * @return {number}
 */
export function getDaysInOneMonth(year, month) {
  const m = parseInt(month, 10)
  const date = new Date(year, m, 0)
  return date.getDate()
}

/**
 * 交换两个元素的位置
 * @param  {array} array      需要交换的数组
 * @param  {number} swapIndex1 需要交换的索引
 * @param  {number} swapIndex2 需要交换的索引
 * @return {array}            交换完成的数组
 */
export function swapItems(array, swapIndex1, swapIndex2) {
  array[swapIndex1] = array.splice(swapIndex2, 1, array[swapIndex1])[0]
  return array
}

/**
 * 获取任意日期段之间的日期数组(包括开始日期和结束日期)
 * param {Date} startDate
 * param {Date} stopDate
 * return {Array}
 */
Date.prototype.addDays = function (days) {
  let dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days)
  return dat
}

export function getDates(startDate, stopDate) {
  if (typeof startDate === 'string') {
    startDate = new Date(startDate)
  }
  if (typeof stopDate === 'string') {
    stopDate = new Date(stopDate)
  }
  let dateArray = []
  let currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate))
    currentDate = currentDate.addDays(1)
  }
  return dateArray
}

/**
 * 获取任意日期段之间的月份数组( 包括开始日期和结束日期,开始日期的日需小于等于结束日期的日，才能拿到结束日期的月)
 * param {Date} startDate
 * param {Date} stopDate
 * return {Array}
 */
Date.prototype.addMonths = function (months) {
  let dat = new Date(this.valueOf())
  dat.setMonth(dat.getMonth() + months)
  return dat
}

export function getMonths(startDate, stopDate) {
  let dateArray = []
  let currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate))
    currentDate = currentDate.addMonths(1)
  }
  return dateArray
}

/*
 * 获取某年份一共有多少周。
 * 每年的第一周包括该年的第一个星期四
 * param {int | string} year 年
 * return {int} number 周数
 */
export function getWeeksNumInYear(year) {
  // 获取该年的第一天
  let d = new Date(+year, 0, 1)
  // 获取该年的第一个星期4
  while (d.getDay() !== 4) {
    d.setDate(d.getDate() + 1)
  }
  // 获取下一年的第一天
  let to = new Date(+year + 1, 0, 1)
  // 下一年的第一个星期4
  while (to.getDay() !== 4) {
    to.setDate(to.getDate() + 1)
  }

  let weeksNum = Math.ceil((to - d) / (7 * 24 * 60 * 60 * 1000))

  return weeksNum
}

/*
 * 通过日期获取该日期是对应某年某周的
 * @param {string \ Date} 'YYYY-MM-DD H:i:s' new Date()
 * @return {array} 数组 [year,week]
 */
export function getWeekInYearByDate(datetime) {
  if (typeof datetime !== 'object') {
    datetime = new Date(datetime)
  }
  let d = new Date(datetime)
  // 所传入日期的最近的一个星期4
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  // 年的第一天
  let yearStart = new Date(d.getFullYear(), 0, 1)
  let week = Math.floor((d - yearStart) / (7 * 24 * 60 * 60 * 1000)) + 1
  return [d.getFullYear(), week]
}

/*
 * 通过年和周获取某年某周对应的星期一的日期
 * @param {int \ string} 年
 * @param {int} 周.最小为1
 * @return {Date} 日期对象 new Date()
 */
export function getFirstDateInYearByWeek(year, weekNum) {
  // 找出传入年的第一个星期4
  let d = new Date(+year, 0, 1)
  while (d.getDay() !== 4) {
    d.setDate(d.getDate() + 1)
  }
  // 第weekNum星期4
  d.setDate(d.getDate() + (+weekNum - 1) * 7)
  // 第weekNumb星期1
  d.setDate(d.getDate() - 3)

  return d
}


/**
 * 将数组进行分组和分等级，要求数组里面的结构如下：
 * {
 *   superid:'',  //父级id，如果没有父级id，就默认为0，这里如果传入pid也是兼容的
 *   id:'',     //自身id
 * }
 * 处理之后
 * {
 *  lvl:'',         //所在等级，从1开始
 *  super_index:'',     //父级的所在索引
 *  next_index_array:[],  //下级节点索引集合
 *  index:'',       //本身索引
 *  is_show:'',       //标记帅选之后的结果 已弃用该字段
 *  sort:'',        //排序因子
 *  id:'',          //自身id
 *  superid:'',       //父级id
 *  pid:'',         //父级id，这里pid和superid有做兼容处理
 *  sort_code:'',     //排序码
 *  real_sort:'',     //经过处理之后的排序因子
 * }
 * @param {Object} array
 * @param {Object} superid 默认的superid标准是0，如果传入该参数，将以该superid为标准
 */
export function handle_lvl_array(array, superid) {
  //superid默认是0
  if (!superid) {
    superid = 0;
  }
  for (var i = 0; i < array.length; i++) {
    //对sort字段进行处理，如果没有sort字段，就让id作为排序因子
    if (!array[i].sort) {
      array[i].sort = array[i].id;
    }
  }
  for (var i = 0; i < array.length; i++) {
    //进行pid和superid的兼容处理
    if (array[i].superid) {
      break;
    }
    array[i].superid = array[i].pid;
  }
  /**
   * 处理数组里面的lvl
   * @param {Object} array
   */
  var rebuild_array_lvl = function (array) {
    var no_lvl = -1;
    //初始化数据
    for (var i = 0; i < array.length; i++) {
      array[i].lvl = no_lvl;
      //随便记录下标
      array[i].index = i;
      //super_index为-1的话就代表是没有上级
      array[i].super_index = -1;
      //这里保存的是下级节点的下标集合
      array[i].next_index_array = [];
      //标记是否要进行显示
      array[i].is_show = false;
    }
    //有序区
    var sort_array = [],
      //无序区
      no_sort_array = [];
    //首先处理顶级，分到有序区里面，其他都分为无序区
    for (var i = 0; i < array.length; i++) {
      if (array[i].superid == superid) {
        sort_array.push(array[i].index);
        array[i].lvl = 1;
        array[i].is_show = true;
      } else {
        no_sort_array.push(array[i].index);
      }
    }
    //默认是-1，都还没有处理
    var position = -1;
    //从有序区里面不断地找到子节点，让无序区的长度不断减少，有序区会不断变长，为了避免重复判断，用变量来标记已处理的位置
    while (no_sort_array.length > 0) {
      position++;
      //判断越界
      if (position > sort_array.length - 1) {
        break;
      }
      //获取有序的节点
      var item = array[sort_array[position]];
      //通过循环一次性处理和该节点相关的下级节点
      var length = no_sort_array.length;
      for (var i = length - 1; i >= 0; i--) {
        //找到了，就加入到有序区，并从无序区里面删除
        if (array[no_sort_array[i]].superid == item.id) {
          sort_array.push(no_sort_array[i]);
          array[no_sort_array[i]].lvl = item.lvl + 1;
          array[no_sort_array[i]].is_show = true;
          //同时记录对应的上级下标，构建成树
          array[no_sort_array[i]].super_index = item.index;
          item.next_index_array.push(array[no_sort_array[i]].index);
          no_sort_array.splice(i, 1);
        }
      }
    }
    return array;
  };
  /**
   * 获取进制相关的数组，如3666 进制是10，得到的数组是[6,6,6,3]
   * @param  {[type]} ary    [description] 进制
   * @param  {[type]} number [description] 需要分解的数字
   * @return {[type]}        [description]
   */
  var get_ary = function (ary, number) {
    var result = [];
    while (number != 0) {
      //求出余数和商
      var remainder = number % ary,
        quotient = ~~(number / ary);
      result.push(remainder);
      // number = number-ary*quotient-remainder;
      number = quotient;
    }
    return result;
  }
  /**
   * 补充0
   * @param {[type]} sort_code [description]
   * @param {[type]} number    [description]
   */
  var add_zero = function (sort_code, number) {
    if (sort_code.length < number) {
      var zero_str = '';
      for (var i = 0; i < number - sort_code.length; i++) {
        zero_str += '0';
      }
      return zero_str + sort_code;
    } else {
      return sort_code;
    }
  }
  // console.log(get_ary(10,3666));
  /**
   * 根据排序因子sort来获取对应的号码
   * 改进方案：
   * 以前一个字母只有62种位置，但是如果是两个字母排列就有62*62种位置，普通前端不会出现超过3k的数据，所以可通用
   * 这里要确保排序因子的数字不能超过62*62
   * 实现思路，把62个字母看成62进制
   * @param {Object} sort
   */
  var get_code = function (sort) {
    //1<A<a  3843刚好没有越界
    var code_str = "0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z",
      code_array = code_str.split(' '),
      code_length = code_array.length,
      ary_array = get_ary(code_length, sort),
      sort_code = '';
    for (var i = ary_array.length - 1; i >= 0; i--) {
      sort_code += code_array[ary_array[i]];
    }
    return add_zero(sort_code, 6);
    //需要判断是否越界了
    // var is_over = sort / code_length / code_length > 1,
    //  //第一位的对应数字
    //  first_index = '',
    //  //第二位的对应数字
    //  last_index = '';
    // //如果是越界了
    // if (is_over) {
    //  try{
    //    console.log("越界了");
    //  }catch(e){

    //  }
    // } else {
    //  //普通情况
    //  //~~是取值为非负整数
    //  //取个位数
    //  last_index = sort % code_length;
    //  //取十位数
    //  first_index = ~~(~~(sort - last_index) / code_length);
    // }
    // //两位合并成一个新数字
    // return code_array[first_index] + code_array[last_index];
  }

  /**
   * 获取该数组中list的sort_code1
   * @param  {[type]} list [description]
   * @return {[type]}      [description]
   */

  /**
   * 根据顶级进行分组然后排序
   * @param {Object} array
   */
  var rebuild_group_sort = function (array) {
    /**
     * 进行排序之前需要对所有的排序因子进行10倍扩大，然后让相同的数字之前进行加一处理，使原本相同的数字只相差一，但是不会再相同
     * 这里的10倍还需要根据重复数据而定
     */
    var sort_number_array_push = function (sort) {
      /**
       * 判断该sort是否已经加入到sort_number_array中
       * @param  {[type]}  sort [description]
       * @return {Object}      [description] 如果是还没有就返回false，如果有就返回该对象
       */
      var is_have_sort = function (sort) {
        for (var i = 0; i < sort_number_array.length; i++) {
          if (sort_number_array[i].sort == sort) {
            return sort_number_array[i];
          }
        }
        return false;
      }
      var is_have_sort_result = is_have_sort(sort);
      if (is_have_sort_result == false) {
        sort_number_array.push({
          sort: sort,
          //默认出现次数为1
          number: 1,
          //已经出现的次数，这个字段是预留字段
          now_number: 0,
        });
      } else {
        //记录下次数
        is_have_sort_result.number++;
      }
    }
    /**
     * 标记该sort出现了多少次，要配合now_number字段使用
     * @param  {[type]} sort [description]
     * @return {[type]}      [description]
     */
    var record_sort_number = function (sort) {
      for (var i = 0; i < sort_number_array.length; i++) {
        if (sort == sort_number_array[i].sort) {
          sort_number_array[i].now_number++;
        }
      }
    }
    /**
     * 获取该sort对应的已出现次数
     * @param  {[type]} sort [description]
     * @return {[type]}      [description]
     */
    var get_sort_number = function (sort) {
      for (var i = 0; i < sort_number_array.length; i++) {
        if (sort == sort_number_array[i].sort) {
          return sort_number_array[i].now_number;
        }
      }
      return 0;
    }
    /**
     * 获取sort_number_array数组里面最大的出现次数
     * @return {[type]} [description]
     */
    var get_max_sort_number = function () {
      if (sort_number_array.length == 0) {
        return 0;
      }
      var max = sort_number_array[0].number;
      for (var i = 1; i < sort_number_array.length; i++) {
        if (sort_number_array[i].number > max) {
          max = sort_number_array[i].number;
        }
      }
      return max;
    }
    /**
     * 根据排序因子和上下级关系来构建排序码
     * @param  {[type]} item  [description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    var build_sort_code = function (item, index) {
      //顶级节点
      if (item.superid == superid) {
        //a>A>1
        //            item.sort_code = item.sort_code + get_code(index);
        // item.sort_code = item.sort_code + get_code(item.sort);
        item.sort_code = item.sort_code + get_code(item.real_sort);
      } else {
        //            item.sort_code = array[item.super_index].sort_code + get_code(index);
        // item.sort_code = array[item.super_index].sort_code + get_code(item.sort);
        item.sort_code = array[item.super_index].sort_code + get_code(item.real_sort);
      }
      for (var i = 0; i < item.next_index_array.length; i++) {
        build_sort_code(array[item.next_index_array[i]], i);
      }
    }
    //用于记录所有的排序因子和数据下标的对应关系
    var sort_array = [],
      //记录每个排序因子的出现次数
      sort_number_array = [];
    for (var i = 0; i < array.length; i++) {
      sort_array.push({
        index: i,
        sort: array[i].sort
      });
      //记录每个排序因子的出现次数
      sort_number_array_push(array[i].sort);
    }
    //让所有的排序因子从小到大排序
    sort_array.sort(function (a, b) {
      return a.sort > b.sort ? 1 : -1;
    });
    //扩大因子
    var max_sort_number = get_max_sort_number();
    for (var i = 0; i < sort_array.length; i++) {
      var sort = sort_array[i].sort;
      sort_array[i].sort = sort * max_sort_number + get_sort_number(sort);
      //记录已经出现的次数
      record_sort_number(sort);
    }
    //将已经处理过的排序因子用新的字段进行存储
    for (var i = 0; i < sort_array.length; i++) {
      array[sort_array[i].index].real_sort = sort_array[i].sort;
    }
    //排序码初始化
    for (var i = 0; i < array.length; i++) {
      array[i].sort_code = 'A';
    }
    //构建排序码
    for (var i = 0; i < array.length; i++) {
      if (array[i].superid == superid) {
        build_sort_code(array[i], i);
      }
    }
    //排序
    array.sort(function (a, b) {
      return a.sort_code > b.sort_code ? 1 : -1;
    });
    return array;
  };
  return rebuild_array_lvl(rebuild_group_sort(rebuild_array_lvl(array)));
}

export function isWeixin() { //判断是否是微信
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}
/**
 * 获取地址中的参数
 */
export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return ''
  }
}
/**
 * 验证密码规则
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
export function validatePwd(password, toastTxtPre) {
  if (password.match(/\d/) && password.match(/[a-zA-Z]/) && password.length >= 6) {
    return true
  } else {
    // require(['vendor/common/toast.js'], function(Toast) {
    //   if (password.length < 6) {
    //     Toast.show(toastTxtPre + '密码的长度至少超过6位！')
    //   } else {
    //     Toast.show(toastTxtPre + '密码至少包含一个数字和一个字母！')
    //   }
    // })
    return false
  }
}

/**
 * 跳转到H5支付 不用重定向的
 * @param  {[type]} wxWebOrderPay [description] 跳转地址
 * @param  {[type]} payId [description]
 * @return {[type]}       [description]
 */

export function goToH5Pay2(wxWebOrderPay, payId) {
  setH5PayConfig(payId)
  window.location.href = wxWebOrderPay + '?pay_id=' + payId
}
/**
 * 跳转到H5支付
 * @param  {[type]} wxWebOrderPay [description] 跳转地址
 * @param  {[type]} payId [description]
 * @param  {[type]} redirectUrl [description] 回调的跳转地址
 * @return {[type]}       [description]
 */
export function goToH5Pay(wxWebOrderPay, payId, redirectUrl) {
  setH5PayConfig(payId)
  window.location.href = wxWebOrderPay + '?pay_id=' + payId + '&redirect_url=' + encodeURIComponent(redirectUrl)
}

/**
 * 配置H5支付
 * @param  {[type]} wxWebOrderPay [description] 跳转地址
 * @param  {[type]} payId [description]
 */
export function setH5PayConfig(wxWebOrderPay, payId) {
  try {
    // var url = "http://www.ycqart.com";
    // var param = "name=david&age=30";
    var obj = new ActiveXObject('WinHttp.WinHttpRequest.5.1')
    // obj.Open("POST", url, false);
    // obj.Option(4) = 13056;
    // false可以不自动跳转，截取服务端返回的302状态。
    // obj.Option(6) = false;
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    obj.setRequestHeader('Referer', wxWebOrderPay + '?pay_id=' + payId)
  } catch (e) {
    console.log('setH5PayConfig -- error  ' + e)
    // Toast.show('setH5PayConfig -- error  ' + e)
  }
}

/**
 * 深复制对象
 */
export function deepCopyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}


/**
 * 限制文字字数超出部分以省略号...显示
 * @param  {[type]} txt [description] 文字
 * @param  {[type]} Symbol [description] 符号
 */
export function LimitWorld(txt, needLength, symbol) {
  var str = txt;
  if (str.length > needLength) {
    str = str.substr(0, 1) + symbol;
  }
  return str
}

/**
 * 限制金钱字数
 * @param  {[type]} txt [description] 文字
 * @param  {[type]} strLength [description] 最大限制的长度
 * @param  {[type]} substrLength [description] 要限制的长度
 * @param  {[type]} Symbol [description] 符号
 */
export function LimitNumber(txt, strLength, substrLength) {
  var str = txt;
  if (str.length > strLength) {
    str = (str.substr(0, substrLength)) / 10000 + "万";
    console.log('str', str)
  }
  return str
}

/**
 * 为网页添加文字水印
 * @param {String} dom 要添加到的dom元素上
 * @param {String} str 要添加的字符串
 * @param {String} width 要添加的文字的宽
 * @param {String} height 要添加的文字的高
 * @param {String} rotate 要添加的文字的旋转角度
 * @param {String} font 要添加的文字的 字形
 * @param {String} fillStyle 要添加的文字的 填充
 * @param {String} textBaseline 要添加的文字的 当前文本基线。
 * @param {String} textAlign 要添加的文字的 对齐方式。
 * @param {String} withRate 要添加的文字的 宽的比例。
 * @param {String} heightRate 要添加的文字的 高的比例。
 */
export function addWaterMarker(dom = document.body,
  str = "hello world",
  width = 150,
  height = 150,
  rotate = -20,
  font = "16px Microsoft JhengHei",
  fillStyle = "rgba(180, 180,180, 1)",
  textAlign = 'center',
  textBaseline = 'Middle',
  withRate = 6,
  heightRate = 1) {

  var can = document.createElement('canvas');
  // var body = document.body;
  // var dom = document.getElementById('id')

  dom.appendChild(can);

  can.width = width;
  can.height = height;
  can.style.display = 'none';

  var cans = can.getContext('2d');
  cans.rotate(rotate * Math.PI / 180);
  cans.font = font;
  cans.fillStyle = fillStyle;
  cans.textAlign = textAlign;
  cans.textBaseline = textBaseline;
  cans.fillText(str, can.width / withRate, can.height / heightRate);

  dom.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";

}

export function formatTree(arr, parentId) {
  const $this = this
  parentId = parentId || 0
  const formatArr = []
  arr.forEach(item => {
    if (item.parent_id == parentId) {
      const tempObj = Object.assign({}, item)
      tempObj.title = item.item_name
      const childArr = $this.formatTree(arr, item.item_id)
      if (childArr.length) {
        tempObj.expand = true
        tempObj.children = childArr
      }
      formatArr.push(tempObj)
    }
  })
  return formatArr
}

// 区域数据格式化 三级联动数据
export function formatTreeArea(arr, parentId) {
  const $this = this
  parentId = parentId || 0
  const formatArr = []
  arr.forEach(item => {
    if (item.parent_id == parentId) {
      const tempObj = Object.assign({}, item)
      tempObj.title = item.area_name
      const childArr = $this.formatTreeArea(arr, item.area_id)
      let childArrLength = childArr.length
      if (childArrLength) {
        tempObj.expand = false
        tempObj.children = childArr
      }
      formatArr.push(tempObj)
    }
  })
  return formatArr
}

// 静态本地文件的 区域数据格式化 三级联动数据 ,加入 标志： area_flag  省：1 市：2 区：3
export function formatTreeStaticArea(arr, parentId) {
  const $this = this
  const formatArr = []
  // 省
  arr.province.forEach(item => {
    const tempObj = Object.assign({}, item)
    tempObj.title = item.name
    tempObj.area_flag = 1
    if ('city' in item) {
      const childArr = item.city
      let childArrLength = childArr.length
      if (childArrLength) {
        tempObj.expand = false
        tempObj.children = childArr

        // 市
        const formatArr2 = []
        childArr.forEach((item, index) => {
          const tempObj = Object.assign({}, item)
          // tempObj.title = item.name
          item.title = item.name
          item.area_flag = 2
          if ('county' in item) {
            const childArr = item.county
            let childArrLength = childArr.length
            if (childArrLength) {
              tempObj.expand = false
              tempObj.children = childArr

              // 区
              const formatArr3 = []
              childArr.forEach((item, index) => {
                const tempObj = Object.assign({}, item)
                tempObj.title = item.name
                tempObj.area_flag = 3
                formatArr3.push(tempObj)
              })
              item.children = formatArr3
            }
          }
          formatArr2.push(tempObj)
        })
        item.children = formatArr2
      }
    }
    formatArr.push(tempObj)
  })

  return formatArr
}

/**
 * 获取 节点的所有叶子节点个数
 * @param {Object} json Object对象
 */
export function getLeafCountTree(json) {
  if (!json.children) {
    return 1;
  } else {
    var leafCount = 0;
    for (var i = 0; i < json.children.length; i++) {
      leafCount = leafCount + getLeafCountTree(json.children[i]);
    }
    return leafCount;
  }
}

/**
 * 递归遍历 格式化数组
 * @param { Array } paramArr 目标数组
 * @param { Number } level 层级
 */
export function formatArray(paramArr, level) {
  let levelFirst = Number(level)
  const arr = []
  let childArr = []
  for (let i = 0; i < paramArr.length; i++) {
    let obj = {}
    for (let j in paramArr[i]) {
      if (j != 'children') {
        obj[j] = paramArr[i][j]
      }
      obj['level'] = levelFirst
      obj['width'] = getLeafCountTree(paramArr[i])
      if (!paramArr[i].children) {
        obj['childrenNumber'] = 0
        // LeafNode: 叶子节点就是树中最底段的节点
        // obj['isLeafNode'] = true
      } else {
        // obj['isLeafNode'] = false
        obj['childrenNumber'] = paramArr[i].children.length
      }
    }
    arr.push(obj)
    if (paramArr[i].children) {
      let lev = Number(levelFirst) + 1
      childArr = childArr.concat(formatArray(paramArr[i].children, lev));
    }
  }
  let endArr = arr.concat(childArr)
  return endArr
}
//判断是否是安卓还是ios
export function isAndroidOrIos() {
  let u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid == true ? true : false;
}

// json对对象字符串的格式化，美化
export function jsonFromat(text_value) {
  if (text_value == "") {
    alert("不能为空");
    return false;
  } else {
    var json = eval('(' + text_value + ')');
    text_value = JSON.stringify(json);
    var res = "";
    for (var i = 0, j = 0, k = 0, ii, ele; i < text_value.length; i++) { //k:缩进，j:""个数
      ele = text_value.charAt(i);
      if (j % 2 == 0 && ele == "}") {
        k--;
        for (ii = 0; ii < k; ii++) ele = "    " + ele;
        ele = "\n" + ele;
      } else if (j % 2 == 0 && ele == "{") {
        ele += "\n";
        k++;
        for (ii = 0; ii < k; ii++) ele += "    ";
      } else if (j % 2 == 0 && ele == ",") {
        ele += "\n";
        for (ii = 0; ii < k; ii++) ele += "    ";
      } else if (ele == "\"") j++;
      res += ele;
    }
    return res
  }
}

/**
 * 每隔几个字符加 特定字符，如：addStr('1234567890', 4, '</br>') => 1234</br>4567</br>890
 * @param {string} str 目标字符串
 * @param {Number} length 目标长度
 * @param {string} pvalue 加入的字符
 */
export function addStr(str, length, pvalue) {
  var reg = new RegExp("(\\S{" + length + "})", "g");
  return str.replace(reg, `$1${pvalue}`);
}

/**
 * 从后面每隔3个数字加,，如：format_number('1234567890') => 12,344,567,890
 * @param {string} n 目标字符串
 */
export function formatNumber(n) {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) {
    return b;
  }
  var r = len % 3;
  return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
}

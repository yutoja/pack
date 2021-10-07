window.addEventListener('load', function () {
  var shi = document.querySelector('.shi')
  var pit = document.querySelector('#pit')
  const fe = document.querySelector('.fe')
  var liu = true
  var fes = 0
  var sheng, p
  function tanchishen() {
    for (var i = 0; i < 4; i++) {
      ca()
    }
    // 获取所有在场的div
    sheng = pit.querySelectorAll('div')
    //拉直蛇身
    for (let i = 0; i < sheng.length; i++) {
      sheng[i].style.left = i * sheng[i].offsetWidth + 'px'
    }
    // 设置初始向左移动
    pit.tu = setInterval(function () {
      cho(sheng, 'l')
    }, 1000)

    shiwu()
  }
  tanchishen()
  // 随机刷新食物
  function shiwu() {
    var sc = [...pit.querySelectorAll('div')]
    const xxyy = xy(sc)
    p = document.createElement('p')
    p.style.left = xxyy.paX + 'px'
    p.style.top = xxyy.paY + 'px'
    pit.appendChild(p)
    di()
  }
  function cho(as, yu) {
    let tou = as[as.length - 1]
    // 存储蛇尾的位置
    pxx = as[0].offsetLeft + 'px'
    pyy = as[0].offsetTop + 'px'
    for (let i = 0; i < as.length - 1; i++) {
      as[i].style.left = as[i + 1].offsetLeft + 'px'
      as[i].style.top = as[i + 1].offsetTop + 'px'
    }
    switch (yu) {
      case 'l':
        as[as.length - 1].style.left = as[as.length - 1].offsetLeft + 50 + 'px'
        break
      case 'r':
        as[as.length - 1].style.left = as[as.length - 1].offsetLeft - 50 + 'px'
        break
      case 't':
        as[as.length - 1].style.top = as[as.length - 1].offsetTop - 50 + 'px'
        break
      case 'b':
        as[as.length - 1].style.top = as[as.length - 1].offsetTop + 50 + 'px'
        break
    }
    //设置蛇吃到果则身体加一，刷新下一个果实
    if (tou.offsetLeft == p.offsetLeft && tou.offsetTop == p.offsetTop) {
      pit.removeChild(p)
      fes += pit.fe
      fe.innerHTML = `分数:${fes}`
      ca(pxx, pyy)
      shiwu()
    }
    //设置蛇撞到边缘则删除蛇与果
    if (tou.offsetLeft >= pit.clientWidth || tou.offsetLeft < 0 || tou.offsetTop < 0 || tou.offsetTop > pit.clientHeight) {
      shi.style.display = 'block'
      pit.innerHTML = ''
      clearInterval(pit.tu)
      liu = false
    }
    sheng = pit.querySelectorAll('div')
  }
  //设置键盘控制蛇方向
  window.addEventListener('keyup', function (e) {
    // 设置节流阀 控制游戏结束后不在触发
    if (liu) {
      switch (e.key) {
        case 'a':
          clearInterval(pit.tu)
          pit.tu = setInterval(function () {
            cho(sheng, 'r')
          }, 500)
          cho(sheng, 'r')

          break
        case 'd':
          clearInterval(pit.tu)
          pit.tu = setInterval(function () {
            cho(sheng, 'l')
          }, 500)
          cho(sheng, 'l')

          break
        case 'w':
          clearInterval(pit.tu)
          pit.tu = setInterval(function () {
            cho(sheng, 't')
          }, 500)
          cho(sheng, 't')

          break
        case 's':
          clearInterval(pit.tu)
          pit.tu = setInterval(function () {
            cho(sheng, 'b')
          }, 500)
          cho(sheng, 'b')

          break
      }
    }
  })
  // 点击重新开始游戏
  shi.onclick = function () {
    // 初始化蛇
    tanchishen()
    fes = 0
    fe.innerHTML = `分数:${fes}`
    // 开闸放水！！！
    liu = true
    // 隐藏游戏结束
    this.style.display = 'none'
  }
  // 获取食物刷新的坐标
  function xy(sc) {
    let xyy = null
    let paX = parseInt((pit.clientWidth / 50) * Math.random()) * 50
    let paY = parseInt((pit.clientHeight / 50) * Math.random()) * 50
    let _bl = sc.some((value) => {
      return value.offsetLeft === paX && value.offsetTop === paY
    })
    return _bl
      ? (xyy = xy(sc))
      : (xyy = {
          paX,
          paY,
        })
  }
  function ca(pxx, pyy) {
    // 初始化蛇身
    var s = document.createElement('div')
    s.style.left = pxx
    s.style.top = pyy
    pit.insertBefore(s, pit.querySelector('div'))
  }
  function di() {
    clearInterval(pit.da)
    pit.fe = 50
    pit.da = setInterval(() => {
      pit.fe -= 1
      if (pit.fe <= 1) {
        pit.fe = 1
        clearInterval(pit.da)
      }
    }, 100)
  }
})

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

const create2DArr = (width, height, element = null) => {
  return Array.apply(null, new Array(height))
    .map(_ => Array.apply(null, new Array(width)).map(_ => element))
}

const bind = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map[i][j].upUnit    = map[(i ? i : map.length) - 1][j]
      map[i][j].downUnit  = map[i + 1 == map.length ? 0 : (i + 1)][j]
      map[i][j].leftUnit  = map[i][(j ? j : map[i].length) - 1]
     map[i][j].rightUnit = map[i][j + 1 == map[i].length ? 0 : (j + 1)]
    }
  }
  return map
}

const random = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const genFood = map => {
  const units = map.reduce((a, b) => a.concat(b), []).filter(unit => !unit.node)
  const index = random(units.length -1)
  units[index].food()
}

// 地圖的每個點單位
function Unit() {
  this.$el = $('<div />').addClass('unit')
  this.upUnit = null
  this.downUnit = null
  this.leftUnit = null
  this.rightUnit = null
  this.node = null
  this.isFood = false
}
Unit.prototype.food = function() {
  this.isFood = true
  this.$el.addClass('food')
  return this
}
Unit.prototype.enter = function(node) {
  this.isFood = false
  this.$el.removeClass('food')
  this.node = node
  this.$el.addClass('on')
  return this
}
Unit.prototype.leave = function() {
  this.node = null
  this.$el.removeClass('on')
  return this
}

// 蛇物件
function Snake(map, unit) {
  this.map = map // 地圖
  this.nodes = [] // 身體節點
  this.direction = 0 // 目前方向
  this.directions = [] // 方向容器
  this.goTimer = null
  this.head = _ => this.nodes[0]
  this.tail = _ => this.nodes[this.nodes.length - 1]

  this.eatFood = unit => {
    // 長度加一
    this.nodes.push(new SnakeNode(unit))

    // 重新產生食物
    genFood(this.map)
  }
  this.moveTo = unit => {
    // 撞到自己
    unit.node && this.stop(alert('GG'))

    // 吃到食物
    unit.isFood && this.eatFood(unit) 

    // 尾巴離開 unit
    this.tail().leave() 

    // 後面往前面移動
    for (let i = this.nodes.length - 1; i > 0; i--)
      this.nodes[i].unit = this.nodes[i - 1].unit

    // 頭進入 unit
    this.head().enter(unit)
  }
  
  this.stop = _ => clearInterval(this.goTimer)
  this.go = _ => {
    this.goTimer = setInterval(_ => {
      // 取出方向
      const direction = this.directions.shift() || this.direction

      direction == 38 && this.moveTo(this.head().unit.upUnit)
      direction == 40 && this.moveTo(this.head().unit.downUnit)
      direction == 37 && this.moveTo(this.head().unit.leftUnit)
      direction == 39 && this.moveTo(this.head().unit.rightUnit)
    }, 150)
  }
  this.pushDirections = direction => {
    direction == 38 && this.direction != 40 && this.directions.push(this.direction = 38)
    direction == 40 && this.direction != 38 && this.directions.push(this.direction = 40)
    direction == 39 && this.direction != 37 && this.directions.push(this.direction = 39)
    direction == 37 && this.direction != 39 && this.directions.push(this.direction = 37)
  }

  this.eatFood(unit)
}

// 蛇的節點物件
function SnakeNode(unit) {
  this.enter(unit)
}
SnakeNode.prototype.enter = function(unit) {
  this.unit = unit.enter(this)
  return this
}
SnakeNode.prototype.leave = function() {
  this.unit.leave()
  return this
}

$(_ => {

  // 產生地圖
  const map = bind(create2DArr(10, 10).map(row => row.map(column => new Unit())))

  // 加入網頁
  $('#feature').append(
    $('<div />').addClass('map').append(
      map.map(units => $('<div />').addClass('units').append(
        units.map(unit => unit.$el)))))

  // 初始一隻蛇，放到地圖上，並且給予起始點
  const snake = new Snake(map, map[0][0])
  snake.moveTo(map[0][1])

  // 蛇要記錄所有按下的方向
  $(window).keyup(e => snake.pushDirections(e.keyCode))

  // 蛇開始跑
  snake.go()

  const $tab = $('#tab')
  const $label = $tab.find('>label')
  $label.click(function() { $tab.attr('data-index', $label.index($(this))) }).eq(2).click()

})

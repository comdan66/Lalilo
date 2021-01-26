/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

function Clock($el, size, padding = 20) {
  this.top = size / 2
  this.left = size / 2
  this.size = size
  this.padding = padding

  this.$el = $el.css({
    position: 'relative',
    width: size,
    height: size
  })

  this.dot = 5
  this.digital = 30

  Array.apply(null, new Array(60)).forEach((_, i) => $('<i />').css(this.style(this.dot, (this.size - this.padding - this.dot) / 2 - this.digital, parseFloat((90 - i * 6) * Math.PI / 180))).appendTo($el))
  Array.apply(null, new Array(12)).forEach((_, i) => $('<span />').attr('text', (i + 11) % 12 + 1).css(this.style(this.digital, (this.size - this.padding - this.digital) / 2, parseFloat((90 - i * 6 * 5) * Math.PI / 180))).appendTo($el))

  this.secs  = Clock.Pointer.call(this, 1, { size: 4, space: 10, total: 44, class: 'sec' }).val(0)
  this.mins  = Clock.Pointer.call(this, 1, { size: 6, space: 20, total: 40, class: 'min' }).val(0)
  this.hours = Clock.Pointer.call(this, 5, { size: 7, space: 50, total: 36, class: 'hour' }).val(0)

  setInterval(_ => this.go(), 1000, this.go())
}

Clock.prototype.go = function() {
  const date = new Date()
  this.secs.val(date.getSeconds())
  this.mins.val(date.getMinutes() + date.getSeconds() / 60)
  this.hours.val(date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600)
}
Clock.prototype.style = function(size, radius, angle) {
  return {
    position: 'absolute', width: size, height: size,
    top: parseFloat(this.top - size / 2 - radius * Math.sin(angle)),
    left: parseFloat(this.left - size / 2 + radius * Math.cos(angle)),
  }
}

Clock.Pointer = function(...argvs) {
  if (this instanceof Clock)
    return new Clock.Pointer(this, ...argvs)

  this.clock = argvs.shift()
  this.multiple = argvs.shift() || 1

  const { size, space, total, class: c } = argvs.shift()
  this.$els = Array.apply(null, new Array(total)).map((_, i) => $('<u />').addClass(c).attr('text', i + 1).data('radius', i * (this.clock.size - this.clock.padding - (this.clock.digital + this.clock.dot + space) * 2) / 2 / total).data('size', size).appendTo(this.clock.$el))
}

Clock.Pointer.prototype.val = function(val) {
  return this.$els.forEach($sec => $sec.css(this.clock.style($sec.data('size'), $sec.data('radius'), parseFloat((90 - val * this.multiple * 6) * Math.PI / 180)))), this 
}

$(function() {
  $('#clock').each(function() { new Clock($(this), 360) })
})

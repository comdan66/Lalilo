/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

function Clock($el, size) {
  this.top = size / 2
  this.left = size / 2

  this.$el = $el.css({
    position: 'relative',
    width: size,
    height: size
  })

  const dot = { size: 5, radius: 160 }
  const digital = { size: 30, radius: 180 }

  Array.apply(null, new Array(60)).forEach((_, i) => $('<i />').css(this.style(dot, parseFloat((90 - i * 6) * Math.PI / 180))).appendTo($el))
  Array.apply(null, new Array(12)).forEach((_, i) => $('<span />').attr('text', (i + 11) % 12 + 1).css(this.style(digital, parseFloat((90 - i * 6 * 5) * Math.PI / 180))).appendTo($el))

  this.secs  = Pointer.call(this, 1, { size: 4, radius: 140, total: 40, class: 'sec' }).val(0)
  this.mins  = Pointer.call(this, 1, { size: 4, radius: 100, total: 36, class: 'min' }).val(0)
  this.hours = Pointer.call(this, 5, { size: 4, radius: 80, total: 32, class: 'hour' }).val(0)

  setInterval(_ => this.go(), 1000, this.go())
}

Clock.prototype.go = function() {
  const date = new Date()
  this.secs.val(date.getSeconds())
  this.mins.val(date.getMinutes() + date.getSeconds() / 60)
  this.hours.val(date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600)    
}
Clock.prototype.style = function({ size, radius }, angle) {
  return {
    position: 'absolute', width: size, height: size,
    top: parseFloat(this.top - size / 2 - radius * Math.sin(angle)),
    left: parseFloat(this.left - size / 2 + radius * Math.cos(angle)),
  }
}

const Pointer = function(...argvs) {
  if (this instanceof Clock)
    return new Pointer(this, ...argvs)

  this.clock = argvs.shift()
  this.multiple = argvs.shift() || 1

  const { size, radius, total, class: c } = argvs.shift()
  this.$els = Array.apply(null, new Array(total)).map((_, i) => $('<u />').addClass(c).attr('text', i + 1).data('radius', i * radius / total).data('size', size).appendTo(this.clock.$el))
}

Pointer.prototype.val = function(val) {
  return this.$els.forEach($sec => $sec.css(this.clock.style($sec.data(), parseFloat((90 - val * this.multiple * 6) * Math.PI / 180)))), this 
}

$(function() {
  $('#clock').each(function() { new Clock($(this), 400) })
})

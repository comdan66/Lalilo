/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

Vue.component('clock', {
  props: {
    size: {
      type: Number,
      default: 200
    },
    padding: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      date: new Date(),

      style: {
        position: 'relative',
        width: this.size + 'px',
        height: this.size + 'px'
      },

      top: this.size / 2,
      left: this.size / 2,

      dot: {
        size: 5,
        els: []
      },
      digital: {
        size: 30,
        els: []
      },

      pointer: {
        sec: { size: 4, total: 44, multiple: 1, space: 10 },
        min: { size: 6, total: 40, multiple: 1, space: 20 },
        hour: { size: 7, total: 36, multiple: 5, space: 50 },
        style: (setting, value) => Array.apply(null, new Array(setting.total)).map((_, i) => this.genStyle(setting.size, i * (this.size - this.padding - (this.digital.size + this.dot.size + setting.space) * 2) / 2 / setting.total, parseFloat((90 - value * 6 * setting.multiple) * Math.PI / 180)))
      }
    }
  },
  mounted () {
    this.dot.els     = Array.apply(null, new Array(60)).map((_, i) => this.genStyle(this.dot.size,     (this.size - this.padding - this.dot.size) / 2 - this.digital.size, parseFloat((90 - i * 6) * Math.PI / 180)))
    this.digital.els = Array.apply(null, new Array(12)).map((_, i) => this.genStyle(this.digital.size, (this.size - this.padding - this.digital.size) / 2, parseFloat((90 - i * 6 * 5) * Math.PI / 180), (i + 11) % 12 + 1))
    setInterval(_ => this.date = new Date(), 1000)
  },
  methods: {
    genStyle (size, radius, angle, text = '') {
      return {
        text,
        style: {
          position: 'absolute', width: size + 'px', height: size + 'px',
          top: parseFloat(this.top - size / 2 - radius * Math.sin(angle)) + 'px',
          left: parseFloat(this.left - size / 2 + radius * Math.cos(angle)) + 'px',
        },
      }
    }
  },
  computed: {
    secs () { return this.pointer.style(this.pointer.sec, this.date.getSeconds()) },
    mins () { return this.pointer.style(this.pointer.min, this.date.getMinutes() + this.date.getSeconds() / 60) },
    hours () { return this.pointer.style(this.pointer.hour, this.date.getHours() + this.date.getMinutes() / 60 + this.date.getSeconds() / 3600) }
  },
  template: El.render(`
    div#clock => :style=style
      i    => *for=(el, i) in dot.els       :key=i   :style=el.style   :text=el.text
      span => *for=(el, i) in digital.els   :key=i   :style=el.style   :text=el.text

      u.sec => *for=(sec, i) in secs   :key=i   :style=sec.style   :text=sec.text
      u.min => *for=(min, i) in mins   :key=i   :style=min.style   :text=min.text
      u.hour => *for=(hour, i) in hours   :key=i   :style=hour.style   :text=hour.text`)
})

Load.init({
  template: El.render(`
    main#app
      clock => :size=360`)
})

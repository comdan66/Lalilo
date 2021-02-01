/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

Vue.component('clock', {
  data () {
    return {
      dots: [],
      nums: [],
      s: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
      m: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
      h: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
    }
  },
  mounted () {
    this.dots = Array.apply(null, new Array(60)).map((_, i) => 'n' + i)
    this.nums = Array.apply(null, new Array(12)).map((_, i) => 'n' + i)
    setInterval(this.go, 1000, this.go())
  },
  methods: {
    go () {
      const date = new Date(), sec = date.getSeconds(), min = date.getMinutes(), hour = date.getHours()
      this.s.val = sec
      this.m.val = min + sec / 60
      this.h.val = (hour + min / 60 + sec / 3600) % 12 * 5
    }
  },
  template: El.render(`
    div#clock
      i => *for=(el, i) in dots   :key=i   :text=el   :class=el
      b => *for=(el, i) in nums   :key=i   :text=el   :class=el
      u.h => :class=h.class
      u.m => :class=m.class
      u.s => :class=s.class`)
})

Vue.component('digital', {
  data () {
    return {
      m: '00',
      h: '00',
      n: false
    }
  },
  mounted () {
    setInterval(this.go, 1000, this.go())
  },
  methods: {
    go () {
      const date = new Date(), sec = date.getSeconds(), min = date.getMinutes(), hour = date.getHours(), pod0 = n => (n < 10 ? '0' : '') + n
      this.m = pod0(min).split('')
      this.h = pod0((hour + 11) % 12 + 1).split('')
      this.n = hour > 18 || hour < 7
    }
  },
  template: El.render(`
    div#digital
      span => *text=h[0]
      span => *text=h[1]
      span => *text=':'
      span => *text=m[0]
      span => *text=m[1]
      i => :class={ n }
      `)
})

Load.init({
  data: {
    fullscreen: false,
  },
  mounted () {
  },
  methods: {
    full () {
      if (this.$refs.app.requestFullscreen) return this.fullscreen = true, this.$refs.app.requestFullscreen()
      if (this.$refs.app.msRequestFullscreen) return this.fullscreen = true, this.$refs.app.msRequestFullscreen()
      if (this.$refs.app.mozRequestFullScreen) return this.fullscreen = true, this.$refs.app.mozRequestFullScreen()
      if (this.$refs.app.webkitRequestFullscreen) return this.fullscreen = true, this.$refs.app.webkitRequestFullscreen()
    },
    exit () {
      if (document.exitFullscreen) return this.fullscreen = false, document.exitFullscreen()
      if (document.msExitFullscreen) return this.fullscreen = false, document.msExitFullscreen()
      if (document.mozExitFullScreen) return this.fullscreen = false, document.mozExitFullScreen()
      if (document.webkitExitFullscreen) return this.fullscreen = false, document.webkitExitFullscreen()
    },
    screen () {
      this.fullscreen ? this.exit() : this.full()
    }
  },
  template: El.render(`
    div#app => ref=app   :class={full: fullscreen}
      clock
      digital

      label#screen => @click=screen

      `)
})

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */

Vue.component('clock', {
  props: {
  },
  data () {
    return {
      dots: [],
      nums: [],
      s: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
      m: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
      h: { $: 0, ani: true, set val (v) { return this.$ != v ? v != 0 ? this.$ = v : setTimeout(_ => setTimeout(_ => this.ani = true, 100, this.ani = false, this.$ = 0), 550, this.$ = 60) : null }, get class () { return 'n' + parseInt(this.$, 10) + (this.ani ? ' ani' : '') } },
      i: 57
    }
  },
  mounted () {
    this.dots     = Array.apply(null, new Array(60)).map((_, i) => 'n' + i)
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
  computed: {
  },
  template: El.render(`
    div#clock
      i => *for=(el, i) in dots   :key=i   :text=el   :class=el
      b => *for=(el, i) in nums   :key=i   :text=el   :class=el
      u.h => :class=h.class
      u.m => :class=m.class
      u.s => :class=s.class`)
})

Load.init({
  template: El.render(`
    main#app
      clock`)
})

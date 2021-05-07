"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */$(function(){$(".show-box").each(function(){var a=$(this);a.attr("data-index",1),a.attr("data-page",1);for(var b=a.data("unit"),c=a.find(".points"),d=a.find(".box-container .box"),e=Math.ceil(d.length/b),f=0;f<e;f++)c.append($("<label />").click(function(){a.attr("data-page",$(this).index()+1)}));// 左邊箭頭
// 右邊箭頭
// 點擊小框框
a.find(".left").click(function(){var b=parseInt(a.attr("data-page"),10)-1;a.attr("data-page",1>b?e:b)}),a.find(".right").click(function(){var b=parseInt(a.attr("data-page"),10)+1;a.attr("data-page",b>e?1:b)}),d.click(function(){a.attr("data-index",$(this).index()+1)})})});
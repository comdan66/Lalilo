"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */$(function(){$(".banner2").each(function(){var a=$(this),b=a.find(".prev"),c=a.find(".next"),d=a.find("input"),e=a.find(".box").length,f=Math.ceil(e/6),g=function(b){return parseInt(a.attr("p"),10)+b},h=function(b){return d.val(a.attr("p",b).attr("p"))};d.keyup(function(){var a=g(0);h(isNaN(a)||a>f||1>f?1:a)}),b.click(function(){var a=g(-1);h(1>a?f:a)}),c.click(function(){var a=g(1);h(a>f?1:a)}),a.find(".first").click(function(){return h(1)}),a.find(".last").click(function(){return h(f)}),a.find(".left").click(function(){return b.click()}),a.find(".right").click(function(){return c.click()}),a.find(".page").text(f),h(1)})});
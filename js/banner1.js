"use strict";/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2021, Lalilo
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */$(function(){$(".banner1").each(function(){var a=$(this),b=a.find(".bottom").empty(),c=a.find(".box").length,d=Math.ceil(c/3),e=function(b){return parseInt(a.attr("p"),10)+b},f=function(b){return a.attr("p",b)};a.find(".left").click(function(){var a=e(-1);f(1>a?d:a)}),a.find(".right").click(function(){var a=e(1);f(a>d?1:a)});for(var g=0;g<d;g++)b.append($("<label />").click(function(){f($(this).index()+1)}));f(1)})});
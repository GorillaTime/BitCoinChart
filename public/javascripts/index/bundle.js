/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buf = {};
buf['bitflyer'] = [[], []]; // バッファを用意
var ws = new WebSocket('wss://ws.lightstream.bitflyer.com/json-rpc');
ws.onopen = function () {
  ws.send(JSON.stringify({ // 購読リクエストを送信
    method: "subscribe",
    params: {
      channel: "lightning_executions_BTC_JPY" // executions BTCJPY
    }
  }));
};
ws.onmessage = function (msg) {
  // メッセージ更新時のコールバック
  var response = JSON.parse(msg.data);
  response.params.message.forEach(function (data) {
    buf['bitflyer'][data.side === 'BUY' ? 0 : 1].push({
      x: data.exec_date, // タイムスタンプ
      y: data.price // 価格（日本円）
    });
  });
};

var id = 'bitflyer';
var ctx = document.getElementById(id).getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      data: [],
      label: 'Buy', // 買い取引データ
      borderColor: 'rgb(54, 162, 235)', // 線の色
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // 塗りの色
      fill: false, // 塗りつぶさない
      lineTension: 0 // 直線
    }, {
      data: [],
      label: 'Sell', // 売り取引データ
      borderColor: 'rgb(255, 99, 132)', // 線の色
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // 塗りの色
      fill: false, // 塗りつぶさない
      lineTension: 0 // 直線
    }]
  },
  options: {
    title: {
      text: 'BTC/JPY (' + id + ')', // チャートタイトル
      display: true
    },
    scales: {
      xAxes: [{
        type: 'realtime' // X軸に沿ってスクロール
      }]
    },
    plugins: {
      streaming: {
        duration: 300000, // 300000ミリ秒（5分）のデータを表示
        onRefresh: function onRefresh(chart) {
          // データ更新用コールバック
          Array.prototype.push.apply(chart.data.datasets[0].data, buf[id][0]); // 買い取引データをチャートに追加
          Array.prototype.push.apply(chart.data.datasets[1].data, buf[id][1]); // 売り取引データをチャートに追加
          buf[id] = [[], []]; // バッファをクリア
        }
      }
    }
  }
});
/** 
var config = require('../config.js');
var Twitter = require('node-tweet-stream'),
t = new Twitter({
  consumer_key:         config.twitter.key,
  consumer_secret:      config.twitter.key_secret,
  token:         config.twitter.token,
  token_secret:  config.twitter.token_secret,
});

t.on('tweet', function (tweet) {
  //console.log('tweet received', tweet)
  //console.log((JSON.stringify(tweet.text)))
  if(!(tweet.retweeted === 'true')){
    console.log(tweet.text)
  }
});

t.on('error', function (err) {
  console.log('Oh no')
});

t.track('bitcoin')

// 10 minutes later

*/

/***/ })
/******/ ]);
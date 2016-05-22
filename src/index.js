require('./main.less');
require('./style.css');
let img = require('./demo.png');

//新增类型 import Class
import React from 'react'
import ReactDOM from 'react-dom'

import People from './js/es6/People';

let p = new People('no1001.cc',20);

console.log( p.say() );

//新增类型 
//let 块级 
//const 常量 块级

const user = { 
	baisc: {},
	username: 'yliang',
	age: 20
}

// 操作符 =>

var constantize = (obj) => {
	Object.freeze(obj)
		Object.keys(obj).forEach( (key, value) => {
			if( typeof obj[key] === 'object'){
				constantize( obj[key])
			}
		})
}
//constantize(user)

user.baisc.length = 2;

var es_temple = document.getElementById('es_temple');

//新增模版字符串
//反引号 ｀｀

es_temple.innerHTML = `
There are <b>${user.baisc.length}</b> items
in you basket,
   are on sale!		
   `;

   img = document.getElementById('target_image');

   console.log(img);

   if(img){
	   img.setAttribute('data-sign','imgasset');
	   //img.setAttribute('src','')
	   loadImageAsync('/src/demo.png').then(function(image){
		   console.log('then')
		   img.src = image.src	
	   },function(msg){
		   console.log(msg)	
	   })
	   //img.setAttribute('src','./demo.png');

   }

//Promise
function loadImageAsync(url){
	return new Promise(function(resolve, reject){
		var image = new Image()

		image.onload = function(){
			console.log('onload')
		resolve(image)
		}
	image.onerror = function(){
		reject(new Error('Could not load image at'+url))
	}
	setTimeout(function(){
		image.src = url	
	},10000)
	})
}

// tutorial1.js
var CommentBox = React.createClass({
	render: function() {
				return (
					<div className="commentBox">
					Hello, world! I am a CommentBox.
					</div>
					);  
			}   
});
ReactDOM.render(<CommentBox />,document.getElementById('es_temple'));

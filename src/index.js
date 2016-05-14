require('./main.less');
require('./style.css');
require('./demo.png');

import People from './js/es6/People';

let p = new People('no1001.cc',20);

console.log( p.say() );

var img = document.getElementById('target_image');
console.log(img);

if(img){
	img.setAttribute('data-sign','imgasset');
	img.setAttribute('src','./demo.png');
}

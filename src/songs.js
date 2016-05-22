import Songs from './js/es6/Songs' 
import People from './js/es6/People';
import React from 'react'
import ReactDOM from 'react-dom'

let song = new Songs();
let people = new People('fyl',34)

console.log( people.say() )
console.log( song.show() )

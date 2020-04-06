import React, {useState} from 'react'
import SnakeBody from './SnakeBody';
import Food from './Food';
import GridBlock from './GridBlock';



export default function() {
	const grid = initializeMap();
	// console.log(grid[3][3]);
	const snake = [{x: 3, y:3}];

	placeSnake(grid, snake);

	document.addEventListener('keydown', onInput);

	return (
		<div className="main-map">
			{grid}
		</div>
	)
}

function onInput({keyCode}){
	switch(keyCode) {
			case 37:
				return console.log('left');
				break;
			case 38:
				return console.log('up');
				break;    
			case 39:
				return console.log('right');
				break;
			case 40:
				return console.log('down');
				break;
			default:
				break;            
			}
}

function placeSnake(map, snake){
	snake.forEach(({x, y}) => map[x][y] = <SnakeBody key={Math.random()}/>);
	return map;
}

function initializeMap(){
	const grid = [];
		for(let i=0; i<16; i++){
			grid[i] = [];
			for(let j=0; j<16; j++){
				grid[i][j] = <GridBlock key={Math.random()} />;
			}
		}
	return grid;
}
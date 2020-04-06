import React, { useState, useEffect, useRef } from 'react';
import SnakeBody from './SnakeBody';
import Food from './Food';
import GridBlock from './GridBlock';

export default function() {
	const [ direction, setDirection ] = useState('right');
	const [ grid, setGrid ] = useState(initializeMap());
	const [ snake, setSnake ] = useState([ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ]);
	const [ food, setFood ] = useState(repositionFood());

	placeFood(grid, food);
	placeSnake(grid, snake);

	document.addEventListener('keydown', (e) => onInput(e, setDirection));

	// console.log('direction is: ', direction);

	function moveSnake() {
		//snake, food, func
		console.log('called');
		const newHead = {};
		switch (direction) {
			case 'right':
				newHead.x = snake[0].x;
				newHead.y = snake[0].y + 1;
				break;
			case 'left':
				newHead.x = snake[0].x;
				newHead.y = snake[0].y - 1;
				break;
			case 'up':
				newHead.x = snake[0].x - 1;
				newHead.y = snake[0].y;
				break;
			case 'down':
				newHead.x = snake[0].x + 1;
				newHead.y = snake[0].y;
				break;
		}
		const newSnake = [ newHead, ...snake ];
		newSnake.pop(); //depending on whether or not it encountered food

		setSnake(newSnake);
		setGrid(initializeMap());
		placeSnake(grid, snake);
		placeFood(grid, food);
	}

	useInterval(moveSnake, 300);

	function useInterval(callback, delay) {
		const savedCallback = useRef();

		// Remember the latest callback.
		useEffect(
			() => {
				savedCallback.current = callback;
			},
			[ callback ]
		);

		// Set up the interval.
		useEffect(
			() => {
				function tick() {
					savedCallback.current();
				}
				if (delay !== null) {
					let id = setInterval(tick, delay);
					return () => clearInterval(id);
				}
			},
			[ delay ]
		);
	}

	const gameMap = grid.map((item) => item);

	return <div className="main-map">{gameMap}</div>;
}

//utility functions

function placeFood(map, food) {
	map[food.x][food.y] = <Food key={Math.random()} />;
	return map;
}

function repositionFood() {
	const x = Math.floor(Math.random() * 16);
	const y = Math.floor(Math.random() * 16);
	return { x, y };
}

function placeSnake(map, snake) {
	snake.forEach(({ x, y }) => (map[x][y] = <SnakeBody key={Math.random()} />));
	return map;
}

function initializeMap() {
	const grid = [];
	for (let i = 0; i < 16; i++) {
		grid[i] = [];
		for (let j = 0; j < 16; j++) {
			grid[i][j] = <GridBlock key={Math.random()} />;
		}
	}
	return grid;
}

function onInput({ keyCode }, func) {
	switch (keyCode) {
		case 37: //left
			return func('left');
		case 38: //up
			return func('up');
		case 39: //right
			return func('right');
		case 40: //down
			return func('down');
		default:
			break;
	}
}

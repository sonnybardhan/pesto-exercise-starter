import React, { useState, useEffect, useRef } from 'react';
import SnakeBody from './SnakeBody';
import Food from './Food';
import GridBlock from './GridBlock';

export default function() {
	const [ score, setScore ] = useState(0);
	const [ direction, setDirection ] = useState('right');
	const [ grid, setGrid ] = useState(initializeMap());
	const [ snake, setSnake ] = useState([ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ]);
	const [ food, setFood ] = useState(repositionFood());
	const [ time, setTime ] = useState(270);

	placeFood(grid, food);
	placeSnake(grid, snake);

	document.addEventListener('keydown', (e) => onInput(e, direction, setDirection));

	function gameOver() {
		setScore(0);
		setFood(repositionFood());
		setSnake([ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ]);
		setGrid(initializeMap());
		placeSnake(grid, snake);
		placeFood(grid, food);
	}

	function repositionSnake() {
		const newHead = newPosition(direction, snake);
		const newSnake = [ newHead, ...snake ];

		if (!proceed(newHead, snake, outOfBounds, collidedWithSelf)) {
			alert('game over! ', score);
			gameOver();
		}

		if (ateFood(newHead, food)) {
			setScore(score + 5);
			setFood(repositionFood());
			setTime(time - 10);
			console.log(time);
		} else {
			newSnake.pop(); //depending on whether or not it encountered food
		}

		setSnake(newSnake);
		setGrid(initializeMap());
		placeSnake(grid, snake);
		placeFood(grid, food);
	}

	useInterval(repositionSnake, time);

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

	return (
		<div className="">
			<p>Score: {score}</p>
			<div className="main-map">{grid}</div>;
		</div>
	);
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

function onInput({ keyCode }, direction, func) {
	switch (keyCode) {
		case 37: //left
			if (direction !== 'right') return func('left');
		case 38: //up
			if (direction !== 'down') return func('up');
		case 39: //right
			if (direction !== 'left') return func('right');
		case 40: //down
			if (direction !== 'up') return func('down');
		default:
			break;
	}
}

function outOfBounds(x, y) {
	if (x < 0 || x > 15 || y < 0 || y > 15) return true;
	return false;
}

function collidedWithSelf(x, y, snake) {
	snake.forEach((segment) => {
		if (segment.x === x && segment.y === y) return true;
	});
	return false;
}

function proceed({ x, y }, snake, func1, func2) {
	return !func1(x, y) && !func2(x, y, snake);
}

function ateFood({ x, y }, food) {
	if (x === food.x && y === food.y) return true;
	return false;
}

function newPosition(direction, snake) {
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
	return newHead;
}

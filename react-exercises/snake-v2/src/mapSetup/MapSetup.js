import React from 'react';

export default function() {
	return {
		placeSnake(grid, snake) {
			snake.forEach(({ x, y }) => {
				grid[x][y] = <div className="snake-segment" key={Math.random()} />;
			});
		},
		placeFood(grid, food) {
			grid[food.x][food.y] = <div className="food" key={Math.random()} />;
		},
		init() {
			const grid = [];
			for (let i = 0; i < 16; i++) {
				grid[i] = [];
				for (let j = 0; j < 16; j++) {
					grid[i][j] = <div className="grid-block" key={Math.random()} />;
				}
			}
			return grid;
		},
		nextPosition(direction, snake) {
			const newHead = { ...snake[0] };
			switch (direction) {
				case 'right':
					newHead.y += 1;
					break;
				case 'left':
					newHead.y -= 1;
					break;
				case 'up':
					newHead.x -= 1;
					break;
				case 'down':
					newHead.x += 1;
					break;
				default:
					break;
			}
			return newHead;
		}
	};
}

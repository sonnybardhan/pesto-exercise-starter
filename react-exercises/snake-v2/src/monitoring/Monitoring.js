// import React from 'react';

export default function() {
	return {
		saveBestScore(setBestScore, score) {
			setBestScore((prev) => (score > prev ? score : prev));
		},
		outOfBounds({ x, y }) {
			return x < 0 || x > 15 || y < 0 || y > 15;
		},
		selfCollision({ x, y }, snake) {
			for (let segment of snake) {
				if (segment.x === x && segment.y === y) {
					return true;
				}
			}
			return false;
		},
		randomPosition() {
			return {
				x: Math.floor(Math.random() * 16),
				y: Math.floor(Math.random() * 16)
			};
		}
	};
}

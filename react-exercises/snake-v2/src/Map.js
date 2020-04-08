import React, { useState, useEffect, useRef } from 'react';

const Map = () => {
	const initialRows = init();
	const initialSnake = [ { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 } ];
	const initialDirection = 'right';
	const key = 'snakeGame';

	const [ score, setScore ] = useState(0);
	const [ rows, setRows ] = useState(initialRows);
	const [ snake, setSnake ] = useState(initialSnake);
	const [ direction, setDirection ] = useState(initialDirection);
	const [ food, setFood ] = useState(randomPosition);
	const [ timeInterval, setTimeInterval ] = useState(150);
	const [ gameRunning, setGameRunning ] = useState(false);
	const [ bestScore, setBestScore ] = useState(getScoreFromLS(key));
	const [ message, setMessage ] = useState('');

	useEffect(
		() => {
			if (bestScore) {
				saveScoreInLS(key, bestScore);
			}
		},
		[ bestScore ]
	);

	const keyboardInput = ({ keyCode }) => {
		switch (keyCode) {
			case 32:
				setGameRunning(true);
				break;
			case 37:
				if (direction === 'right') {
					break;
				} else {
					setDirection('left');
					break;
				}
			case 38:
				if (direction === 'down') {
					break;
				} else {
					setDirection('up');
					break;
				}
			case 39:
				if (direction === 'left') {
					break;
				} else {
					setDirection('right');
					break;
				}
			case 40:
				if (direction === 'up') {
					break;
				} else {
					setDirection('down');
					break;
				}
			default:
				break;
		}
	};

	document.addEventListener('keydown', keyboardInput);

	const placeSnake = () => {
		const newRows = initialRows;
		snake.forEach(({ x, y }) => {
			newRows[x][y] = 'snake';
		});
		placeFood(newRows);
		setRows(newRows);
	};

	const placeFood = (newRows) => {
		newRows[food.x][food.y] = 'food';
		return newRows;
	};

	const moveSnake = () => {
		const newHead = nextPosition(direction, snake);
		const newSnake = [ newHead, ...snake ];

		if (outOfBounds(newHead)) {
			console.log('Out of bounds');
			saveBestScore();
			setMessage(`Oops! Game over! Your last score was ${score}`);
			return gameReset();
		}

		if (selfCollision(newHead)) {
			console.log('Self collision!');
			setMessage(`Oops! Game over! Your last score was ${score}`);
			saveBestScore();
			return gameReset();
		}

		if (newHead.x === food.x && newHead.y === food.y) {
			setScore(score + 5);
			setFood(randomPosition);
			setTimeInterval(timeInterval - 2);
		} else {
			newSnake.pop();
		}
		setSnake(newSnake);
		placeSnake();
	};

	function outOfBounds({ x, y }) {
		return x < 0 || x > 15 || y < 0 || y > 15;
	}

	function selfCollision({ x, y }) {
		for (let segment of snake) {
			if (segment.x === x && segment.y === y) {
				return true;
			}
		}
		return false;
	}
	function saveBestScore() {
		setBestScore((prev) => (score > prev ? score : prev));
	}
	useInterval(moveSnake, timeInterval, gameRunning);

	const displayMap = printMap(rows);

	function gameReset() {
		setScore(0);
		setRows(init);
		setSnake(initialSnake);
		setDirection('right');
		setFood(randomPosition);
		setTimeInterval(150);
		setGameRunning(false);
	}

	function playPause() {
		setGameRunning(!gameRunning);
	}

	return (
		<div className="">
			<h1 style={{ textAlign: 'center' }}>Snake!</h1>
			<h2>
				<span>Score: {score}</span>
			</h2>
			<div className="main-map">
				{gameRunning ? (
					displayMap
				) : (
					<div>
						<h3 style={{ textAlign: 'center' }}>{message ? message : null}</h3>
						<h2 style={{ textAlign: 'center' }}>PRESS SPACEBAR TO BEGIN</h2>
					</div>
				)}
			</div>
			<h2 style={{ textAlign: 'right' }}>
				<span>Best: {bestScore ? `${bestScore}` : 0}</span>
			</h2>
		</div>
	);
};

export default Map;

function getScoreFromLS(key) {
	const storage = localStorage.getItem(key);
	if (storage) return JSON.parse(storage).score;
	return 0;
}

function saveScoreInLS(key, bestScore) {
	localStorage.setItem(key, JSON.stringify({ score: bestScore }));
}

const printMap = (rows) => {
	return rows.map((row) => (
		<div key={Math.random()} className="grid-row">
			{row.map((e) => {
				switch (e) {
					case 'blank':
						return <div className="grid-block" key={Math.random()} />;
					case 'snake':
						return <div className="snake-segment" key={Math.random()} />;
					case 'food':
						return <div className="food" key={Math.random()} />;
					default:
						break;
				}
			})}
		</div>
	));
};

const init = (side = 16) => {
	const initialRows = [];
	for (let i = 0; i < side; i++) {
		initialRows[i] = [];
		for (let j = 0; j < side; j++) {
			initialRows[i][j] = 'blank';
		}
	}
	return initialRows;
};

const randomPosition = () => {
	return {
		x: Math.floor(Math.random() * 16),
		y: Math.floor(Math.random() * 16)
	};
};

function nextPosition(direction, snake) {
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

function useInterval(callback, delay, gameRunning) {
	const savedCallback = useRef();
	useEffect(
		() => {
			savedCallback.current = callback;
		},
		[ callback ]
	);

	useEffect(
		() => {
			function tick() {
				savedCallback.current();
			}
			if (delay !== null && gameRunning && delay !== 0) {
				let id = setInterval(tick, delay);
				return () => clearInterval(id);
			} else {
				console.log('game paused');
			}
		},
		[ delay, gameRunning ]
	);
}

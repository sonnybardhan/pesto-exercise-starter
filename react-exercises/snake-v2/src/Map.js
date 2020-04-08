import React, { useState, useEffect, useRef } from 'react';

const Map = () => {
	const initialRows = init();
	const initialSnake = [ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ];
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
	const [ started, setStarted ] = useState(false);

	useEffect(
		() => {
			if (bestScore) {
				saveScoreInLS(key, bestScore);
			}
		},
		[ bestScore ]
	);

	useEffect(
		() => {
			document.addEventListener('keydown', keyboardInput);
			return () => {
				document.removeEventListener('keydown', keyboardInput);
			};
		},
		[ direction ]
	);

	// const keyboardInput = ({ keyCode }, setGameRunning, setDirection) => {
	const keyboardInput = ({ keyCode }) => {
		switch (keyCode) {
			case 32:
				return setGameRunning((prevState) => {
					if (!started) {
						setStarted(true);
					}
					return !prevState;
				});
			case 37:
				if (direction !== 'right') return setDirection('left');
			case 38:
				if (direction !== 'down') return setDirection('up');
			case 39:
				if (direction !== 'left') return setDirection('right');
			case 40:
				if (direction !== 'up') return setDirection('down');
			default:
				break;
		}
	};

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
			setStarted(false);
			saveBestScore();
			setMessage(score);
			return gameReset();
		}

		if (selfCollision(newHead)) {
			console.log('Self collision!');
			setStarted(false);
			setMessage(score);
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
						<h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>{message ? 'Game over!' : null}</h1>
						<h2 style={{ textAlign: 'center' }}>{message ? `You scored ${message}` : null}</h2>
						<h2 style={{ textAlign: 'center' }}>PRESS SPACEBAR TO {started ? 'RESUME' : 'PLAY'}</h2>
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

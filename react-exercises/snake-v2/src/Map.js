import React, { useState, useEffect, useRef } from 'react';

const Map = () => {
	const initialMap = init();
	const initialSnake = [ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ];
	const initialDirection = 'right';
	const key = 'snakeGame';

	const [ score, setScore ] = useState(0);
	const [ rows, setRows ] = useState(initialMap);
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

	const keyboardInput = ({ keyCode }) => {
		switch (keyCode) {
			case 27: //escape
				return gameReset();
			case 32: //space
				return setGameRunning((prevState) => {
					if (!started) {
						setStarted(true);
					}
					return !prevState;
				});
			case 37: //left
				if (direction !== 'right') return setDirection('left');
			case 38: //up
				if (direction !== 'down') return setDirection('up');
			case 39: //right
				if (direction !== 'left') return setDirection('right');
			case 40: //down
				if (direction !== 'up') return setDirection('down');
			default:
				break;
		}
	};

	// const placeSnake = () => {
	// 	snake.forEach(({ x, y }) => {
	// 		// initialMap[x][y] = 'snake';
	// 		initialMap[x][y] = <div className="snake-segment" key={Math.random()} />;
	// 	});
	// 	placeFood(initialMap);
	// 	setRows(initialMap);
	// };

	// const placeFood = (initialMap) => {
	// 	// initialMap[food.x][food.y] = 'food';
	// 	initialMap[food.x][food.y] = <div className="food" key={Math.random()} />;
	// 	return initialMap;
	// };

	const placeSnake = () => {
		const newRows = initialMap;
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

		if (outOfBounds(newHead)) return onCrash();

		if (selfCollision(newHead, snake)) return onCrash();

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

	function onCrash() {
		setStarted(false);
		saveBestScore(setBestScore, score);
		setMessage(score);
		return gameReset();
	}

	useInterval(moveSnake, timeInterval, gameRunning);

	function gameReset() {
		setScore(0);
		setRows(init);
		setSnake(initialSnake);
		setDirection('right');
		setFood(randomPosition);
		setStarted(false);
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
					printMap(rows)
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

function saveBestScore(setBestScore, score) {
	setBestScore((prev) => (score > prev ? score : prev));
}

function outOfBounds({ x, y }) {
	return x < 0 || x > 15 || y < 0 || y > 15;
}

function selfCollision({ x, y }, snake) {
	for (let segment of snake) {
		if (segment.x === x && segment.y === y) {
			return true;
		}
	}
	return false;
}

function getScoreFromLS(key) {
	const storage = localStorage.getItem(key);
	if (storage) return JSON.parse(storage).score;
	return 0;
}

function saveScoreInLS(key, bestScore) {
	localStorage.setItem(key, JSON.stringify({ score: bestScore }));
}

// const printMap = (rows) => {
// 	return rows.map((row) => (
// 		<div key={Math.random()} className="grid-row">
// 			{row.map((e) => {
// 				switch (e) {
// 					case 'snake':
// 						return <div className="snake-segment" key={Math.random()} />;
// 					case 'food':
// 						return <div className="food" key={Math.random()} />;
// 					default:
// 						break;
// 				}
// 			})}
// 		</div>
// 	));
// };

// const init = () => {
// 	const initialMap = [];
// 	for (let i = 0; i < 16; i++) {
// 		initialMap[i] = [];
// 		for (let j = 0; j < 16; j++) {
// 			initialMap[i][j] = <div className="grid-block" key={Math.random()} />;
// 		}
// 	}
// 	return initialMap;
// };
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
	const initialMap = [];
	for (let i = 0; i < side; i++) {
		initialMap[i] = [];
		for (let j = 0; j < side; j++) {
			initialMap[i][j] = 'blank';
		}
	}
	return initialMap;
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

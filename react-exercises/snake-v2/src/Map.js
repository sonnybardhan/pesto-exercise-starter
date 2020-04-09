import React, { useState, useEffect, useRef } from 'react';

const Map = () => {
	const initialMap = init();
	const initialSnake = [ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 } ];
	const initialDirection = 'right';
	const key = 'snakeGame';
	const initialFps = 7;

	const [ score, setScore ] = useState(0);
	const [ rows, setRows ] = useState(initialMap);
	const [ snake, setSnake ] = useState(initialSnake);
	const [ direction, setDirection ] = useState(initialDirection);
	const [ food, setFood ] = useState(randomPosition);
	const [ fps, setFps ] = useState(initialFps);
	const [ gameRunning, setGameRunning ] = useState(false);
	const [ bestScore, setBestScore ] = useState(getScoreFromLS(key));
	const [ message, setMessage ] = useState('');
	const [ started, setStarted ] = useState(false);
	// const [timeNow, setTimeNow] = useState(0);

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

	function keyboardInput({ keyCode }) {
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
				break;
			case 38: //up
				if (direction !== 'down') return setDirection('up');
				break;
			case 39: //right
				if (direction !== 'left') return setDirection('right');
				break;
			case 40: //down
				if (direction !== 'up') return setDirection('down');
				break;
			default:
				break;
		}
	}

	const moveSnake = () => {
		const newHead = nextPosition(direction, snake);
		const newSnake = [ newHead, ...snake ];

		if (outOfBounds(newHead) || selfCollision(newHead, snake)) return onCrash();

		if (newHead.x === food.x && newHead.y === food.y) onEat();
		else newSnake.pop();

		setUpFrame(newSnake);
	};

	function onEat() {
		console.log('fps: ', fps);
		setScore(score + 5);
		setFood(randomPosition);
		setFps((prevFps) => (score % 25 === 0 ? prevFps + 0.5 : prevFps));
	}

	function setUpFrame(newSnake) {
		setSnake(newSnake);
		placeSnake(initialMap, snake);
		placeFood(initialMap, food);
		setRows(initialMap);
	}

	function onCrash() {
		setStarted(false);
		saveBestScore(setBestScore, score);
		setMessage(`${score}`);
		return gameReset();
	}

	function gameReset() {
		setScore(0);
		setRows(init);
		setSnake(initialSnake);
		setDirection('right');
		setFood(randomPosition);
		setStarted(false);
		setFps(initialFps);
		setGameRunning(false);
	}

	useAnimation(moveSnake, fps, gameRunning);

	return (
		<div className="">
			<h1 style={{ textAlign: 'center' }}>Snake!</h1>
			<h2>
				<span>Score: {score}</span>
			</h2>
			<div className="main-map">
				{gameRunning ? (
					rows
				) : (
					<div>
						<h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
							{message && !started ? 'Game over!' : null}
						</h1>
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

const placeSnake = (grid, snake) => {
	snake.forEach(({ x, y }) => {
		grid[x][y] = <div className="snake-segment" key={Math.random()} />;
	});
};

const placeFood = (grid, food) => {
	grid[food.x][food.y] = <div className="food" key={Math.random()} />;
};

const init = () => {
	const initialMap = [];
	for (let i = 0; i < 16; i++) {
		initialMap[i] = [];
		for (let j = 0; j < 16; j++) {
			initialMap[i][j] = <div className="grid-block" key={Math.random()} />;
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

function useAnimation(cb, fps, isPlaying) {
	const cbRef = useRef();
	const animationFrameId = useRef();
	const then = useRef(window.performance.now());
	const now = useRef();
	const elapsed = useRef();
	const fpsInterval = useRef(1000 / fps);
	useEffect(
		() => {
			cbRef.current = cb;
		},
		[ cb ]
	);
	useEffect(
		() => {
			function loop() {
				animationFrameId.current = window.requestAnimationFrame(loop);
				now.current = window.performance.now();
				elapsed.current = now.current - then.current;
				if (elapsed.current > fpsInterval.current) {
					then.current = now.current - elapsed.current % fpsInterval.current;
					cbRef.current();
				}
			}
			if (isPlaying) {
				animationFrameId.current = window.requestAnimationFrame(loop);
				return () => {
					window.cancelAnimationFrame(animationFrameId.current);
				};
			}
		},
		[ isPlaying ]
	);
}

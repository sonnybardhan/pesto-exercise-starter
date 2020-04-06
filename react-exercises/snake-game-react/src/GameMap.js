import React from 'react'
import SnakeBody from './SnakeBody';
import Food from './Food';
import GridBlock from './GridBlock';



export default function() {
	const grid = initializeMap();
	

	return (
		<div className="main-map">
			{grid}
		</div>
	)
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
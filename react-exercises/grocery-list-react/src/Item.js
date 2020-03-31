import React, { Fragment } from 'react';

export default function Item({ item, onAdd, onRemove }) {
	function handleAddClick() {
		onAdd(item.id);
	}
	function handleRemoveClick() {
		onRemove(item.id);
	}

	return (
		<Fragment>
			<div>
				<span style={item.quantity ? { color: 'red' } : { color: 'black' }}>{item.name}</span>
				<span style={{ padding: '0 20px' }}>Rs.{item.price}</span>
				<button onClick={handleRemoveClick}>-</button>
				<button onClick={handleAddClick}>+</button>
				<span>{item.quantity}</span>
			</div>
		</Fragment>
	);
}

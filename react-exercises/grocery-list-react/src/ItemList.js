import React from 'react';
import Item from './Item';

export default function ItemList({ groceryList, onAdd, onRemove }) {
	const groceriesArray = groceryList.items.map((item) => (
		<Item key={item.id} item={item} onAdd={onAdd} onRemove={onRemove} />
	));
	return <div>{groceriesArray}</div>;
}

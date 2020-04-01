import React, { Fragment } from 'react';
import ItemList from './ItemList';
import './App.css';
class App extends React.Component {
	state = {
		items: [
			{ id: 1, name: 'Apples', price: '80', quantity: 0 },
			{ id: 2, name: 'Oranges', price: '35', quantity: 0 },
			{ id: 3, name: 'Another fruit', price: '50', quantity: 0 }
		]
	};

	onAdd = (id) => {
		const newItems = this.state.items.map((item) => {
			if (item.id === id) {
				item.quantity += 1;
			}
			return item;
		});
		this.setState({ newItems });
	};

	onRemove = (id) => {
		const newItems = this.state.items.map((item) => {
			if (item.id === id && item.quantity > 0) {
				item.quantity -= 1;
			}
			return item;
		});
		this.setState({ newItems });
	};
	onClear = () => {
		const newList = this.state.items.map((item) => {
			item.quantity = 0;
		});
		this.setState({ newList });
	};
	total = () => {
		return this.state.items.reduce((acc, item) => {
			return acc + Math.floor(item.price * item.quantity * 100) / 100;
		}, 0);
	};
	render() {
		return (
			<Fragment>
				<div className="">
					<h1>The Obvious Grocery store</h1>
				</div>
				<div className="App">
					<ItemList groceryList={this.state} onAdd={this.onAdd} onRemove={this.onRemove} />
				</div>
				<div className="div">
					<button id="clearBtn" onClick={this.onClear}>
						Clear cart
					</button>
				</div>
				<div className="div">Cart total: Rs. {this.total()}</div>
			</Fragment>
		);
	}
}

export default App;

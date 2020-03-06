const path = require('path');
const fs = require('fs');

const fileContent = fs.readFileSync(path.join(__dirname, 'dataset.json'), 'utf-8');

const { bankBalances } = JSON.parse(fileContent);

function hundredThousandairs() {
	const newData = bankBalances.filter((account) => parseFloat(account.amount) > 100000);
	return newData;
}

function datasetWithRoundedDollar() {
	const newData = bankBalances.map((account) => {
		account.rounded = Math.round(parseFloat(account.amount));
		return account;
	});
	return newData;
}

function sumOfBankBalances() {
	const totalAmount = bankBalances.reduce((total, account) => total + parseFloat(account.amount), 0).toFixed(2);
	return totalAmount;
}

function sumOfInterests() {
	const sum = bankBalances
		.filter((account) => {
			if (
				account.state === 'WI' ||
				account.state === 'IL' ||
				account.state === 'WY' ||
				account.state === 'OH' ||
				account.state === 'GA' ||
				account.state === 'DE'
			) {
				return account;
			}
		})
		.reduce((total, account) => total + (parseFloat(account.amount) + parseFloat(account.amount) * 0.189), 0)
		.toFixed(2);
	console.log(sum);
	return sum;
}

function higherStateSums() {
	const allStateTotals = bankBalances.reduce((obj, account) => {
		let amount = parseFloat(account.amount);

		if (obj[account.state]) {
			obj[account.state] += amount;
		} else {
			obj[account.state] = amount;
		}
		obj[account.state] = Math.floor(obj[account.state] * 100) / 100;
		return obj;
	}, {});

	const filteredStateTotals = Object.values(allStateTotals)
		.reduce((total, amount) => {
			if (amount > 1000000) {
				return total + amount;
			}
			return total;
		}, 0)
		.toFixed(2);
	return filteredStateTotals;
}

export { hundredThousandairs, datasetWithRoundedDollar, sumOfBankBalances, sumOfInterests, higherStateSums };

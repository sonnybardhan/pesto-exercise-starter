// import React from 'react'

export default function() {
	return {
		getScoreFromLS(key) {
			const storage = localStorage.getItem(key);
			if (storage) return JSON.parse(storage).score;
			return 0;
		},
		saveScoreInLS(key, bestScore) {
			localStorage.setItem(key, JSON.stringify({ score: bestScore }));
		}
	};
}

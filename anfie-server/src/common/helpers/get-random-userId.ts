export const getRandomUsers = (userIDs: number[], count: number): number[] => {
	const shuffledUserIDs = Array.from(userIDs);
	let currentIndex = shuffledUserIDs.length;
	let temporaryValue;
	let randomIndex;

	// Fisher-Yates shuffle algorithm
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = shuffledUserIDs[currentIndex];
		shuffledUserIDs[currentIndex] = shuffledUserIDs[randomIndex];
		shuffledUserIDs[randomIndex] = temporaryValue;
	}

	return shuffledUserIDs.slice(0, count);
};

class Common {
	getChunk(tokens: string[], start: number, size: number, joinText: string) {
		let separationMarkIndex = 0;

		for (let i = tokens.length - 1; i >= start; i--) {
			if (Boolean(tokens[i].match(/[。」.!?！…？]/))) {
				separationMarkIndex = i;
			}

			if (Boolean(tokens[i].match(/[。」.!?！…？]/)) && i <= size + start) {
				separationMarkIndex = i;
				break;
			}
		}

		return tokens.slice(start, separationMarkIndex >= size + start ? size + start : separationMarkIndex + 1).join(joinText);
	}
}
export const _common = new Common();

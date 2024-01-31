export function sort<T>(arr: T[], field: string, orderBy: 'ASC' | 'DESC') {
	if (arr.length > 0 && typeof arr[0][field] === 'string') {
		return arr.sort(function (a, b) {
			const objA = a[field].toLowerCase(); // Convert to lowercase for case-insensitive sorting
			const objB = b[field].toLowerCase();

			if (orderBy === 'ASC') {
				if (objA < objB) {
					return -1;
				}
				if (objA > objB) {
					return 1;
				}
			} else {
				if (objA < objB) {
					return 1;
				}
				if (objA > objB) {
					return -1;
				}
			}

			return 0;
		});
	}

	return arr.sort((a, b) => {
		if (orderBy === 'ASC') {
			return a[field] - b[field];
		} else {
			return b[field] - a[field];
		}
	});
}

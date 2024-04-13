export function calculateAge(dob: Date) {
	const now = new Date();

	let age = now.getFullYear() - dob.getFullYear();

	// Check if the birthday hasn't occurred yet this year
	const hasBirthdayPassed = now.getMonth() > dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());

	if (!hasBirthdayPassed) {
		age--;
	}

	return age;
}

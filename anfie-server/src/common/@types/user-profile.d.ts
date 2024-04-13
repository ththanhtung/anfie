import { Location } from 'src/apis/locations/entities';
import { Preference } from 'src/apis/preferences/entities';

type TCreateUserProfileParams = {
	userId: string;
	firstName: string;
	lastName: string;
	dob: Date;
	gender: Genders;
	phone: string;
	bio: string;
};

type TUpdateUserProfileParams = {
	id: number;
	firstname?: string;
	lastname?: string;
	dob?: Date;
	gender?: Genders;
	phone?: string;
	bio?: string;
};

type TUpdateUserPreferencesParams = {
	preferences: Preference[];
	locations: Location[];
};

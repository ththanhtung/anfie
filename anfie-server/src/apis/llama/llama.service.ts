/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserProfiles } from '../user/entities';
import { calculateAge } from 'src/common';

@Injectable()
export class LlamaService {
	constructor() {}
	async matchRequest(profiles: UserProfiles[]): Promise<TMatchResult> {
		if (!profiles) return;

		// const userInfos = profiles
		// 	.map((profile) => {
		// 		const preferences = profile?.preferences?.map((preference) => preference?.name).join();
		// 		const locations = profile?.locations?.map((location) => location?.name).join();
		// 		const age = calculateAge(profile.user.dob);
		// 		let ageRange = `${profile?.maxAge} to ${profile?.minAge}`;
		// 		const preferGender = profile.preferGenders.map((gender) => gender.name).join();

		// 		let prompt = `Name: ${profile?.user.firstName} ${profile?.user.lastName}, ID: ${profile?.user?.id}, `;

		// 		if (profile.gender) {
		// 			prompt += `Gender: ${profile?.gender}, `;
		// 		}

		// 		if (profile.user.dob) {
		// 			prompt += `Age: ${age}, `;
		// 		}

		// 		// console.log({ preferences });

		// 		if (preferences !== '') {
		// 			prompt += `Likes: ${preferences}, `;
		// 		}

		// 		if (locations !== '') {
		// 			prompt += `Preferred partner locations: ${locations}, `;
		// 		}

		// 		if (profile.minAge !== null && profile.maxAge === null) {
		// 			ageRange = `Preferred partner age greater than ${profile.minAge}`;
		// 		}

		// 		if (profile.maxAge !== null && profile.minAge === null) {
		// 			ageRange = `Preferred partner age from 16 to ${profile.maxAge}`;
		// 		}

		// 		if (profile.maxAge !== null && profile.minAge !== null) {
		// 			prompt += `Preferred partner age range: ${ageRange}, `;
		// 		}

		// 		if (preferGender !== null) {
		// 			prompt += `Preferred partner gender: ${preferGender}`;
		// 		}

		// 		console.log({ prompt });

		// 		return prompt;
		// 	})
		// 	.join(' - ');

		// const chatCompletion = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		model: 'llama3.2',
		// 		messages: [
		// 			{
		// 				role: 'system',
		// 				content:
		// 					'you are a matchmaker. I will give you a list of possible matchs. Your job is to help to find the best match. Do not be too verbose. Refer to the user in the form. format the entire response in the JSON format: {"result": {"id1": id of first matched user id, "id2": id of second matched user id, "reason": why you match them}}. Here is a response example: {"result":{"id1":4,"id2":3,"reason":"they both love cooking"}}'
		// 			},
		// 			{ role: 'user', content: userInfos }
		// 		],
		// 		stream: false
		// 	})
		// });

		// console.log({ userInfos });

		// const chatCompletionJson = await chatCompletion.json();

		// const result = chatCompletionJson?.message?.content;

		// console.log({ result });

		// const match = JSON.parse(result);
		// return match?.result as TMatchResult;
		return {
			id1: '10287ec7-ca50-49ed-b950-dcbcecb77cb0',
			id2: '3d1bdf26-3b40-4c63-b05a-9598790f9cde',
			reason: 'dklf;ldsfjl;'
		};
	}
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserProfiles } from '../user/entities';
import { calculateAge } from 'src/common';

@Injectable()
export class LlamaService {
	constructor() {}
	async matchRequest(profiles: UserProfiles[]): Promise<TMatchResult> {
		if (!profiles) return;

		const userInfos = profiles
			.map((profile) => {
				const preferences = profile?.preferences?.map((preference) => preference?.name).join();
				const locations = profile?.locations?.map((location) => location?.name).join();
				const age = calculateAge(profile.user.dob);
				let ageRange = `${profile?.maxAge} to ${profile?.minAge}`;
				const preferGender = profile.preferGenders.map((gender) => gender.name).join();

				let prompt = `Name: ${profile?.user.firstName} ${profile?.user.lastName}, ID: ${profile?.user?.id}, `;

				if (profile.gender) {
					prompt += `Gender: ${profile?.gender}, `;
				}

				if (profile.user.dob) {
					prompt += `Age: ${age}, `;
				}

				// console.log({ preferences });

				if (preferences !== '') {
					prompt += `Likes: ${preferences}, `;
				}

				if (locations !== '') {
					prompt += `Preferred partner locations: ${locations}, `;
				}

				if (profile.minAge !== null && profile.maxAge === null) {
					ageRange = `Preferred partner age greater than ${profile.minAge}`;
				}

				if (profile.maxAge !== null && profile.minAge === null) {
					ageRange = `Preferred partner age from 16 to ${profile.maxAge}`;
				}

				if (profile.maxAge !== null && profile.minAge !== null) {
					prompt += `Preferred partner age range: ${ageRange}, `;
				}

				if (preferGender !== null) {
					prompt += `Preferred partner gender: ${preferGender}`;
				}

				console.log({ prompt });

				return prompt;
			})
			.join(' - ');

		const chatCompletion = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'llama3.2:1b',
				messages: [
					{
						role: 'system',
						content:
							'you are a matchmaker. I will give you a list of possible matchs. Your job is to help to find the best match. Do not be too verbose. Refer to the user in the form. format the entire response in the JSON format: {"result": {"id1": id of first matched user id, "id2": id of second matched user id, "reason": why you match them}}. Here is a response example: {"result":{"id1":4,"id2":3,"reason":"they both love cooking"}}'
					},
					{ role: 'user', content: userInfos }
				],
				stream: false
			})
		});

		console.log({ userInfos });

		const chatCompletionJson = await chatCompletion.json();

		const result = chatCompletionJson?.message?.content;

		console.log({ result });

		const parsedResult = extractValues(result);
		return parsedResult as TMatchResult;
	}
}

function extractValues(input: string): { id1: string; id2: string; reason: string } | null {
	const idPattern = /"id1":\s*"?([\w-]+)"?,\s*"id2":\s*"?([\w-]+)"?/;
	const reasonPattern = /"reason":\s*"([^"]+)"/;

	const idMatch = input.match(idPattern);
	const reasonMatch = input.match(reasonPattern);

	if (idMatch && reasonMatch) {
		return {
			id1: idMatch[1],
			id2: idMatch[2],
			reason: reasonMatch[1]
		};
	}

	return null;
}

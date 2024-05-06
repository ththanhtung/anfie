/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserProfiles } from '../user/entities';
import { calculateAge } from 'src/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
	private readonly openai: OpenAI;
	constructor() {
		this.openai = new OpenAI({
			baseURL: 'http://localhost:3040/v1',
			apiKey: ''
		});
	}
	async matchRequest(profiles: UserProfiles[]): Promise<TMatchResult> {
		if (!profiles) return;

		const userInfos = profiles
			.map((profile) => {
				const preferences = profile?.preferences?.map((preference) => preference?.name).join();
				const locations = profile?.locations?.map((location) => location?.name).join();
				const age = calculateAge(profile?.dob);
				let ageRange = `${profile?.maxAge} to ${profile?.minAge}`;
				const preferGender = profile.preferGenders.map((gender) => gender.name).join();

				let prompt = `Name: ${profile?.firstName} ${profile?.lastName}, ID: ${profile?.user?.id}, `;

				if (profile.gender) {
					prompt += `Gender: ${profile?.gender}, `;
				}

				if (profile.dob) {
					prompt += `Age: ${age}, `;
				}

				console.log({ preferences });

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

		const chatCompletion = await this.openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						'you are a matchmaker. I will give you a list of possible matchs. Your job is to help to find the best match. Do not be too verbose. Refer to the user in the form. format the entire response in the JSON format: {"result": {"id1": id of first matched user id, "id2": id of second matched user id, "reason": why you match them}}. Here is a response example: {"result":{"id1":4,"id2":3,"reason":"they both love cooking"}}'
				},
				{
					role: 'user',
					content: userInfos
				}
			],
			model: 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF'
		});

		console.log({ userInfos });

		const result = chatCompletion.choices[0].message.content;

		console.log({ result });

		const match = JSON.parse(result);
		return match?.result as TMatchResult;
	}
}

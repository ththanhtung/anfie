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
				const preferences = profile?.preferences?.map((preference) => preference?.name).join(', ');
				const locations = profile?.locations?.map((location) => location?.name).join(', ');
				const age = calculateAge(profile?.dob);
				const ageRange = `${profile?.maxAge} to ${profile?.minAge}`;

				return (
					`Name: ${profile?.firstName} ${profile?.lastName}, ` +
					`Gender: ${profile?.gender}, ` +
					`Age: ${age}, ` +
					`Likes: ${preferences}, ` +
					`ID: ${profile?.user?.id}, ` +
					`Preferred partner locations: ${locations}, ` +
					`Preferred partner age range: ${ageRange}, ` +
					`Preferred partner gender: ${profile?.gender} `
				);
			})
			.join(' - ');

		const chatCompletion = await this.openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						'you are a matchmaker. I will give you a list of possible matchs. Your job is to help to find the best match. Do not be too verbose. Refer to the user in the form. format the entire response in the JSON format: {"result": {"id1": value, "id2": value, "score": value}}'
				},
				{
					role: 'user',
					content: userInfos
				}
			],
			model: 'gpt-3.5-turbo'
		});

		const result = chatCompletion.choices[0].message.content;

		const match = JSON.parse(result);
		console.log({ match: match.result });

		return match?.result as TMatchResult; 
	}
}

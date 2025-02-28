/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserProfiles } from '../user/entities';
import { _common, calculateAge } from 'src/common';

@Injectable()
export class LlamaService {
	constructor() {}
	async matchRequest(profiles: UserProfiles[]): Promise<TMatchResult> {
		if (!profiles) return;

		const userInfos = profiles
			.map((profile) => {
				const preferences = profile?.preferences?.map((p) => p?.name).join(', ') || 'None';
				const locations = profile?.locations?.map((l) => l?.name).join(', ') || 'Any';
				const age = calculateAge(profile.user.dob);
				const preferGender = profile.preferGenders.map((g) => g.name).join(', ') || 'No preference';
				const selfDescribed = profile.selfDescribed.map((g) => g.name).join(', ') || 'No self described';

				// Age range calculation with clear boundaries
				let ageRange = '';
				if (profile.minAge && profile.maxAge) {
					ageRange = `${profile.minAge}-${profile.maxAge}`;
				} else if (profile.minAge) {
					ageRange = `>${profile.minAge}`;
				} else if (profile.maxAge) {
					ageRange = `<${profile.maxAge}`;
				} else {
					ageRange = 'No restriction';
				}

				return `
				[id: ${profile.user.id}]
				1. Basic Info:
				- Name: ${profile.user.firstName} ${profile.user.lastName}
				- Age: ${age} (Seeking: ${ageRange})
				- Gender: ${profile.gender || 'Unspecified'}
				- Self Described: ${selfDescribed || 'Unspecified'}
				
				2. Preferences (Weighted):
				* Partner Gender: ${preferGender} [25% weight]
				* Location Priority: ${locations} [20% weight] 
				* Key Interests: ${preferences} [30% weight]
				`;
			})
			.join('\n\n');

		// const chatCompletion = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		model: 'llama3.2:3b',
		// 		messages: [
		// 			{
		// 				role: 'system',
		// 				content: `Act as a professional matchmaker AI. Follow this process rigorously:
		// 						1. ANALYZE profiles using these compatibility pillars:
		// 						- Interest Synergy (30% weight): Deep semantic match of hobbies/values
		// 						- Personality Alignment (25%): Complementary communication styles
		// 						- Geo-Proximity (20%): Reasonable distance for real connections
		// 						- Value Resonance (25%): Shared life goals/ethics

		// 						2. SCORING SYSTEM:
		// 						- Calculate match score (0-100) for all possible pairs
		// 						- Prioritize matches where BOTH users have indicated openness to new connections
		// 						- Deduct points for conflicting dealbreakers
		// 						- If no mutual matches, select highest unilateral attraction
		// 						- NEVER omit match - ALWAYS return best available pair

		// 						3. SELECTION:
		// 						- Choose the pair with highest mutual score

		// 						4. RESPONSE FORMAT STRICTLY AS:
		// 						{"result": {"id1": [string], "id2": [string], "reason": "[concise 5-7 word shared interest]"}}

		// 						Example of ideal response:
		// 						{"result": {"id1":"10287ec7-ca50-49ed-b950-dcbcecb77cb0","id2":"e2ea4f48-7d30-4a49-90ab-e128badb49a2","reason":"shared passion for culinary arts"}}

		// 						Prohibited:
		// 						- Markdown formatting
		// 						- Additional text outside JSON
		// 						- Generic reasons like "common interests
		// 						`
		// 			},
		// 			{ role: 'user', content: userInfos }
		// 		],
		// 		stream: false
		// 	})
		// });

		// const chatCompletionJson = await chatCompletion.json();

		// const result = chatCompletionJson?.message?.content;

		const result = await this.chunking(userInfos, 200);
		const parsedResult = JSON.parse(result);

		return parsedResult.result as TMatchResult;
	}

	async chunking(text: string, chunkSize: number) {
		const scriptTokens = `${text}。`.split('');
		let res = '';
		const totalChunks = Math.ceil(scriptTokens.length / chunkSize);
		let chunksCounter = 1;

		const messages = [];

		for (let i = 0; i < scriptTokens.length - 1; ) {
			if (i === 0) {
				await this.sendRequest(
					'You will be receiving a long script in chunks. Your task is to wait for all the chunks and then follow further instructions. Wait for me to start.'
				);
			}

			const textToEdit = _common.getChunk(scriptTokens, i, chunkSize, '');
			i += textToEdit.split('').length;

			const prompt = `=== INSTRUCTIONS ===
							Your task is ONLY to confirm receipt of this chunk, chunk ${chunksCounter}/${totalChunks}, and not generate any text.
							=== SCRIPT CHUNK ${chunksCounter}/${totalChunks} ===
							${textToEdit}
							=== END OF CHUNK ===`;

			const response = await this.sendRequest(prompt, 20);
			const newConversation = [
				{
					role: 'user',
					content: prompt
				},
				{
					role: 'assistant',
					content: response
				}
			];
			messages.push(...newConversation);
			chunksCounter++;
		}

		messages.unshift({
			role: 'system',
			content: `Act as a professional matchmaker AI. Follow this process rigorously:
								1. ANALYZE profiles using these compatibility pillars:
								- Interest Synergy (30% weight): Deep semantic match of hobbies/values
								- Personality Alignment (25%): Complementary communication styles
								- Geo-Proximity (20%): Reasonable distance for real connections
								- Value Resonance (25%): Shared life goals/ethics

								2. SCORING SYSTEM:
								- Calculate match score (0-100) for all possible pairs
								- Prioritize matches where BOTH users have indicated openness to new connections
								- Deduct points for conflicting dealbreakers
								- If no mutual matches, select highest unilateral attraction
								- NEVER omit match - ALWAYS return best available pair

								3. SELECTION:
								- Choose the pair with highest mutual score

								4. RESPONSE FORMAT STRICTLY AS:
								{"result": {"id1": [string], "id2": [string], "reason": "[concise 5-7 word shared interest]"}}

								Example of ideal response:
								{"result": {"id1":"10287ec7-ca50-49ed-b950-dcbcecb77cb0","id2":"e2ea4f48-7d30-4a49-90ab-e128badb49a2","reason":"shared passion for culinary arts"}}

								Prohibited:
								- Markdown formatting
								- Additional text outside JSON
								- Generic reasons like "common interests
								`
		});

		const chatCompletion = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'llama3.2:3b',
				messages:[
					...messages,
					{
						role: 'user',
						content: "now give me the best match"
					}
				],
				stream: false
			})
		});

		const chatCompletionJson = await chatCompletion.json();

		res = chatCompletionJson?.message?.content;

		console.log({ res });

		return res;
	}

	async sendRequest(prompt: string, maxRetries: number = 3, retryDelay: number = 1000): Promise<any> {
		let retries = 0;
		while (retries < maxRetries) {
			try {
				const response = await fetch(`${process.env.OLLAMA_URL}/api/chat`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						model: 'llama3.2:3b',
						messages: [{ role: 'user', content: prompt }],
						stream: false
					})
				});

				const chatCompletionJson = await response.json();

				const res = chatCompletionJson?.message?.content;

				const result = res.replace(/[^\w\s]/g, '');

				console.log(2);

				if (result.trim() === '' && prompt.length > 0) {
					throw new Error('Empty response');
				}

				return res;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				retries++;
				console.error(`Request failed. Retrying (attempt ${retries}/${maxRetries})...`);
				await new Promise((resolve) => setTimeout(resolve, retryDelay));
			}
		}
		throw new Error(`Failed to get a successful response after ${maxRetries} retries.`);
	}
}

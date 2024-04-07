import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';

@Injectable()
export class OpenAIService {
	private readonly openai: OpenAIApi;
	constructor() {
		this.openai = new OpenAIApi({
			apiKey: process.env.OPENAI_API_KEY || ''
		});
	}

	async chatGptRequest(message: string): Promise<string> {
		try {
			// Make a request to the ChatGPT model
			const completion: ChatCompletion = await this.openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content:
							'you are a matchmaker. I will tell you something about the person, and give you a list of possible matchs. Your job is to help to find the best match for the person. Do not be too verbose. Refer to the user in the form. format the entire response in the JSON format: {result: name, rating, [positives], [negatives], uid}'
					},
					{
						role: 'user',
						content: message
					}
				],
				temperature: 0.5,
				max_tokens: 1000
			});

			// Extract the content from the response
			const [content] = completion.choices.map((choice) => choice.message.content);

			return content;
		} catch (e) {
			// Log and propagate the error
			console.error(e);
			throw new ServiceUnavailableException([{ message: 'Failed request to ChatGPT' }]);
		}
	}
}

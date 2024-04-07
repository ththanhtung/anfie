type TCreateChatCompletionParams = {
	model: string;
	messages: {
		role: string;
		content: string;
	}[];
};

type TCreateChatCompletionResponse = {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: {
		message: {
			role: string;
			content: string;
		};
	}[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
};

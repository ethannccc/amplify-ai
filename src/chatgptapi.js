const OpenAI = require("openai");

class chatgptAPI {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
        this.chatHistory = [];
    }

    async generateResponse(prompt) {
        this.chatHistory.push({ "role": "user", "content": prompt });

        try {
            const response = await this.fetchResponse();
            this.chatHistory.push({ "role": "assistant", "content": response });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // api call 
    async fetchResponse() {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: this.chatHistory,
                max_tokens: 100 // change if want longer response
            });

            return response.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = chatgptAPI;

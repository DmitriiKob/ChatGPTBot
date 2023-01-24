const TelegramBot = require('node-telegram-bot-api');
const openai = require('openai');

// Replace YOUR_TOKEN with your Telegram bot's token
// Replace YOUR_OPENAI_KEY with your OpenAI API key
const bot = new TelegramBot('5759321259:AAH5pKO_CtuQFLkjMZDEE0S4tcH_AkK1-FE', { polling: true });
openai.apiKey = "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";

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Hello, I am a programmer bot. How can I help you today?');
    } else if (messageText === '/services') {
        bot.sendMessage(chatId, 'Here are the services we offer: \n - Web development \n - Mobile app development \n - Data analysis \n - Machine learning');
    } else if (messageText === '/portfolio') {
        bot.sendMessage(chatId, 'Check out our portfolio at https://www.example.com/portfolio');
    
    } else {
        openai.completions.create({
            prompt: messageText,
            model: "text-carl-001",
            temperature: 0.5,
            max_tokens: 30
        }, (error, response) => {
            if (error) {
                console.log(error);
                bot.sendMessage(chatId, "I'm sorry, I'm having trouble generating a response. Please try again later.");
            } else {
                if(response.choices[0]){
                    bot.sendMessage(chatId, response.choices[0].text);
                }else{
                    bot.sendMessage(chatId, "I'm sorry, I'm having trouble generating a response. Please try again later.");
                }
            }
        });
    }
});

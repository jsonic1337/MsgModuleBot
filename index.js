var EmojiBot = require('./modules/EmojiBot.js'),
    GlitchMsgBot = require('./modules/GlitchMsgBot.js'),
    GachiBot = require('./modules/GachiBot.js'),
    VKmeFunc = require('./modules/VKmeFunc.js'),
    TickerBot = require('./modules/TickerBot.js'),
    config = require('./config.js');
const { VK } = require('vk-io');
const vk = new VK({ token: config.TOKEN });
var commands = {
	[config.emoji]: 'emoji',
	[config.glitch]: 'glitch',
	[config.gachi]: 'gachi',
	[config.vkme]: 'vkme',
	[config.ticker]: 'ticker'
}
vk.updates.start();
vk.updates.on('message', (context, next) => {
	if (!context.hasText || !context.isOutbox || context.hasAttachments() || context.subTypes[0] != 'message_new') return
	if (Object.keys(commands).includes(context.text)) {
	   set = 'switchSet'
		delMsg(context)
	} else if (context.text == config.off) {
		set = false
		delMsg(context)
	}
	switch (set) {
		case 'emoji':
			EmojiBot(context);
			break;
		case 'glitch':
			GlitchMsgBot(context);
			break;
		case 'gachi':
			GachiBot(context);
			break;
		case 'vkme':
			VKmeFunc(context, config.vkme_command, config.regex, config.offline, config.online, config.TOKEN);
			break;
		case 'ticker':
			TickerBot(context, config.pref_ticker);
			break;
		case 'switchSet':
			set = commands[context.text]
			break;
	}
})
function delMsg(context){ context.deleteMessage({ message_ids: context.id, delete_for_all: 1 }) };

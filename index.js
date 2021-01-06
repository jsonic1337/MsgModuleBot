var EmojiBot = require('./modules/EmojiBot.js');
var GlitchMsgBot = require('./modules/GlitchMsgBot.js');
var GachiBot = require('./modules/GachiBot.js');
var VKmeFunc = require('./modules/VKmeFunc.js');
var TickerBot = require('./modules/TickerBot.js');
var config = require('./config.js');
const {
	VK
} = require('vk-io');
const vk = new VK({
	token: config.TOKEN
});
var commands = {
	'emoji': config.emoji,
	'glitch': config.glitch,
	'gachi': config.gachi,
	'vkme': config.vkme,
	'ticker': config.ticker
}
var set = false;
vk.updates.start();
vk.updates.on('message', (context, next) => {
	if (context.hasText == false || context.isOutbox == false || context.hasAttachments() == true || context.subTypes[0] != 'message_new') return
	m_id = false
	if (Object.values(commands).includes(context.text)) {
		set = getKeyByValue(commands, context.text)
		context.deleteMessage({
			message_ids: context.id,
			delete_for_all: 1
		})
		m_id = true
	} else if (context.text == config.off) {
		set = false
		context.deleteMessage({
			message_ids: context.id,
			delete_for_all: 1
		})
	}
	if (m_id == true) return
	switch (set) {
		case "emoji":
			EmojiBot(context);
			break;
		case "glitch":
			GlitchMsgBot(context);
			break;
		case "gachi":
			GachiBot(context);
			break;
		case "vkme":
			VKmeFunc(context, config.vkme_command, config.regex, config.offline, config.online, config.TOKEN);
			break;
		case "ticker":
			TickerBot(context, config.pref_ticker);
			break;
	}
})
const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

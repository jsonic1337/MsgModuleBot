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
var m_id = 0;
var set = false;
vk.updates.start();
vk.updates.on('message', (context, next) => {
	if (context.hasText == false || context.isOutbox == false || context.hasAttachments() == true) return


	if (Object.values(commands).includes(context.text)) {
		m_id = context.id;
		set = getKeyByValue(commands, context.text)
		context.deleteMessage({
			message_ids: context.id,
			delete_for_all: 1
		})
	} else if (context.text == config.off) {
		set = false
		context.deleteMessage({
			message_ids: context.id,
			delete_for_all: 1
		})


	} else if (m_id != context.id && set == 'emoji') {
		EmojiBot(context);
		m_id = context.id;
	} else if (m_id != context.id && set == 'glitch') {
		GlitchMsgBot(context);
		m_id = context.id;
	} else if (m_id != context.id && set == 'gachi') {
		GachiBot(context);
		m_id = context.id;
	} else if (m_id != context.id && set == 'vkme') {
		VKmeFunc(context, config.vkme_command, config.regex, config.offline, config.online, config.TOKEN);
		m_id = context.id;
	} else if (m_id != context.id && set == 'ticker') {
		TickerBot(context, config.pref_ticker);
		m_id = context.id;
	}
})
const getKeyByValue = (obj, value) => 
        Object.keys(obj).find(key => obj[key] === value);



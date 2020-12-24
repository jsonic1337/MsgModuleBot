var EmojiBot = require('./modules/EmojiBot.js');
var GlitchMsgBot = require('./modules/GlitchMsgBot.js');
const {
	VK
} = require('vk-io');
const vk = new VK({
	token: "TOKEN" // Сюда нужно вставить токен с правами на сообщения
});
var commands = {
	'.эм': 'emoji',
	'.влр': 'glitch'
}
var m_id = 0;
var set = false;
vk.updates.start();
vk.updates.on('message', (context, next) => {
	if (context.hasText == false || context.isOutbox == false || context.hasAttachments() == true) return
	if (Object.keys(commands).includes(context.text)) {
		m_id = context.id;
		set = commands[context.text]
		context.deleteMessage({
			message_ids: context.id,
			delete_for_all: 1
		})
	} else if (context.text == '.выкл') {
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
	}
})

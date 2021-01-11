var emoji = ['😤', '😬', '🙄', '😂', '🤤', '😨', '🥶', '🤬', '🥵', '🤑', '🤠', '🥴', '😳', '😩', '🤯', '😱'];
var EmojiBot = function(context) {
	var dataText = context.text.split(' ')
	for (var itemIndex = 1; itemIndex < dataText.length; itemIndex += 2) {
		dataText.splice(itemIndex, 0, emoji[getRandom(emoji.length)].repeat(4));
	}
	
	context.editMessage({
		message: `${dataText.join(" ")} ${emoji[getRandom(emoji.length)].repeat(4)}}`
	})
}

function getRandom(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
module.exports = EmojiBot;

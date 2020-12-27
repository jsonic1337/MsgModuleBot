gachiMassive = ['♂THREE HUNDRED BUCKS♂', '♂dungeon Master♂', '♂ass we can!♂', '♂DEEP DARK FANTASY♂', '♂swallow♂', '♂my cum♂', '♂suck some dick♂', '♂fucking slaves♂', '♂in my ass♂', '♂fuck you♂', '♂finger♂', '♂FUCK♂', '♂stick your finger in my ass♂', '♂boy next door♂', '♂fisting♂', '♂leatherclubs♂', '♂fat cock♂', '♂semen♂', '♂in my ass♂', '♂cum back♂', '♂fisting Master♂', '♂glove in my ass♂', '♂bondage Master♂', '♂cum♂', '♂fisting♂', '♂anal♂', '♂gay boy♂', '♂semen♂', '♂wee-wee♂', '♂its so fucking deep♂']

var GachiBot = function(context) {
	var dataText = context.text.split(' ')
	for (var itemIndex = 1; itemIndex < dataText.length; itemIndex += 2) {
		if (getRandom(3) >= 2) {
        dataText.splice(itemIndex, 0, gachiMassive[getRandom(gachiMassive.length)]);
        }
	}
if (context.text != dataText.join(" ")){
	context.editMessage({
		message: `${dataText.join(" ")}`
	}) }
}

function getRandom(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
module.exports = GachiBot;

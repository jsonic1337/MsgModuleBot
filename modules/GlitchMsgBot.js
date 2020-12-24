re = {
	0: [/о/g, '0'],
	1: [/е/g, '3'],
	2: [/з/g, '3'],
	3: [/д/g, '9'],
	4: [/т/g, '7'],
	5: [/ч/g, '4'],
	6: [/в/g, '8'],
	7: [/б/g, '6']
}
var GlitchMsgBot = function(context) {
	a = context.text.toLowerCase()
	for (var key in re) {
		a = a.replace(re[key][0], re[key][1])
	}
	a = a.split('')
	for (let i = 0; i < a.length; i = i + 2) {
		a[i] = a[i].toUpperCase()
	}
	context.editMessage({
		message: a.join('')
	})
}
module.exports = GlitchMsgBot;

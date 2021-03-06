const { Command } = require('discord.js-commando');
const { list, base64 } = require('../../util/Util');
const modes = ['encode', 'decode'];

module.exports = class Base64Command extends Command {
	constructor(client) {
		super(client, {
			name: 'base64',
			aliases: ['base-64'],
			group: 'text-edit',
			memberName: 'base64',
			description: 'Converts text to Base64.',
			details: `**Modes**: ${modes.join(', ')}`,
			args: [
				{
					key: 'mode',
					prompt: `Would you like to ${list(modes, 'or')}?`,
					type: 'string',
					validate: mode => {
						if (modes.includes(mode.toLowerCase())) return true;
						return `Invalid mode, please enter either ${list(modes, 'or')}.`;
					},
					parse: mode => mode.toLowerCase()
				},
				{
					key: 'text',
					prompt: 'What text would you like to convert to Base64?',
					type: 'string',
					validate: text => {
						if (base64(text).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			]
		});
	}

	run(msg, { mode, text }) {
		return msg.say(base64(text, mode));
	}
};

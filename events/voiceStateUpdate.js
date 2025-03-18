const { Events } = require('discord.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	execute(oldState, newState) {
		// console.log(oldState, newState);
	},
};
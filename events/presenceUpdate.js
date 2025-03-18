const { Events, EmbedBuilder } = require('discord.js');
const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
	client_id: process.env.TWITCH_CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET
});

module.exports = {
	name: Events.PresenceUpdate,
	execute(oldMember, newMember) {

		if (!newMember) {
			console.log('WTF pas de newMember !');
		}

		if (newMember.user.bot === false) {

			if (!oldMember) {
				console.log('Pas de oldMember');
				return
			};

			let oldStreamingStatus = oldMember.activities.find(activity => activity.type === 1) ? true : false;
			let newStreamingStatus = newMember.activities.find(activity => activity.type === 1) ? true : false;

			if (oldStreamingStatus == newStreamingStatus) {
				return
			};

			if (newStreamingStatus) {

				const streamerNickname = newMember.guild.members.cache.get(newMember.user.id).nickname;
				const streamerDiscordName = newMember.user.username;
				const streamerGlobalName = newMember.user.globalName;
				const activity = newMember.activities.find(activity => activity.type === 1);
				const profilePicture = newMember.guild.members.cache.get(newMember.user.id).displayAvatarURL()
				const allowedStreamers = ['elcapos', 'frenchdeltaforce', 'nashylive', 'karimlegamer', 'cesarounet', 'sleonis', 'lilnanika']

				if (allowedStreamers.includes(streamerDiscordName)) {

					const string = activity.assets.largeImage;

					const result = string.match(/[^:]*$/);

					const streamPromise = twitch.getStreams({ channels: result });

					const random = Math.random().toString(36).slice(2);

					streamPromise
						.then(data => {

							const streamThumbnail = data.data[0].getThumbnailUrl().concat(random);
							const gamesPromise = twitch.getGames(activity.state);

							const embed = new EmbedBuilder()
								.setColor('#6441a5')
								.setTitle(`**${activity.details}**`)
								.setAuthor({
									name: streamerNickname ? streamerNickname : (streamerGlobalName ? streamerGlobalName : streamerDiscordName),
									iconURL: profilePicture,
								})
								.setURL(`${activity.url}`)
								.setDescription(`${streamerDiscordName.charAt(0).toUpperCase() + streamerDiscordName.slice(1)} vient de lancer un stream <a:POLICE:1155163439870783538>`)
								.addFields({
									name: 'Joue à',
									value: activity.state,
									inline: true
								})
								.setImage(streamThumbnail)
								.setFooter({
									text: activity.name,
									iconURL: 'https://www.freepnglogos.com/uploads/twitch-logo-transparent-png-20.png'
								})
								.setTimestamp();

							gamesPromise
								.then(gameData => {
									const gameThumbnail = gameData.data[0].box_art_url.replace('{width}', '285').replace('{height}', '380')

									embed.setThumbnail(gameThumbnail)
									// #bot 566950560050315295
									// #streams 1244405422849527818
									newMember.guild.channels.cache.find(channel => channel.id === '1244405422849527818').send({ embeds: [embed] })
								})
								.catch(err => {
									console.log(err);
								});
						})
						.catch(err => {
							console.log(err);
						});
				}

			}
		}
	},
};
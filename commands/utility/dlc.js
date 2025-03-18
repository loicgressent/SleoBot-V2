const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dlc')
		.setDescription(`Affiche le temps restant avant la sortie du DLC d'Elden Ring`),

	async execute(client) {

		const userId = client.user.id;
		const iconURL = client.guild.members.cache.get(client.user.id).displayAvatarURL();
		const name = client.user.globalName;

		const embed = new EmbedBuilder()
			.setColor(`#ef8b09`)
			.setTitle(`Shadow Of The Erdtree est officiellement sorti ! <:hypers:1090961945437413426>`)
			.setAuthor({
				name: name,
				iconURL: iconURL
			})
			.setDescription(`🛑 Suivez les streams en cours dans <#1244405422849527818>`)
			.setThumbnail('https://pbs.twimg.com/media/GORM-eDWcAAyA1Q?format=jpg&name=large')
			.setImage('https://p325k7wa.twic.pics/high/elden-ring/elden-ring/03-news/ER-SOTE-announcement.jpg?twic=v1/resize=860/step=10/quality=80')
			.setTimestamp()

		await client.reply({ embeds: [embed] });
	},
};
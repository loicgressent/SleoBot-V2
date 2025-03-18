const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('t')
        .setDescription(`caca`),

    async execute(client) {

        const button = new ButtonBuilder()
            .setCustomId('caca')
            .setLabel('LoL')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(button);

        const embed = new EmbedBuilder()

        embed
            .setTitle(`Sélectionne le rôle que tu souhaites !`)
            .setDescription(`Cela te permettra d'être ping quand un groupe se prépare à jouer.`)

        client.reply({
            // content: 'caca',
            embeds: [embed],
            components: [row]
        })
    },
};
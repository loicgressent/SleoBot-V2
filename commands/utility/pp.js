const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription(`Affiche la photo de profil de l'utilisateur`)
        .addUserOption(option =>
            option
                .setName('utilisateur')
                .setRequired(true)
                .setDescription(`Choisissez l'utilisateur dont vous voulez voir la photo de profil`)
        ),

    async execute(client) {

        const targetUser = client.options.getUser('utilisateur')
        // console.log(targetUser);
        await client.reply(targetUser.displayAvatarURL())
    },
};
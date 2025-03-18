const { Events, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { log } = require('winston');
module.exports = {
    name: Events.MessageCreate,
    execute(data) {

        if (data.author.bot === false) {

            const date = new Date();
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
            const datetime = `${date.getDate()} ${(mois[date.getMonth()])} ${date.getFullYear()} - ${date.getHours()+1}h${displayMinutes()}`

            function displayMinutes() {
                let minutes = date.getMinutes().toString()

                if (minutes.length === 1) {
                    return `0${minutes}`
                }
                else {
                    return minutes
                }
            }

            const userId = data.author.id;
            const username = data.author.username.charAt(0).toUpperCase() + data.author.username.slice(1); //L'utilisateur en a forcément un
            const channel = data.channel.id;
            const message = data.content;
            // console.log(message);
            const profilePicture = data.guild.members.cache.get(userId).displayAvatarURL()

            function displayMessage() {

                const regex = /<@[0-9]+>/gm;
                const regex2 = /(<@[0-9]+> )+<@[0-9]+>|<@[0-9]+>/gm;
                const found = message.match(regex);
                let members = [];

                if (found) {
                    for (const tag of found) {

                        const memberID = tag.toString().replace('<@', '').replace('>', '');
                        
                        const memberNickname = data.guild.members.cache.get(memberID).nickname //peut ne pas en avoir
                        const memberGlobalName = data.guild.members.cache.get(memberID).user.globalName //peut aussi ne pas en avoir
                        const memberUsername = data.guild.members.cache.get(memberID).user.username
                        
                        members.push(memberNickname ? `@${memberNickname}` : (memberGlobalName ? `@${memberGlobalName}` : `@${memberUsername}`))
                    }
                }

                const regex3 = /<@&[0-9]+>/gm;
                const foundPing = message.match(regex3);
                let pingName = [];

                if (foundPing) {
                    const pingToString = foundPing.toString();
                    console.log(foundPing);
                    const pingId = pingToString.substring(3, pingToString.length - 1);
                    // console.log(pingId);
                    pingName.push(data.guild.roles.cache.get(pingId).name);
                }

                const newMessage = message.replace(regex2, members.toString().replace(/,/g, ' ')).replace(regex3, `@${pingName.toString()}`);
                // console.log(newMessage);
                return newMessage

            }

            // Ping test 1252660674992017512

            data.guild.channels.cache
                .find(channel => channel.id === '1251282935160766494') // #bot : 566950560050315295 #msgs : 1251282935160766494
                .send(`*[${datetime}]* → **${username}** a dit "${displayMessage()}" dans <#${channel}>`)

            if (/\barta\b|\bArta\b|\bARTA\b/g.test(message)) {
                data.react('🐕‍🦺');
            }

            if (/\bnashy\b|\bNashy\b|\bNASHY\b|\bNAshy\b|\bNashyy\b|\bNashybre\b|\bNASHYBRE\b|\bnashybre\b|\bscamshy\b|\bScamshy\b|\bSCAMSHY\b/g.test(message)) {
                data.react('<:peeposcam:1216681103012790353>');
            }

            if (message.toLowerCase().includes('leave la zone')) {
                if (username === 'Hiimblew') {
                    data.react('<:prayy:1200057528764072056>')
                    data.react('<a:catJAM:793883193748094996>')
                    data.react('<a:pirateD:947177850858008576>')
                }
                else {
                    data.react('<:Sadge:800829722329088011>')
                }
            }

            if (message.toLowerCase().includes('comme même') || message.toLowerCase().includes('comme meme')) {
                if (username === 'Hiimblew') {
                    data.reply(`On dit 'quand même' gros con :thumbsup:`)
                }
            }

            if (message.toLowerCase().includes('!dlc')) {
                const arrayOptions = [`C'est /dlc maintenant !`]
                data.reply(arrayOptions[Math.floor(Math.random() * arrayOptions.length)])
            }
        }
    },
};
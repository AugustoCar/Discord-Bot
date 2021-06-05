require('dotenv').config();

const { Client, WebhookClient, Collection, Collector, GuildMember, Message } = require('discord.js');
const client = new Client
({
    partials : ['MESSAGE', 'REACTION']
});

let contador = 1; 


const webhookClient = new WebhookClient
(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

  const PREFIX = "$";

  client.on('ready', () => 
  {
    console.log(`${client.user.tag} has logged in.`);
  });

  client.on('message', (message) => 
  {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX))
    {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\+s/);   
    }

    if(message.content === ('ping'))
        {
          message.reply('pong');
        }
        
  });
  
  client.on('messageReactionAdd', (reaction, user) => 
  {
    const msg = reaction.message;
    console.log(reaction.message.guild.member);
    const mutedRole = reaction.guild.roles.cache.get('818895441865211944');
    const target = reaction.mentions.member.first();
    if (reaction.emoji.name === '🟨') 
    {
      const b = ++contador;
      if(b % 2 == 0)
      {
        msg.react('🟥');
        msg.reply(`${msg.author} has been muted.`);
        target.roles.add(mutedRole);
        msg.replay(reaction.message.guild.member);
      } 
    }
    
  });
  
client.login(process.env.DISCORD_BOT_TOKEN);
const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const songurl = require("./song.json")

var ready = true;
var songlist = ["ah","airhorn","allahu","help","illumi","inception","leeroy","mlg","shot","son","sparta","surprise","wombo","xfile"];


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
  console.log("client_id: " + config.client_id);
  console.log("username: " + config.username);
});

bot.on("guildMemberAdd", member =>{
  let guild = member.guild;
  guild.defaultChannel.send(`Welcome ${member.user} ! `);
});


bot.on('message', msg => {
  if(msg.author.bot || !msg.content.startsWith(config.prefix)) return;

    let command = msg.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = msg.content.split(" ").slice(1);

    switch(command.toLowerCase()){
        case "ping":
            msg.channel.send("pong!");
            break;
        case "s":
            var song = args[0];
            msg.delete();
            if(!msg.member.voiceChannel || ready == false || songlist.includes(song) == false) return;
                var voiceChannel = msg.member.voiceChannel;
                voiceChannel.join().then(connection =>{
                  const dispatcher = connection.playArbitraryInput(songurl[song]);
                  dispatcher.on('end', (reason) => {
                    console.log("reason:"+reason)
                    voiceChannel.leave();
                  });
          }).catch(ex => console.log(ex));
            ready = true;
            break;
        case "sons":
            msg.delete();
            msg.channel.send("ah hendek ugly holy");
            break;

  }
});
bot.login(config.token);
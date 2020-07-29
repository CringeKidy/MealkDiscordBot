module.exports = (client, message) => {
  //Namespace Stuff
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./USERS.sqlite');

  var admintools = true;


  //ingore all of the bot messsages
  if(message.author.bot) return;

  //geting the users Database Info
  let MessageAuthor
  MessageAuthor = client.getUser.get(message.author.username);

  //If they dont exist lets make them exist
  if(!MessageAuthor){
      MessageAuthor = { id: message.author.username, user: message.author.username, BANS: 0, Warns : 0, warn_reason: "", commands: 0}
  }

  //+ 1 there commands feilds everytime they send ! in the server
  if(message.content.startsWith('!')){
    MessageAuthor.commands++;
  }

  //setting the commands into the database
  client.setUser.run(MessageAuthor)

  //just making sure that if someone types in the welcome channel that is not !agree that i gets deleted
  if(message.channel.name === "welcome"){
    agree();
  }


  //Delete fucntion this only deltes unpinned messages
  async function agree(){
    const allMessages = await message.channel.messages.fetch()
    const deletable = allMessages.filter(message => !message.pinned)
    await message.channel.bulkDelete(deletable, true)
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Spillting user message from ! and Message eg !, ping and just getting the word 
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (['ban', 'warn', 'kick'].includes(command) && admintools){
    return message.author.send('sorry but **Admin Tools** are turned off');
  }


  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);


  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
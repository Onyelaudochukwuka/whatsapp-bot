const wa = require('@open-wa/wa-automate');

wa.create({
  sessionId: "new-session",
  multiDevice: true, //required to enable multiDevice support
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  client.onGlobalParticipantsChanged((participantChangedEvent) => console.log("participant changed for group", participantChangedEvent));
  client.onMessage(async message => {
    console.log(message);
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
    if (message.body === '.tagall') {
      const members = await client.getGroupMembersId(message.chatId);
      console.log(members);
      await client.sendReplyWithMentions(message.chatId, '| ♾️ FUMUDUKUS ♾️ UDOKA | \n Group Members tagged successfully', message.from,members)
    }
  });
}

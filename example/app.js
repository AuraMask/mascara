const auramask = require('../mascara');
const Irc = require('irc.js');
window.addEventListener('load', loadProvider);
window.addEventListener('message', console.warn);
auramask.setupWidget({host: 'http://localhost:9001'});

async function loadProvider() {
  const irchainProvider = auramask.createDefaultProvider({host: 'http://localhost:9001'});
  global.irc = new Irc(irchainProvider, {});
  const accounts = await irc.accounts();
  window.AURAMASK_ACCOUNT = accounts[0] || 'locked';
  logToDom(accounts.length ? accounts[0] : 'LOCKED or undefined', 'account');
  setupButtons(irc);
}

function logToDom(message, context) {
  document.getElementById(context).innerText = message;
  console.log(message);
}

function setupButtons(irc) {
  const accountButton = document.getElementById('action-button-1');
  accountButton.addEventListener('click', async () => {
    const accounts = await irc.accounts();
    window.AURAMASK_ACCOUNT = accounts[0] || 'locked';
    logToDom(accounts.length ? accounts[0] : 'LOCKED or undefined', 'account');
  });
  const txButton = document.getElementById('action-button-2');
  txButton.addEventListener('click', async () => {
    if (!window.AURAMASK_ACCOUNT || window.AURAMASK_ACCOUNT === 'locked') return;
    const txHash = await irc.sendTransaction({
      from: window.AURAMASK_ACCOUNT,
      to: window.AURAMASK_ACCOUNT,
      data: '',
    });
    logToDom(txHash, 'cb-value');
  });

}

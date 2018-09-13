const setupIframe = require('./setup-iframe.js');
const AuramaskInpageProvider = require('./inpage-provider.js');

module.exports = getProvider;

function getProvider(opts) {
  if (global.webu) {
    console.log('AuraMask ZeroClient - using environmental webu provider');
    return global.webu.currentProvider;
  }
  console.log('AuraMask ZeroClient - injecting zero-client iframe!');
  let iframeStream = setupIframe({
    zeroClientProvider: opts.mascaraUrl,
  });
  return new AuramaskInpageProvider(iframeStream);
}

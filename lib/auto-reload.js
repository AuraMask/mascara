module.exports = setupDappAutoReload;

function setupDappAutoReload(provider, observable) {
  // export webu as a global, checking for usage
  // AuraMask.createDefaultProvider
  let hasBeenWarned = false;
  let reloadInProgress = false;
  let lastTimeUsed;
  let lastSeenNetwork;
  const reloadEnabledProvider = new Proxy(provider, {
    get: (_provider, key) => {
      // get the time of use
      lastTimeUsed = Date.now();
      // return value normally
      return _provider[key];
    },
    set: (_provider, key, value) => {
      // set value normally and return value in order to not break javascript
      return _provider[key] = value;
    },
  });

  observable.subscribe(function(state) {
    // if reload in progress, no need to check reload logic
    if (reloadInProgress) return;

    const currentNetwork = state.networkVersion;

    // set the initial network
    if (!lastSeenNetwork) {
      lastSeenNetwork = currentNetwork;
      return;
    }

    // skip reload logic if webu not used
    if (!lastTimeUsed) return;

    // if network did not change, exit
    if (currentNetwork === lastSeenNetwork) return;

    // initiate page reload
    reloadInProgress = true;
    const timeSinceUse = Date.now() - lastTimeUsed;
    // if webu was recently used then delay the reloading of the page
    if (timeSinceUse > 500) {
      triggerReset();
    } else {
      setTimeout(triggerReset, 500);
    }
  });

  return reloadEnabledProvider;
}

// reload the page
function triggerReset() {
  global.location.reload();
}

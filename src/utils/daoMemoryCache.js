const cache = {
  proposals: [],
  lastSync: 0
};

export function cacheProposal(proposal) {
  cache.proposals.push(proposal);
  cache.lastSync = Date.now();
}

export function getCachedProposals() {
  return cache.proposals;
}

export function getLastSyncTime() {
  return cache.lastSync;
}

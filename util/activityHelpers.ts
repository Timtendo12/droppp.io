export const getTransferStatus = (batches: any[]): string => {
  if (batches.find(({ chain_status }) => chain_status > 10)) {
    return 'error'
  }
  if (!batches.find(({ chain_status }) => chain_status !== 10)) {
    return 'complete'
  }

  return 'in-transit'
}

export function formatTransferState(state, chainStatus) {
  if (state === 'submitted') {
    return chainStatus > 2 ? 'completed' : 'pending'
  } else if (state === 'confirmed') {
    return chainStatus > 3 ? 'completed' : chainStatus > 2 ? 'pending' : 'none'
  } else if (state === 'complete') {
    return chainStatus === 10
      ? 'completed'
      : chainStatus > 3
      ? 'pending'
      : 'none'
  }
}

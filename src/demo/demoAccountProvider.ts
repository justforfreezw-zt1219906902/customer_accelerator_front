import { demoAccounts } from './fixtures/accounts';
import { demoCommunicationDna } from './fixtures/communicationDna';
import { demoSignalPulse } from './fixtures/signalPulse';
import { demoDnaPortfolio } from './fixtures/dnaPortfolio';
import type { DemoAccountProvider } from './types';

export const demoAccountProvider: DemoAccountProvider = {
  listAccounts: () => demoAccounts,
  listDiscoveryAccounts: () =>
    demoAccounts.filter((account) => account.discoveryVisible),
  findAccountById: (id) => demoAccounts.find((account) => account.id === id),
  findCommunicationDna: (id) =>
    demoCommunicationDna.find((profile) => profile.accountId === id),
  getSignalPulse: () => demoSignalPulse,
  getDnaPortfolio: () => demoDnaPortfolio,
};

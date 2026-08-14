import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { describe, expect, it } from 'vitest';

import AccountRow from '../../src/components/product/AccountRow.vue';
import DnaPortfolioCard from '../../src/components/product/DnaPortfolioCard.vue';
import SignalUrgencyAccountCard from '../../src/components/product/SignalUrgencyAccountCard.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/demo/accounts/:id', component: { template: '<div />' } }],
});

describe('post-Phase-6 real-content layout robustness', () => {
  it('preserves the full account identity and long next-best action', () => {
    const name = 'A'.repeat(100);
    const detail = `${'Enterprise intelligence and enablement '.repeat(8)} · ${'Long headquarters '.repeat(5)}`;
    const nextBestAction = 'Coordinate the account team around '.repeat(14);
    const wrapper = mount(AccountRow, {
      props: {
        account: {
          id: '266463eb-3096-5209-a2ca-b533d6cb42a3',
          initials: 'AA',
          name,
          industry: detail,
          location: 'Berlin',
          tier: 'Focus Accounts',
          icpFit: 94,
          signalScore: 91,
          resonance: 89,
          activeSignals: 12,
          nextBestAction,
        },
      },
      global: { plugins: [router] },
    });

    expect(wrapper.text()).toContain(name);
    expect(wrapper.text()).toContain(nextBestAction);
    expect(wrapper.get('.account-identity strong').attributes('title')).toBe(
      name,
    );
    expect(
      wrapper.get('.account-identity small').attributes('title'),
    ).toContain(detail);
    expect(wrapper.get('.account-row__link').classes()).toContain(
      'account-row__link',
    );
  });

  it('keeps long DNA vocabulary and account identity in the card', () => {
    const vocabulary = [
      'a very long source-derived vocabulary phrase that must wrap safely',
      'enterprise enablement and customer education transformation',
      'multi-region workflow orchestration and governance',
    ];
    const wrapper = mount(DnaPortfolioCard, {
      props: {
        selected: false,
        account: {
          id: 'account-long',
          name: 'A highly descriptive enterprise account name '.repeat(3),
          initials: 'LA',
          industry: 'Enterprise software and professional services '.repeat(4),
          tier: 'Focus Accounts',
          activeSignalCount: 24,
        },
        profile: { tone: 'Technical and evidence-led', vocabulary },
      },
    });

    expect(wrapper.findAll('[aria-label="Top vocabulary"] li')).toHaveLength(3);
    vocabulary.forEach((term) => expect(wrapper.text()).toContain(term));
    expect(wrapper.get('.dna-portfolio-card').classes()).toContain(
      'dna-portfolio-card',
    );
  });

  it('renders long signal titles and next-best action without removing content', () => {
    const signalTitle =
      'A source-backed buying signal with extensive operational context '.repeat(
        5,
      );
    const nextBestAction =
      'Engage the responsible enablement team with verified evidence '.repeat(
        7,
      );
    const wrapper = mount(SignalUrgencyAccountCard, {
      props: {
        account: {
          accountId: 'account-long',
          name: 'Long Account',
          initials: 'LA',
          industry: 'Enterprise technology '.repeat(6),
          tier: 'Focus Accounts',
          activeSignalCount: 1,
          latestActiveSignalDate: '2026-08-15',
          nextBestAction,
          signals: [
            {
              id: 'signal-long',
              title: signalTitle,
              strength: 'high',
              signalDate: '2026-08-15',
            },
          ],
        },
      },
    });

    expect(wrapper.text()).toContain(signalTitle);
    expect(wrapper.text()).toContain(nextBestAction);
  });
});

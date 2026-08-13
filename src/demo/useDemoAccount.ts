import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { demoAccountProvider } from './demoAccountProvider';

export const useDemoAccount = () => {
  const route = useRoute();
  const accountId = computed(() => String(route.params.accountId ?? ''));
  const account = computed(() =>
    demoAccountProvider.findAccountById(accountId.value),
  );

  return { accountId, account };
};

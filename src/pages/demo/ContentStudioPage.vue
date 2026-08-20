<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AccountAvatar } from '../../components/product';
import { demoAccountProvider } from '../../demo/demoAccountProvider';
import {
  contentStudioAssets,
  contentStudioAnchorSignals,
  contentStudioLifecycle,
  contentStudioPersonas,
  defaultContentStudioContext,
} from '../../demo/contentStudio';
import type {
  ContentStudioContext,
  SalesTalkingPointsDraft,
} from '../../demo/contentStudio';
import type { DemoAccountIdentity } from '../../demo/types';
import { getRuntimeConfig } from '../../app/configuration/environment';
import {
  getAccount,
  getAccountSignals,
  getCommunicationDna,
  listAccounts,
  generateOutreachEmail,
} from '../../services/accountApi';
import { ApiRequestError } from '../../utils/apiErrors';
import type {
  AccountDetailDto,
  AccountListDto,
  AccountSignalDto,
  CommunicationDnaDto,
  OutreachEmailPart,
  OutreachEmailGenerationResponse,
} from '../../types/accountApi';

const route = useRoute();
const router = useRouter();
const apiMode = getRuntimeConfig().demoDataSource === 'api';
const accounts = demoAccountProvider.listDiscoveryAccounts();
const accountQuery = computed(() =>
  typeof route.query.account === 'string' ? route.query.account : null,
);
const apiAccounts = ref<AccountListDto[]>([]);
const apiSelectedAccount = ref<AccountDetailDto>();
const apiSelectedSignals = ref<AccountSignalDto[]>([]);
const apiSelectedDna = ref<CommunicationDnaDto | null>();
const apiLoading = ref(apiMode);
const apiError = ref('');
const apiSelectedLoading = ref(false);
const apiSelectedError = ref('');
let accountLoadGeneration = 0;
const selectedAccount = computed<
  DemoAccountIdentity | AccountListDto | AccountDetailDto | undefined
>(() =>
  apiMode
    ? apiSelectedAccount.value
    : accountQuery.value
      ? demoAccountProvider.findAccountById(accountQuery.value)
      : undefined,
);
const selectedTier = computed(() => {
  const account = selectedAccount.value;
  if (!account) return 'Not available';
  return 'tier' in account
    ? (account.tier ?? 'Not available')
    : (account.analysis?.tier ?? 'Not available');
});
const invalidAccount = computed(
  () =>
    Boolean(accountQuery.value) &&
    !selectedAccount.value &&
    !apiLoading.value &&
    !apiError.value,
);
const query = ref('');
const industry = ref('all');
const tier = ref<string>('all');
const lifecycle = ref('all');
const persona = ref(defaultContentStudioContext().persona);
const asset = ref(defaultContentStudioContext().asset);
const adType = ref<ContentStudioContext['adType']>('Single Image Ad');
const anchorSignal = ref(
  apiMode
    ? ''
    : 'Product launch / major UI update: Oracle Fusion 26C Quarterly Release',
);
const intro = ref('Run your most demanding workloads with confidence');
const overlay = ref('BUILT FOR THE ENTERPRISE');
const headline = ref('Complete and integrated');
const cta = ref('Learn More');
const destination = ref(apiMode ? '' : 'techsmith.com/oracle');
const advertiser = ref(apiMode ? '' : 'TechSmith');
const creativeImagePreview = ref<string | null>(null);
const logoPreview = ref<string | null>(null);
const copied = ref(false);
const traceOpen = ref(false);
const bestPracticeOpen = ref(true);
const landingEdit = ref(false);
const landingHero = ref(
  '“Complete and integrated” — backed by intelligence, not guesswork.',
);
const landingBody = ref(
  "Complete cloud applications and infrastructure. We mirror Oracle's Communication DNA so every message sounds like Oracle — every claim sourced.",
);
const landingShift = ref(
  'Run your most demanding workloads with confidence. Oracle Health is building a new learning organization for 10,000+ product-development staff.',
);
const landingPreparation = ref(
  'Position a TechSmith enterprise license for the new learning function — reinforced by the Fusion 26C retraining need. (Now)',
);
const landingProof = ref(
  'You lead with benchmarks + enterprise scale. So will we — sourced.',
);
const recipientFirst = ref('');
const recipientLast = ref('');
const greeting = ref('Hi');
const emailSubject = ref(apiMode ? '' : 'cloud infrastructure');
const emailOpening = ref(
  apiMode ? '' : 'Run your most demanding workloads with confidence.',
);
const emailValue = ref(
  apiMode
    ? ''
    : 'Oracle Fusion 26C retraining creates a timely opening for a complete and integrated learning approach.',
);
const emailCta = ref(apiMode ? '' : 'worth a quick look?');
const signatureName = ref('[Your name]');
const signatureTitle = ref('[Your title]');
const signatureUrl = ref(apiMode ? '' : 'techsmith.com');
const emailBestPracticeOpen = ref(true);
const emailGenerating = ref(false);
const emailError = ref('');
const emailTrace = ref<OutreachEmailGenerationResponse['traceability']>();
const linkedinConnection = ref(
  'Hi [First name] — I noticed Oracle is hiring for field marketing across Government, Defense and Intelligence. I work with TechSmith on enterprise enablement and would value connecting.',
);
const linkedinFirstMessage = ref(
  'Thanks for connecting. The hiring signal suggests a timely focus on demand generation and field marketing. TechSmith helps enterprise teams prepare targeted, source-grounded enablement. Worth a quick look?',
);
const linkedinEdit = ref(false);
const linkedinCopied = ref(false);
const linkedinConnectionValid = computed(
  () => linkedinConnection.value.trim().length <= 300,
);
const salesEdit = ref(false);
const salesCopied = ref(false);
const salesDraft = ref<SalesTalkingPointsDraft>({
  openingShift:
    'Oracle is hiring a Sr. Field Marketing Specialist across Government, Defense and Intelligence — a timely signal for customer events, executive roundtables, workshops, webinars and community programs.',
  thinkingMatch:
    'Run your most demanding workloads with confidence. Match Oracle’s technical-authoritative, enterprise-confident language across cloud infrastructure, autonomous database and AI without fluffy claims or underselling security.',
  angles: {
    value:
      'Help VP Sales connect enterprise learning readiness to productive, confident customer conversations.',
    proof:
      'Lead with sourced enterprise evidence and a clear, technical point of view.',
    timing:
      'Now — the field marketing hiring signal creates a timely opening for a sourced first view.',
  },
  objections: [
    {
      objection: 'We have limited resources for another enablement initiative.',
      response:
        'Start with one sourced first view for the current hiring window and expand only when the team sees value.',
    },
  ],
  nextStep:
    'Share a sourced first view with the VP Sales team and focus the discussion on productivity, enterprise deals and the current Now window.',
});
const resetSalesDraft = () => {
  salesDraft.value = {
    openingShift: `Oracle is hiring a Sr. Field Marketing Specialist across Government, Defense and Intelligence — a timely signal for customer events, executive roundtables, workshops, webinars and community programs.`,
    thinkingMatch:
      'Run your most demanding workloads with confidence. Match Oracle’s technical-authoritative, enterprise-confident language across cloud infrastructure, autonomous database and AI without fluffy claims or underselling security.',
    angles: {
      value:
        'Help VP Sales connect enterprise learning readiness to productive, confident customer conversations.',
      proof:
        'Lead with sourced enterprise evidence and a clear, technical point of view.',
      timing:
        'Now — the field marketing hiring signal creates a timely opening for a sourced first view.',
    },
    objections: [
      {
        objection:
          'We have limited resources for another enablement initiative.',
        response:
          'Start with one sourced first view for the current hiring window and expand only when the team sees value.',
      },
    ],
    nextStep: `Share a sourced first view with the VP Sales team and focus the discussion on productivity, enterprise deals and the current Now window for ${advertiser.value}.`,
  };
};
const salesPlainText = computed(
  () =>
    `OPEN WITH WHAT CHANGED (VP SALES)\n${salesDraft.value.openingShift}\n\nHOW THEY THINK — MATCH IT\n${salesDraft.value.thinkingMatch}\n\nTHREE ANGLES\nValue — ${salesDraft.value.angles.value}\nProof — ${salesDraft.value.angles.proof}\nTiming — ${salesDraft.value.angles.timing}\n\nLIKELY OBJECTIONS → RESPONSE\n${salesDraft.value.objections.map((item) => `Objection — ${item.objection}\nResponse — ${item.response}`).join('\n')}\n\nNEXT STEP\n${salesDraft.value.nextStep}`,
);
const copySalesDraft = async () => {
  await navigator.clipboard?.writeText(salesPlainText.value);
  salesCopied.value = true;
  window.setTimeout(() => (salesCopied.value = false), 1200);
};
const emailBodyText = computed(
  () =>
    `${greeting.value} ${recipientFirst.value || 'Head of Marketing'},\n\n${emailOpening.value}\n\n${emailValue.value}\n\n${emailCta.value}\n\n${signatureName.value}\n${signatureTitle.value}\n${advertiser.value}\n${signatureUrl.value}`,
);
const emailWordCount = computed(
  () => emailBodyText.value.trim().split(/\s+/).filter(Boolean).length,
);
const emailChecks = computed(() => ({
  subjectLength:
    emailSubject.value.trim().split(/\s+/).filter(Boolean).length >= 2 &&
    emailSubject.value.trim().split(/\s+/).filter(Boolean).length <= 4,
  lowercase: emailSubject.value === emailSubject.value.toLowerCase(),
  under100: emailWordCount.value < 100,
}));
const submitEmailGeneration = async (parts: OutreachEmailPart[]) => {
  if (
    !apiMode ||
    !accountQuery.value ||
    !anchorSignal.value ||
    emailGenerating.value
  )
    return;
  emailGenerating.value = true;
  emailError.value = '';
  try {
    const result = await generateOutreachEmail(accountQuery.value, {
      persona: persona.value,
      anchorSignalId: anchorSignal.value,
      parts,
      currentDraft: {
        subject: emailSubject.value,
        opening: emailOpening.value,
        value: emailValue.value,
        cta: emailCta.value,
      },
    });
    if (
      parts.includes('subject') &&
      result.generatedParts.subject !== undefined
    )
      emailSubject.value = result.generatedParts.subject;
    if (
      parts.includes('opening') &&
      result.generatedParts.opening !== undefined
    )
      emailOpening.value = result.generatedParts.opening;
    if (parts.includes('value') && result.generatedParts.value !== undefined)
      emailValue.value = result.generatedParts.value;
    if (parts.includes('cta') && result.generatedParts.cta !== undefined)
      emailCta.value = result.generatedParts.cta;
    emailTrace.value = result.traceability;
  } catch {
    emailError.value =
      'Outreach generation is unavailable right now. Your draft was not changed.';
  } finally {
    emailGenerating.value = false;
  }
};
const resetEmail = async () => {
  if (apiMode) {
    await submitEmailGeneration(['subject', 'opening', 'value', 'cta']);
    return;
  }
  emailSubject.value = 'cloud infrastructure';
  emailOpening.value = 'Run your most demanding workloads with confidence.';
  emailValue.value =
    'Oracle Fusion 26C retraining creates a timely opening for a complete and integrated learning approach.';
  emailCta.value = 'worth a quick look?';
};
type EmailGeneratedPart = 'subject' | 'opening' | 'value' | 'cta';
const regenerateEmailPart = async (part: EmailGeneratedPart) => {
  if (apiMode) {
    await submitEmailGeneration([part]);
    return;
  }
  const accountName = selectedAccount.value?.name ?? 'Oracle';
  const companyName = advertiser.value.trim() || 'TechSmith';
  const signal = anchorSignal.value.split(':')[0]?.trim() || 'account signal';
  if (part === 'subject') emailSubject.value = `${signal.toLowerCase()} update`;
  if (part === 'opening')
    emailOpening.value = `${accountName}'s ${signal.toLowerCase()} points to a timely enablement need.`;
  if (part === 'value')
    emailValue.value = `${companyName} can turn that ${signal.toLowerCase()} into a clear, source-grounded learning motion.`;
  if (part === 'cta') emailCta.value = `worth a quick look for ${accountName}?`;
};
const resetLinkedinOutreach = () => {
  linkedinConnection.value = `Hi [First name] — I noticed Oracle is hiring for field marketing across Government, Defense and Intelligence. I work with ${advertiser.value} on enterprise enablement and would value connecting.`;
  linkedinFirstMessage.value = `Thanks for connecting. The hiring signal suggests a timely focus on demand generation and field marketing. ${advertiser.value} helps enterprise teams prepare targeted, source-grounded enablement. Worth a quick look?`;
};
const copyLinkedinOutreach = async () => {
  await navigator.clipboard?.writeText(
    `CONNECTION NOTE\n${linkedinConnection.value}\n\nFIRST MESSAGE (AFTER THEY ACCEPT)\n${linkedinFirstMessage.value}`,
  );
  linkedinCopied.value = true;
  window.setTimeout(() => (linkedinCopied.value = false), 1200);
};
const generatedDefaults = () => {
  intro.value = 'Run your most demanding workloads with confidence';
  overlay.value = 'BUILT FOR THE ENTERPRISE';
  headline.value = 'Complete and integrated';
  cta.value = 'Learn More';
  destination.value = 'techsmith.com/oracle';
  landingHero.value =
    '“Complete and integrated” — backed by intelligence, not guesswork.';
  landingBody.value = `Complete cloud applications and infrastructure. We mirror ${advertiser.value}'s Communication DNA so every message sounds like Oracle — every claim sourced.`;
  landingShift.value =
    'Run your most demanding workloads with confidence. Oracle Health is building a new learning organization for 10,000+ product-development staff.';
  landingPreparation.value = `Position a ${advertiser.value} enterprise license for the new learning function — reinforced by the Fusion 26C retraining need. (Now)`;
  landingProof.value =
    'You lead with benchmarks + enterprise scale. So will we — sourced.';
};
const selectedDna = computed(() =>
  apiMode
    ? undefined
    : accountQuery.value
      ? demoAccountProvider.findCommunicationDna(accountQuery.value)
      : undefined,
);
const copyContent = async () => {
  await navigator.clipboard?.writeText(
    `${intro.value}\n${overlay.value}\n${headline.value}\n${cta.value}`,
  );
  copied.value = true;
  window.setTimeout(() => (copied.value = false), 1200);
};
const copyEmailContent = async () => {
  await navigator.clipboard?.writeText(emailBodyText.value);
  copied.value = true;
  window.setTimeout(() => (copied.value = false), 1200);
};
const handleCreativeImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file?.type.startsWith('image/'))
    creativeImagePreview.value = URL.createObjectURL(file);
};
const handleLogo = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file?.type.startsWith('image/'))
    logoPreview.value = URL.createObjectURL(file);
};
const clearCreativeImage = () => (creativeImagePreview.value = null);
const clearLogo = () => (logoPreview.value = null);
watch(selectedAccount, (account) => {
  if (account && !apiMode) generatedDefaults();
});
const resetApiSelectedContext = () => {
  apiSelectedAccount.value = undefined;
  apiSelectedSignals.value = [];
  apiSelectedDna.value = undefined;
  anchorSignal.value = '';
  emailTrace.value = undefined;
  emailError.value = '';
  emailSubject.value = '';
  emailOpening.value = '';
  emailValue.value = '';
  emailCta.value = '';
};
const loadSelectedApiAccount = async (id: string | null) => {
  const generation = ++accountLoadGeneration;
  resetApiSelectedContext();
  apiSelectedError.value = '';
  if (!id) {
    apiSelectedLoading.value = false;
    return;
  }
  apiSelectedLoading.value = true;
  try {
    const account = await getAccount(id);
    const [signals, dna] = await Promise.all([
      getAccountSignals(id),
      getCommunicationDna(id),
    ]);
    if (generation !== accountLoadGeneration) return;
    apiSelectedAccount.value = account;
    apiSelectedSignals.value = signals.items.filter(
      (signal) => signal.isActive,
    );
    apiSelectedDna.value = dna;
    anchorSignal.value = apiSelectedSignals.value[0]?.id ?? '';
  } catch (error) {
    if (generation !== accountLoadGeneration) return;
    apiSelectedError.value =
      error instanceof ApiRequestError && error.status === 404
        ? 'Account not found'
        : 'Content Studio data is unavailable right now.';
  } finally {
    if (generation === accountLoadGeneration) apiSelectedLoading.value = false;
  }
};
const loadApiAccounts = async () => {
  if (!apiMode) return;
  apiLoading.value = true;
  apiError.value = '';
  try {
    apiAccounts.value = await listAccounts();
  } catch (error) {
    apiError.value =
      error instanceof Error
        ? error.message
        : 'Content Studio data is unavailable right now.';
  } finally {
    apiLoading.value = false;
    if (!apiError.value) void loadSelectedApiAccount(accountQuery.value);
  }
};
onMounted(() => {
  if (apiMode) void loadApiAccounts();
});
watch(accountQuery, (id, previous) => {
  if (apiMode && id !== previous && !apiLoading.value)
    void loadSelectedApiAccount(id);
});
const industries = computed(() =>
  apiMode
    ? [
        ...new Set(
          apiAccounts.value
            .map((account) => account.industry)
            .filter((value): value is string => Boolean(value)),
        ),
      ]
    : [...new Set(accounts.map((account) => account.industry))],
);
const tiers = computed(() =>
  apiMode
    ? [
        ...new Set(
          apiAccounts.value
            .map((account) => account.analysis?.tier)
            .filter((value): value is string => Boolean(value)),
        ),
      ]
    : ['Focus Accounts', 'Tier 1', 'Tier 2', 'Below ICP'],
);
const lifecycles = computed(() =>
  apiMode
    ? [...new Set(apiAccounts.value.map((account) => account.lifecycle))]
    : [...new Set(Object.values(contentStudioLifecycle))],
);
const filteredAccounts = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase();
  if (apiMode)
    return apiAccounts.value
      .filter((account) => {
        const searchable =
          `${account.name} ${account.industry ?? ''} ${account.hq ?? ''}`.toLocaleLowerCase();
        return (
          (!needle || searchable.includes(needle)) &&
          (industry.value === 'all' || account.industry === industry.value) &&
          (tier.value === 'all' || account.analysis?.tier === tier.value) &&
          (lifecycle.value === 'all' || account.lifecycle === lifecycle.value)
        );
      })
      .map((account) => ({
        ...account,
        location: account.hq ?? 'Not available',
        tier: account.analysis?.tier ?? null,
      }));
  return accounts.filter((account) => {
    const searchable =
      `${account.name} ${account.industry} ${account.location}`.toLocaleLowerCase();
    return (
      (!needle || searchable.includes(needle)) &&
      (industry.value === 'all' || account.industry === industry.value) &&
      (tier.value === 'all' || account.tier === tier.value) &&
      (lifecycle.value === 'all' ||
        contentStudioLifecycle[account.id] === lifecycle.value)
    );
  });
});
const accountResultLabel = computed(() =>
  query.value ||
  industry.value !== 'all' ||
  tier.value !== 'all' ||
  lifecycle.value !== 'all'
    ? `${filteredAccounts.value.length} of ${apiMode ? apiAccounts.value.length : 140}`
    : apiMode
      ? `${apiAccounts.value.length} of ${apiAccounts.value.length}`
      : '140 of 140',
);
const chooseAccount = (account: DemoAccountIdentity | AccountListDto) =>
  router.push({ path: '/demo/content-studio', query: { account: account.id } });
const accountResonance = (account: DemoAccountIdentity | AccountListDto) =>
  'resonance' in account
    ? account.resonance
    : (account.analysis?.resonanceScore ?? 'Not available');
const accountNextBestAction = (
  account: DemoAccountIdentity | AccountListDto,
) =>
  'nextBestAction' in account
    ? account.nextBestAction
    : (account.analysis?.nextBestAction ?? 'Not available');
const accountLifecycle = (account: DemoAccountIdentity | AccountListDto) =>
  'location' in account
    ? contentStudioLifecycle[account.id]
    : account.lifecycle;
const clearFilters = () => {
  query.value = '';
  industry.value = 'all';
  tier.value = 'all';
  lifecycle.value = 'all';
};
</script>

<template>
  <section class="studio-page" aria-labelledby="studio-title">
    <template v-if="apiMode && apiLoading">
      <div class="studio-page__invalid" aria-live="polite">
        <h1 id="studio-title">Loading Content Studio…</h1>
      </div>
    </template>
    <template v-else-if="apiMode && apiError">
      <div class="studio-page__invalid" role="alert">
        <h1 id="studio-title">Content Studio unavailable</h1>
        <p>{{ apiError }}</p>
        <button type="button" @click="loadApiAccounts">Retry</button>
      </div>
    </template>
    <template v-else-if="apiMode && apiSelectedLoading">
      <div class="studio-page__invalid" aria-live="polite">
        <h1 id="studio-title">Loading account context…</h1>
      </div>
    </template>
    <template v-else-if="apiMode && apiSelectedError">
      <div class="studio-page__invalid" role="alert">
        <h1 id="studio-title">
          {{
            apiSelectedError === 'Account not found'
              ? 'Account not found'
              : 'Content Studio unavailable'
          }}
        </h1>
        <p>{{ apiSelectedError }}</p>
        <button type="button" @click="loadSelectedApiAccount(accountQuery)">
          Retry
        </button>
      </div>
    </template>
    <template v-else-if="invalidAccount">
      <div class="studio-page__invalid" role="alert">
        <h1 id="studio-title">Account not found</h1>
        <p>The requested account context is not available in this Demo.</p>
        <button type="button" @click="router.push('/demo/content-studio')">
          Back to account selection
        </button>
      </div>
    </template>
    <template v-else-if="selectedAccount">
      <header class="studio-page__header">
        <div>
          <p class="studio-page__eyebrow">CONTENT STUDIO</p>
          <h1 id="studio-title">Content Studio</h1>
          <p>
            {{
              apiMode
                ? `Build source-grounded content for ${selectedAccount.name}.`
                : `Everything you need to build a LinkedIn Ad for ${selectedAccount.name} — every part sourced.`
            }}
          </p>
        </div>
      </header>
      <section
        class="studio-page__context studio-page__context--editor"
        aria-label="Content context"
      >
        <h2 class="sr-only">Build context</h2>
        <button type="button" @click="router.push('/demo/content-studio')">
          ← Accounts
        </button>
        <strong>{{ selectedAccount.name }}</strong
        ><span>{{ selectedTier }}</span>
        <label
          >Persona<select v-model="persona" aria-label="Persona">
            <option
              v-for="item in contentStudioPersonas"
              :key="item.id"
              :value="item.id"
            >
              {{
                item.id === 'marketing' || item.id === 'sales'
                  ? `${item.label} · signal match`
                  : item.label
              }}
            </option>
          </select></label
        >
        <label class="studio-page__context-wide"
          >Anchor Signal<select
            v-model="anchorSignal"
            aria-label="Anchor Signal"
          >
            <template v-if="!apiMode"
              ><option
                v-for="signal in contentStudioAnchorSignals"
                :key="signal.id"
                :value="signal.label"
              >
                {{ signal.label }}
              </option></template
            >
            <template v-else
              ><option
                v-for="signal in apiSelectedSignals"
                :key="signal.id"
                :value="signal.id"
              >
                {{ signal.type }}: {{ signal.title }}
              </option></template
            >
          </select></label
        >
        <p
          v-if="apiMode && !apiSelectedSignals.length"
          class="studio-empty-signal"
          role="status"
        >
          No active anchor signal is available for this account.
        </p>
        <label class="studio-page__context-meta studio-company-input"
          >YOUR COMPANY<input v-model="advertiser" aria-label="Your company" />
        </label>
        <div class="studio-page__context-meta studio-logo-input">
          COMPANY LOGO<input
            id="company-logo-input"
            class="sr-only"
            type="file"
            accept="image/*"
            aria-label="Upload company logo"
            @change="handleLogo"
          />
          <label class="upload-trigger" for="company-logo-input">Upload</label>
          <span v-if="logoPreview"
            ><img :src="logoPreview" alt="Company logo preview" /><button
              type="button"
              @click="clearLogo"
            >
              Clear
            </button></span
          >
          <span v-else>Upload</span>
        </div>
      </section>
      <nav class="studio-asset-tabs" aria-label="Content asset type">
        <button
          v-for="item in contentStudioAssets"
          :key="item"
          type="button"
          :class="{ active: item === asset }"
          @click="asset = item"
        >
          {{ item }}
        </button>
      </nav>
      <template v-if="apiMode && asset !== 'Outreach Email'">
        <section class="studio-secondary-state" aria-live="polite">
          <h2>{{ asset }}</h2>
          <p>
            Generation for this asset is not available from the current backend.
          </p>
          <button type="button" disabled>Generate</button>
        </section>
      </template>
      <template v-else-if="asset === 'Landing Page'">
        <section class="landing-workspace">
          <aside class="landing-guidance">
            <h2>Landing Page</h2>
            <p>
              • Generated from Oracle's Communication DNA + the anchor signal.
            </p>
            <p>• Editable, copyable — sources on the right.</p>
            <p>• The full parameterized workspace rolls out here next.</p>
          </aside>
          <div class="landing-draft-region">
            <article class="landing-draft">
              <header>
                <span>CONSIDERATION</span>
                <div>
                  <button type="button" @click="landingEdit = !landingEdit">
                    Edit</button
                  ><button type="button" @click="generatedDefaults">
                    Regenerate</button
                  ><button type="button" @click="copyContent">
                    {{ copied ? 'Copied' : 'Copy' }}</button
                  ><button type="button" disabled>Export</button>
                </div>
              </header>
              <div class="landing-microsite">
                <section class="landing-hero">
                  <small>MICRO-SITE · ORACLE</small
                  ><input
                    v-if="landingEdit"
                    v-model="landingHero"
                    aria-label="Landing hero headline"
                  />
                  <h2 v-else>{{ landingHero }}</h2>
                  <textarea
                    v-if="landingEdit"
                    v-model="landingBody"
                    aria-label="Landing hero body"
                  />
                  <p v-else>{{ landingBody }}</p>
                  <button type="button">Talk to sales</button>
                </section>
                <section>
                  <small>THE SHIFT YOU ARE NAVIGATING</small
                  ><textarea
                    v-if="landingEdit"
                    v-model="landingShift"
                    aria-label="Landing shift"
                  />
                  <p v-else>{{ landingShift }}</p>
                </section>
                <section>
                  <small>WHAT WE WOULD PREPARE FOR ORACLE</small
                  ><textarea
                    v-if="landingEdit"
                    v-model="landingPreparation"
                    aria-label="Landing preparation"
                  />
                  <p v-else>{{ landingPreparation }}</p>
                  <ul>
                    <li>Air-cover ad to warm the account</li>
                    <li>Personalized 1:1 email + LinkedIn outreach</li>
                    <li>Rep-ready talking points for the call</li>
                  </ul>
                </section>
                <footer>
                  <textarea
                    v-if="landingEdit"
                    v-model="landingProof"
                    aria-label="Landing proof footer"
                  />
                  <p v-else>{{ landingProof }}</p>
                </footer>
              </div>
            </article>
            <button
              class="studio-traceability"
              type="button"
              @click="traceOpen = !traceOpen"
            >
              {{ traceOpen ? '▾' : '▸' }} Traceability — where every part comes
              from <span>?</span>
            </button>
            <div v-if="traceOpen" class="studio-trace-detail">
              Communication DNA: {{ selectedDna?.tone.status || 'DERIVED' }} ·
              Anchor Signal: SOURCE_BACKED · CTA Pattern: DERIVED
            </div>
          </div>
        </section>
      </template>
      <template v-else-if="asset === 'Sales Talking Points'">
        <section class="sales-talking-points-workspace">
          <aside class="sales-guidance">
            <h2>Sales Talking Points</h2>
            <p>• Generated from Oracle Communication DNA + anchor signal.</p>
            <p>• Editable, copyable — sources on the right.</p>
            <p>
              • Prepare call framing and objection handling in the prospect's
              language.
            </p>
          </aside>
          <div class="sales-draft-region">
            <article class="sales-draft-card">
              <header>
                <span>DECISION</span>
                <h2>Sales Talking Points</h2>
                <div>
                  <button type="button" @click="salesEdit = !salesEdit">
                    Edit</button
                  ><button type="button" @click="resetSalesDraft">
                    Regenerate</button
                  ><button type="button" @click="copySalesDraft">
                    {{ salesCopied ? 'Copied' : 'Copy' }}</button
                  ><button type="button" disabled aria-disabled="true">
                    Export
                  </button>
                </div>
              </header>
              <div class="sales-draft-body">
                <section>
                  <h3>OPEN WITH WHAT CHANGED <small>(VP SALES)</small></h3>
                  <textarea
                    v-if="salesEdit"
                    v-model="salesDraft.openingShift"
                    aria-label="Opening shift"
                    rows="3"
                  />
                  <p v-else>{{ salesDraft.openingShift }}</p>
                </section>
                <section>
                  <h3>
                    HOW THEY THINK — MATCH IT
                    <small>· REFLECT THEIR PROBLEM</small>
                  </h3>
                  <textarea
                    v-if="salesEdit"
                    v-model="salesDraft.thinkingMatch"
                    aria-label="Thinking match"
                    rows="3"
                  />
                  <p v-else>{{ salesDraft.thinkingMatch }}</p>
                </section>
                <section>
                  <h3>THREE ANGLES</h3>
                  <div class="sales-angles">
                    <label
                      >Value<textarea
                        v-if="salesEdit"
                        v-model="salesDraft.angles.value"
                        aria-label="Value angle"
                        rows="2"
                      />
                      <p v-else>{{ salesDraft.angles.value }}</p></label
                    ><label
                      >Proof<textarea
                        v-if="salesEdit"
                        v-model="salesDraft.angles.proof"
                        aria-label="Proof angle"
                        rows="2"
                      />
                      <p v-else>{{ salesDraft.angles.proof }}</p></label
                    ><label
                      >Timing<textarea
                        v-if="salesEdit"
                        v-model="salesDraft.angles.timing"
                        aria-label="Timing angle"
                        rows="2"
                      />
                      <p v-else>{{ salesDraft.angles.timing }}</p></label
                    >
                  </div>
                </section>
                <section>
                  <h3>LIKELY OBJECTIONS → RESPONSE</h3>
                  <div
                    v-for="(item, index) in salesDraft.objections"
                    :key="index"
                    class="sales-objection"
                  >
                    <label
                      >Objection<textarea
                        v-if="salesEdit"
                        v-model="item.objection"
                        aria-label="Objection"
                        rows="2"
                      />
                      <p v-else>{{ item.objection }}</p></label
                    ><label
                      >Response<textarea
                        v-if="salesEdit"
                        v-model="item.response"
                        aria-label="Objection response"
                        rows="2"
                      />
                      <p v-else>{{ item.response }}</p></label
                    ><small>DERIVED seller-preparation hypothesis</small>
                  </div>
                </section>
                <section>
                  <h3>NEXT STEP</h3>
                  <textarea
                    v-if="salesEdit"
                    v-model="salesDraft.nextStep"
                    aria-label="Next step"
                    rows="2"
                  />
                  <p v-else>{{ salesDraft.nextStep }}</p>
                </section>
                <p class="sales-traceability">
                  Traceability · DERIVED from Communication DNA + anchor signal
                </p>
              </div>
            </article>
            <button
              class="studio-traceability"
              type="button"
              @click="traceOpen = !traceOpen"
            >
              {{ traceOpen ? '▾' : '▸' }} Traceability — where every part comes
              from <span>?</span>
            </button>
          </div>
        </section>
      </template>
      <template v-else-if="asset === 'LinkedIn Outreach'">
        <section class="linkedin-outreach-workspace">
          <aside class="linkedin-outreach-guidance">
            <h2>LinkedIn Outreach</h2>
            <p>• Derived from Communication DNA + the anchor signal.</p>
            <p>• Editable, copyable — no platform connection.</p>
            <p>• Keep the connection note concise and human.</p>
          </aside>
          <div class="linkedin-outreach-region">
            <article class="linkedin-outreach-card">
              <header>
                <span>DECISION</span>
                <h2>LinkedIn Outreach</h2>
                <div>
                  <button type="button" @click="linkedinEdit = !linkedinEdit">
                    Edit
                  </button>
                  <button type="button" @click="resetLinkedinOutreach">
                    Regenerate
                  </button>
                  <button type="button" @click="copyLinkedinOutreach">
                    {{ linkedinCopied ? 'Copied' : 'Copy' }}
                  </button>
                  <button type="button" disabled aria-disabled="true">
                    Export
                  </button>
                </div>
              </header>
              <div class="linkedin-outreach-body">
                <label>
                  CONNECTION NOTE (MAX 300 CHARACTERS)
                  <textarea
                    v-model="linkedinConnection"
                    :readonly="!linkedinEdit"
                    rows="4"
                    aria-label="Connection note"
                    :aria-invalid="!linkedinConnectionValid"
                  />
                  <small :data-valid="linkedinConnectionValid">
                    {{ linkedinConnection.length }}/300 characters
                  </small>
                </label>
                <label>
                  FIRST MESSAGE (AFTER THEY ACCEPT)
                  <textarea
                    v-model="linkedinFirstMessage"
                    :readonly="!linkedinEdit"
                    rows="5"
                    aria-label="First message"
                  />
                </label>
                <p class="linkedin-outreach-traceability">
                  Traceability · DERIVED from Communication DNA + anchor signal
                </p>
              </div>
            </article>
            <button
              class="studio-traceability"
              type="button"
              @click="traceOpen = !traceOpen"
            >
              {{ traceOpen ? '▾' : '▸' }} Traceability — where every part comes
              from <span>?</span>
            </button>
            <div v-if="traceOpen" class="studio-trace-detail">
              Communication DNA: DERIVED · Anchor Signal: SOURCE_BACKED ·
              Platform: manual LinkedIn workflow only
            </div>
          </div>
        </section>
      </template>
      <template v-else-if="asset === 'Outreach Email'">
        <section class="email-workspace">
          <div class="email-editor">
            <div class="email-best">
              <button
                type="button"
                @click="emailBestPracticeOpen = !emailBestPracticeOpen"
              >
                {{ emailBestPracticeOpen ? '▾' : '▸' }} Best practice — Cold
                Email
              </button>
              <ul v-if="emailBestPracticeOpen">
                <li>
                  Subject: 2–4 words, lowercase — personal note, not campaign
                </li>
                <li>Open with the prospect's problem, not who you are</li>
                <li>Quantify value with a specific number or peer result</li>
                <li>Keep entire email under 100 words</li>
              </ul>
            </div>
            <button
              class="studio-generate"
              type="button"
              :disabled="
                emailGenerating || (apiMode && !apiSelectedSignals.length)
              "
              @click="resetEmail"
            >
              ↻ Generate all parts
            </button>
            <p v-if="emailGenerating" role="status">Generating outreach…</p>
            <p v-if="emailError" role="alert">{{ emailError }}</p>
            ><label class="studio-field"
              >Recipient<input
                v-model="recipientFirst"
                aria-label="First name"
                placeholder="First name"
              /><input
                v-model="recipientLast"
                aria-label="Last name"
                placeholder="Last name"
              /><select v-model="greeting" aria-label="Greeting style">
                <option>Hi</option>
              </select></label
            ><label class="studio-field"
              >1. Subject line<input
                v-model="emailSubject"
                aria-label="Subject line"
              /><button
                type="button"
                :disabled="
                  emailGenerating || (apiMode && !apiSelectedSignals.length)
                "
                @click="regenerateEmailPart('subject')"
              >
                Regenerate
              </button></label
            ><label class="studio-field"
              >2. Opening — the prospect's problem<textarea
                v-model="emailOpening"
                aria-label="Opening"
                rows="2"
              /><button
                type="button"
                :disabled="
                  emailGenerating || (apiMode && !apiSelectedSignals.length)
                "
                @click="regenerateEmailPart('opening')"
              >
                Regenerate
              </button></label
            ><label class="studio-field"
              >3. Value — one concrete sentence<textarea
                v-model="emailValue"
                aria-label="Value"
                rows="2"
              /><button
                type="button"
                :disabled="
                  emailGenerating || (apiMode && !apiSelectedSignals.length)
                "
                @click="regenerateEmailPart('value')"
              >
                Regenerate
              </button></label
            ><label class="studio-field"
              >4. CTA — interest, not a meeting<input
                v-model="emailCta"
                aria-label="CTA"
              /><button
                type="button"
                :disabled="
                  emailGenerating || (apiMode && !apiSelectedSignals.length)
                "
                @click="regenerateEmailPart('cta')"
              >
                Regenerate
              </button></label
            ><label class="studio-field"
              >Signature<input
                v-model="signatureName"
                aria-label="Signature name"
                placeholder="[Your name]" /><input
                v-model="signatureTitle"
                aria-label="Signature title"
                placeholder="[Your title]" /><input
                v-model="advertiser"
                aria-label="Signature company" /><input
                v-model="signatureUrl"
                aria-label="Signature URL"
            /></label>
          </div>
          <div class="email-preview-column">
            <article class="email-preview">
              <header>
                <span>Email preview · plain text</span
                ><button type="button" @click="copyEmailContent">
                  {{ copied ? 'Copied' : 'Copy' }}</button
                ><button type="button" disabled>Export .txt</button>
              </header>
              <div class="email-paper">
                <p>
                  <b>FROM</b><br />{{ signatureName }} &lt;{{
                    apiMode ? '[your email]' : 'you@techsmith.com'
                  }}&gt;
                </p>
                <p>
                  <b>TO</b><br />{{ recipientFirst || 'Head of Marketing' }}
                  {{ recipientLast }} · {{ selectedAccount.name }}
                </p>
                <p><b>SUBJECT</b><br />{{ emailSubject }}</p>
                <pre>{{ emailBodyText }}</pre>
                <small
                  >✓ Plain text · ✓ Interest CTA ·
                  {{
                    apiMode
                      ? emailTrace
                        ? 'Backend generation trace available'
                        : 'No generation trace available yet'
                      : '✓ Source grounded'
                  }}</small
                >
              </div>
            </article>
            <div class="email-checks">
              <h3>Cold-email checks</h3>
              <p :data-valid="emailChecks.subjectLength">
                {{ emailChecks.subjectLength ? '✓' : '!' }} Subject 2–4 words
              </p>
              <p :data-valid="emailChecks.lowercase">
                {{ emailChecks.lowercase ? '✓' : '!' }} Subject lowercase
              </p>
              <p :data-valid="emailChecks.under100">
                {{ emailChecks.under100 ? '✓' : '!' }} Under 100 words
              </p>
              <p data-valid="true">✓ Opens with the prospect, not you</p>
              <p data-valid="true">✓ Plain text — no links in body</p>
              <p data-valid="true">✓ No attachments</p>
            </div>
            <button
              class="studio-traceability"
              type="button"
              @click="traceOpen = !traceOpen"
            >
              ▸ Traceability ·
              {{
                apiMode && !emailTrace
                  ? 'No generation trace available yet'
                  : 'backend generation trace available'
              }}
            </button>
            <div v-if="traceOpen && apiMode" class="studio-trace-detail">
              <template v-if="emailTrace">
                <p>
                  Anchor Signal:
                  {{
                    apiSelectedSignals.find(
                      (signal) => signal.id === emailTrace?.anchorSignalId,
                    )?.title || emailTrace.anchorSignalId
                  }}
                </p>
                <p>
                  Supporting Signals:
                  {{
                    emailTrace.supportingSignalIds.length
                      ? emailTrace.supportingSignalIds
                          .map(
                            (id) =>
                              apiSelectedSignals.find(
                                (signal) => signal.id === id,
                              )?.title || id,
                          )
                          .join(', ')
                      : 'None'
                  }}
                </p>
                <p>
                  Communication DNA used:
                  {{ emailTrace.communicationDnaUsed ? 'Yes' : 'No' }}
                </p>
                <p>
                  Account analysis used:
                  {{ emailTrace.analysisUsed ? 'Yes' : 'No' }}
                </p>
              </template>
              <p v-else>No generation trace available yet</p>
            </div>
          </div>
        </section>
      </template>
      <template
        v-else-if="asset === 'LinkedIn Ad' && adType === 'Single Image Ad'"
      >
        <section class="studio-editor-workspace">
          <div class="studio-editor-column">
            <div class="studio-ad-types">
              <h2>Ad Type — reshapes the parts you need</h2>
              <button
                v-for="type in [
                  'Single Image Ad',
                  'Document Ad',
                  'Thought Leadership Ad',
                ]"
                :key="type"
                type="button"
                :class="['studio-ad-type', { selected: adType === type }]"
                @click="adType = type as ContentStudioContext['adType']"
              >
                <b>{{ type }}</b
                ><small>{{
                  type === 'Document Ad' ? 'CONSIDERATION' : 'AWARENESS'
                }}</small
                ><span>{{
                  type === 'Single Image Ad'
                    ? 'One image, one idea. Cheapest way to warm an account.'
                    : type === 'Document Ad'
                      ? 'Promote a document in-feed for deeper engagement.'
                      : 'Promote an executive post for trust and reach.'
                }}</span>
              </button>
            </div>
            <div class="studio-best-practice">
              <button
                type="button"
                @click="bestPracticeOpen = !bestPracticeOpen"
              >
                {{ bestPracticeOpen ? '▾' : '▸' }} Best practice — Single Image
                Ad
              </button>
              <ul v-if="bestPracticeOpen">
                <li>
                  Front-load the hook — only the first ~150 characters show
                  before “see more”.
                </li>
                <li>
                  One idea per creative. Keep the overlay to 8 words or fewer.
                </li>
                <li>Mirror the account's problem framing, not your product.</li>
                <li>Target frequency 5–8 for a focused ABM pool.</li>
              </ul>
            </div>
            <button
              class="studio-generate"
              type="button"
              @click="generatedDefaults"
            >
              ↻ Generate all parts
            </button>
            <div class="studio-field">
              1. Ad Visual<input
                id="creative-image-input"
                class="sr-only"
                type="file"
                accept="image/*"
                aria-label="Upload image"
                @change="handleCreativeImage"
              /><label class="upload-trigger" for="creative-image-input"
                >Upload image</label
              ><span v-if="creativeImagePreview"
                ><button type="button" @click="clearCreativeImage">
                  Clear image
                </button></span
              >
            </div>
            <label class="studio-field"
              >2. Introductory Text
              <button type="button" @click="generatedDefaults">
                Regenerate</button
              ><textarea
                v-model="intro"
                aria-label="Introductory Text"
                rows="2"
              />
            </label>
            <select v-model="asset" class="sr-only" aria-label="Asset">
              <option v-for="item in contentStudioAssets" :key="item">
                {{ item }}
              </option>
            </select>
            <label class="studio-field"
              >3. Image Text Overlay
              <button
                type="button"
                @click="overlay = 'BUILT FOR THE ENTERPRISE'"
              >
                Regenerate</button
              ><input v-model="overlay"
            /></label>
            <label class="studio-field"
              >4. Ad Headline
              <button
                type="button"
                @click="headline = 'Complete and integrated'"
              >
                Regenerate</button
              ><input v-model="headline"
            /></label>
            <label class="studio-field"
              >5. CTA Button
              <button type="button" @click="cta = 'Learn More'">
                Regenerate</button
              ><input v-model="cta"
            /></label>
            <label class="studio-field"
              >6. Destination URL
              <button
                type="button"
                @click="destination = 'techsmith.com/oracle'"
              >
                Regenerate</button
              ><input v-model="destination"
            /></label>
          </div>
          <div class="studio-preview-column">
            <article class="linkedin-preview">
              <div class="studio-preview-header">
                <span>LINKEDIN AD PREVIEW</span
                ><button type="button" @click="copyContent">
                  {{ copied ? 'Copied' : 'Copy' }}</button
                ><button type="button" disabled aria-disabled="true">
                  Export
                </button>
              </div>
              <header>
                <span class="linkedin-avatar"
                  ><img
                    v-if="logoPreview"
                    :src="logoPreview"
                    :alt="`${advertiser} logo`"
                  /><span v-else>{{
                    advertiser.slice(0, 1).toUpperCase()
                  }}</span></span
                ><span
                  ><b>{{ advertiser }}</b
                  ><small>Promoted</small></span
                >
              </header>
              <p>{{ intro }}</p>
              <div
                class="linkedin-creative"
                :style="
                  creativeImagePreview
                    ? { backgroundImage: `url(${creativeImagePreview})` }
                    : undefined
                "
              >
                <strong>{{ overlay }}</strong>
              </div>
              <footer>
                <b>{{ headline }}</b
                ><a
                  :href="destination"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ cta }}</a
                >
              </footer>
              <div class="linkedin-social">
                <span>Like</span><span>Comment</span><span>Share</span
                ><span>Send</span>
              </div>
            </article>
            <button
              class="studio-traceability"
              type="button"
              @click="traceOpen = !traceOpen"
            >
              {{ traceOpen ? '▾' : '▸' }} Traceability — where every part comes
              from <span>?</span>
            </button>
            <div v-if="traceOpen" class="studio-trace-detail">
              Tone: {{ selectedDna?.tone.primary || 'DERIVED' }} · Value
              proposition:
              {{ selectedDna?.valueProposition.status || 'DERIVED' }} · Anchor
              Signal: SOURCE_BACKED
            </div>
          </div>
        </section>
      </template>
      <section v-else class="studio-secondary-state" aria-live="polite">
        <h2>{{ adType }}</h2>
        <p>Local demo state only. Full editor implementation is deferred.</p>
        <button type="button" @click="generatedDefaults">Regenerate</button
        ><button type="button" @click="copyContent">
          {{ copied ? 'Copied' : 'Copy' }}
        </button>
      </section>
    </template>
    <template v-else>
      <header class="studio-page__header">
        <div>
          <h1 id="studio-title">Content Studio</h1>
          <p>Choose an account to activate — then build every asset for it.</p>
        </div>
      </header>
      <form class="studio-page__filters" role="search" @submit.prevent>
        <label class="studio-page__search"
          ><span>Search accounts…</span
          ><input
            v-model="query"
            type="search"
            placeholder="Search accounts…"
            aria-label="Search accounts"
        /></label>
        <label
          >Industry<select v-model="industry" aria-label="Industry">
            <option value="all">All industries</option>
            <option v-for="value in industries" :key="value" :value="value">
              {{ value }}
            </option>
          </select></label
        >
        <label
          >Tier<select v-model="tier" aria-label="Tier">
            <option value="all">All tiers</option>
            <option v-for="value in tiers" :key="value" :value="value">
              {{ value }}
            </option>
          </select></label
        >
        <label
          >Lifecycle<select v-model="lifecycle" aria-label="Lifecycle">
            <option value="all">All phases</option>
            <option v-for="value in lifecycles" :key="value">
              {{ value }}
            </option>
          </select></label
        >
        <strong>{{ accountResultLabel }}</strong>
      </form>
      <div class="studio-page__actions">
        <button type="button" @click="clearFilters">Clear filters</button>
      </div>
      <div v-if="filteredAccounts.length" class="studio-page__grid">
        <button
          v-for="account in filteredAccounts"
          :key="account.id"
          class="studio-account-card"
          type="button"
          :aria-label="`Select ${account.name}`"
          @click="chooseAccount(account)"
        >
          <span class="studio-account-card__top">
            <span class="studio-account-card__identity">
              <AccountAvatar :account-id="account.id" :name="account.name" size="sm" />
              <span
                ><strong>{{ account.name }}</strong
                ><small
                  >{{ account.industry }} · {{ account.location }}</small
                ></span
              >
            </span>
            <strong class="studio-account-card__score">{{
              accountResonance(account)
            }}</strong>
          </span>
          <span class="studio-account-card__badges"
            ><span>{{ account.tier }}</span
            ><span>{{ accountLifecycle(account) }}</span></span
          >
          <span class="studio-account-card__signal"
            >● {{ accountNextBestAction(account) }}</span
          >
        </button>
      </div>
      <p v-else class="studio-page__empty" role="status">
        {{
          apiMode
            ? 'No accounts match these filters.'
            : 'No curated demo accounts match these filters.'
        }}
        <button type="button" @click="clearFilters">Clear filters</button>
      </p>
    </template>
  </section>
</template>

<style scoped>
.studio-page {
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--spacing-18);
  padding: var(--spacing-24);
  box-sizing: border-box;
}
.studio-page > * {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}
.studio-page h1,
.studio-page h2,
.studio-page p {
  margin: 0;
}
.studio-page h1 {
  font-size: var(--font-size-30);
}
.studio-page h2 {
  font-size: var(--font-size-16);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.studio-page__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: var(--spacing-16);
}
.studio-page__header button,
.studio-page__actions button,
.studio-page__invalid button {
  padding: var(--spacing-9) var(--spacing-14);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
.studio-page__header p:not(.studio-page__eyebrow) {
  margin-top: var(--spacing-6);
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
}
.studio-page__eyebrow {
  margin-bottom: var(--spacing-6) !important;
  color: var(--color-text-tertiary);
  font: var(--font-size-9)/1.3 var(--font-family-mono);
}
.studio-page__filters {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 190px 190px 190px auto;
  gap: var(--spacing-12);
  align-items: end;
  padding: var(--spacing-14);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.studio-page__filters label,
.studio-page__controls label {
  display: grid;
  gap: var(--spacing-6);
  color: var(--color-text-tertiary);
  font: var(--font-size-10)/1.3 var(--font-family-mono);
  text-transform: uppercase;
}
.studio-page__filters input,
.studio-page__filters select,
.studio-page__controls select {
  min-height: 34px;
  padding: 0 var(--spacing-10);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-input-background);
  color: var(--color-text-primary);
}
.studio-page__filters strong {
  color: var(--color-text-tertiary);
  font: var(--font-size-11)/1.3 var(--font-family-mono);
  white-space: nowrap;
}
.studio-page__actions {
  display: flex;
  justify-content: flex-end;
}
.studio-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-16);
}
.studio-account-card {
  display: grid;
  min-height: 158px;
  gap: var(--spacing-12);
  padding: var(--spacing-16);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
  color: var(--color-text-primary);
  text-align: left;
}
.studio-account-card:hover,
.studio-account-card:focus-visible {
  border-color: var(--color-border-brand);
}
.studio-account-card__top,
.studio-account-card__identity,
.studio-account-card__badges {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--spacing-10);
}
.studio-account-card__identity {
  justify-content: start;
}
.studio-account-card__identity > span:last-child {
  display: grid;
  gap: 3px;
}
.studio-account-card__identity small {
  color: var(--color-text-muted);
  font-size: var(--font-size-11);
}
.studio-account-card__avatar {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: var(--radius-10);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font-weight: 700;
}
.studio-account-card__score {
  color: var(--color-state-success);
  font: var(--font-size-22)/1 var(--font-family-mono);
}
.studio-account-card__badges {
  justify-content: start;
}
.studio-account-card__badges span {
  padding: var(--spacing-4) var(--spacing-8);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-full);
  color: var(--color-brand-light);
  font: var(--font-size-9)/1.2 var(--font-family-mono);
}
.studio-account-card__signal {
  color: var(--color-accent-amber-light);
  font-size: var(--font-size-11);
}
.studio-page__empty,
.studio-page__invalid,
.studio-page__context {
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.studio-page__context--editor {
  display: grid;
  grid-template-columns:
    auto minmax(0, 1fr) minmax(0, 1fr) minmax(180px, 270px)
    minmax(160px, 1fr) minmax(96px, 110px);
  align-items: center;
  gap: 12px;
}
.studio-page__context--editor > * {
  min-width: 0;
  overflow-wrap: anywhere;
}
.studio-page__context--editor > button {
  background: none;
  border: 0;
  color: var(--color-text-secondary);
}
.studio-page__context--editor > label {
  display: grid;
  gap: 4px;
  color: var(--color-text-tertiary);
  font: 10px/1.3 var(--font-family-mono);
  text-transform: uppercase;
}
.studio-page__context--editor select {
  min-height: 34px;
  padding: 0 12px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 7px;
}
.studio-page__context-wide {
  grid-column: 1 / span 3;
}
.studio-page__context-meta {
  color: var(--color-text-tertiary);
  font: 10px/1.4 var(--font-family-mono);
}
.studio-company-input input {
  display: block;
  width: 100%;
  min-width: 180px;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 4px;
  padding: 7px 9px;
  border: 1px solid var(--color-border-default);
  border-radius: 7px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font: 12px var(--font-family-inter);
}
.studio-logo-input input {
  display: block;
  max-width: 170px;
  margin-top: 4px;
  font: 11px var(--font-family-inter);
  color: var(--color-text-primary);
}
.studio-logo-input img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  vertical-align: middle;
  border-radius: 4px;
}
.studio-logo-input button {
  margin-left: 6px;
  border: 0;
  background: none;
  color: var(--color-brand-light);
}
.upload-trigger {
  display: inline-block;
  width: max-content;
  margin-top: 4px;
  padding: 6px 9px;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  cursor: pointer;
  font: 11px var(--font-family-inter);
}
.upload-trigger:focus-visible {
  outline: 2px solid var(--color-brand-light);
  outline-offset: 2px;
}
.studio-asset-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-bottom: 1px solid var(--color-border-subtle);
}
.studio-asset-tabs button {
  min-width: 0;
  min-height: 56px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
  overflow-wrap: anywhere;
}
.studio-asset-tabs button.active {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-brand-light);
}
.studio-editor-workspace {
  display: grid;
  grid-template-columns: 400px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
.studio-editor-column,
.studio-preview-column {
  display: grid;
  gap: 12px;
}
.studio-ad-types,
.studio-best-practice,
.studio-field {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  background: var(--color-card-default);
  color: var(--color-text-secondary);
}
.studio-ad-types h2 {
  font-size: 12px;
}
.studio-ad-type {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px;
  padding: 12px 14px;
  text-align: left;
  border: 1px solid var(--color-border-subtle);
  border-radius: 10px;
  background: transparent;
  color: var(--color-text-primary);
}
.studio-ad-type.selected {
  border-color: var(--color-border-brand);
}
.studio-ad-type small {
  color: var(--color-accent-amber-light);
  font: 10px var(--font-family-mono);
}
.studio-ad-type span {
  grid-column: 1/-1;
  color: var(--color-text-tertiary);
  font-size: 11px;
}
.studio-best-practice {
  background: rgba(244, 182, 90, 0.15);
  border-color: var(--color-border-amber);
}
.studio-best-practice button {
  border: 0;
  background: none;
  color: var(--color-accent-amber-light);
  text-align: left;
}
.studio-best-practice ul {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-secondary);
  font-size: 12px;
}
.studio-generate {
  min-height: 42px;
  border: 0;
  border-radius: 12px;
  background: var(--color-brand-light);
  color: white;
}
.studio-field {
  grid-template-columns: 1fr auto;
  font-size: 13px;
}
.studio-field input:not([type='file']),
.studio-field textarea {
  grid-column: 1/-1;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: 7px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
.studio-field button {
  border: 0;
  background: none;
  color: var(--color-brand-light);
}
.studio-preview-column {
  min-width: 0;
}
.studio-preview-header {
  display: flex;
  gap: 12px;
  align-items: center;
  color: var(--color-brand-light);
  font: 10px var(--font-family-mono);
}
.studio-preview-header span {
  margin-right: auto;
}
.studio-preview-header button {
  border: 0;
  background: none;
  color: var(--color-text-secondary);
}
.studio-preview-header button:disabled {
  color: var(--color-text-muted);
}
.linkedin-preview {
  width: min(560px, 100%);
  height: 520px;
  overflow: hidden;
  border: 1px solid var(--color-border-brand);
  border-radius: 16px;
  background: var(--color-card-default);
  padding: 16px;
  box-sizing: border-box;
}
.linkedin-preview header {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 14px 14px;
}
.linkedin-avatar {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-brand-core);
  color: white;
}
.linkedin-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.linkedin-preview header span:last-child {
  display: grid;
  gap: 2px;
  color: #111;
}
.linkedin-preview header small {
  color: #666;
}
.linkedin-preview > p {
  margin: 0;
  padding: 0 14px 12px;
  color: #111;
  font-size: 13px;
}
.linkedin-creative {
  display: grid;
  min-height: 250px;
  place-items: center;
  background: var(--color-brand-deep);
  background-size: cover;
  background-position: center;
}
.linkedin-creative strong {
  color: white;
  font-size: 28px;
  text-align: center;
}
.linkedin-preview footer {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 14px;
  background: white;
  color: #111;
}
.linkedin-preview footer b {
  flex: 1;
}
.linkedin-preview footer a {
  padding: 7px 12px;
  border: 1px solid var(--color-brand-core);
  border-radius: 999px;
  color: var(--color-brand-deep);
  font-size: 11px;
}
.linkedin-social {
  display: flex;
  justify-content: space-between;
  padding: 10px 18px;
  background: white;
  color: #666;
  font-size: 11px;
}
.studio-traceability {
  min-height: 54px;
  padding: 14px 16px;
  border: 1px solid var(--color-border-default);
  border-radius: 9px;
  background: var(--color-card-default);
  color: var(--color-text-primary);
  text-align: left;
}
.studio-traceability span {
  float: right;
  color: var(--color-brand-light);
}
.studio-trace-detail {
  padding: 12px;
  color: var(--color-text-secondary);
  font-size: 12px;
}
.studio-secondary-state {
  display: grid;
  gap: 14px;
  padding: 24px;
  border: 1px solid var(--color-border-default);
  border-radius: 10px;
  background: var(--color-card-default);
}
.landing-workspace {
  display: grid;
  grid-template-columns: 360px minmax(0, 760px);
  gap: 32px;
  align-items: start;
}
.landing-guidance {
  min-height: 312px;
  padding: 24px 28px;
  border: 1px solid var(--color-border-brand);
  border-radius: 12px;
  background: var(--color-brand-tint-900);
  color: var(--color-text-secondary);
}
.landing-guidance h2 {
  margin: 0 0 14px;
  color: var(--color-brand-light);
  font-size: 20px;
}
.landing-guidance p {
  margin: 14px 0;
  font-size: 16px;
}
.landing-draft-region {
  display: grid;
  gap: 16px;
  width: 760px;
}
.landing-draft {
  height: 720px;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  background: var(--color-card-default);
}
.landing-draft > header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}
.landing-draft > header > span {
  padding: 4px 8px;
  border: 1px solid var(--color-border-amber);
  border-radius: 4px;
  color: var(--color-accent-amber-light);
  font: 10px var(--font-family-mono);
}
.landing-draft > header button {
  margin-left: 8px;
  border: 0;
  background: none;
  color: var(--color-text-muted);
  font-size: 11px;
}
.landing-draft > header button:disabled {
  color: var(--color-brand-light);
}
.landing-microsite {
  overflow: hidden;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
}
.landing-microsite section {
  padding: 20px;
  border-top: 1px solid var(--color-border-default);
}
.landing-microsite section:first-child {
  border-top: 0;
}
.landing-hero {
  min-height: 250px;
  background: linear-gradient(155deg, #2e1c6b, #5938c7);
  color: white;
}
.landing-microsite small {
  display: block;
  margin-bottom: 10px;
  color: var(--color-brand-light);
  font: 10px var(--font-family-mono);
}
.landing-hero small {
  color: white;
}
.landing-microsite h2 {
  margin: 0 0 10px;
  font-size: 24px;
}
.landing-microsite p {
  margin: 0 0 10px;
  color: var(--color-text-primary);
  font-size: 14px;
}
.landing-hero p {
  color: white;
}
.landing-hero button {
  padding: 9px 18px;
  border: 0;
  border-radius: 6px;
  color: var(--color-brand-deep);
  background: white;
  font-weight: 600;
}
.landing-microsite ul {
  margin: 10px 0 0;
  padding-left: 18px;
  color: var(--color-text-secondary);
  font-size: 13px;
}
.landing-microsite footer {
  padding: 18px;
  background: var(--color-bg-elevated);
}
.landing-microsite textarea,
.landing-microsite input {
  width: 100%;
  box-sizing: border-box;
  margin: 4px 0 10px;
  padding: 8px;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
.linkedin-outreach-workspace {
  display: grid;
  grid-template-columns: 360px minmax(0, 776px);
  gap: 16px;
  align-items: start;
}
.sales-talking-points-workspace {
  display: grid;
  grid-template-columns: 360px minmax(0, 776px);
  gap: 16px;
  align-items: start;
}
.sales-guidance {
  min-height: 140px;
  padding: 18px 20px;
  border: 1px solid var(--color-border-brand);
  border-radius: 12px;
  background: var(--color-brand-tint-900);
  color: var(--color-text-secondary);
}
.sales-guidance h2 {
  margin-bottom: 12px;
  color: var(--color-brand-light);
}
.sales-guidance p {
  margin: 8px 0;
  font-size: 12px;
}
.sales-draft-region {
  display: grid;
  width: 776px;
  gap: 16px;
}
.sales-draft-card {
  height: 620px;
  overflow: hidden;
  border: 1px solid var(--color-border-default);
  border-radius: 10px;
  background: var(--color-card-default);
}
.sales-draft-card > header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  min-height: 58px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-default);
}
.sales-draft-card > header > span {
  padding: 4px 7px;
  border: 1px solid var(--color-border-amber);
  border-radius: 4px;
  color: var(--color-accent-amber-light);
  font: 10px var(--font-family-mono);
}
.sales-draft-card > header h2 {
  font-size: 16px;
}
.sales-draft-card > header button {
  margin-left: 8px;
  border: 0;
  background: none;
  color: var(--color-text-muted);
  font-size: 11px;
}
.sales-draft-body {
  display: grid;
  gap: 14px;
  padding: 16px 20px;
  overflow: auto;
  max-height: 550px;
}
.sales-draft-body section {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-subtle);
}
.sales-draft-body h3 {
  margin: 0 0 7px;
  color: var(--color-brand-light);
  font: 10px var(--font-family-mono);
}
.sales-draft-body h3 small {
  color: var(--color-text-muted);
  font: inherit;
}
.sales-draft-body p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.45;
}
.sales-draft-body textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
.sales-angles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.sales-angles label,
.sales-objection label {
  display: grid;
  gap: 5px;
  color: var(--color-text-tertiary);
  font: 10px var(--font-family-mono);
}
.sales-objection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.sales-objection small {
  grid-column: 1/-1;
  color: var(--color-text-muted);
  font-size: 10px;
}
.sales-traceability {
  color: var(--color-text-muted) !important;
  font-size: 11px !important;
}
.linkedin-outreach-guidance {
  min-height: 140px;
  padding: 18px 20px;
  border: 1px solid var(--color-border-brand);
  border-radius: 12px;
  background: var(--color-brand-tint-900);
  color: var(--color-text-secondary);
}
.linkedin-outreach-guidance h2 {
  margin-bottom: 12px;
  color: var(--color-brand-light);
}
.linkedin-outreach-guidance p {
  margin: 8px 0;
  font-size: 12px;
}
.linkedin-outreach-region {
  display: grid;
  width: 776px;
  gap: 16px;
}
.linkedin-outreach-card {
  height: 390px;
  overflow: hidden;
  border: 1px solid var(--color-border-default);
  border-radius: 10px;
  background: var(--color-card-default);
}
.linkedin-outreach-card > header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  min-height: 58px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-default);
}
.linkedin-outreach-card > header > span {
  padding: 4px 7px;
  border: 1px solid var(--color-border-amber);
  border-radius: 4px;
  color: var(--color-accent-amber-light);
  font: 10px var(--font-family-mono);
}
.linkedin-outreach-card > header h2 {
  font-size: 16px;
}
.linkedin-outreach-card > header button {
  margin-left: 8px;
  border: 0;
  background: none;
  color: var(--color-text-muted);
  font-size: 11px;
}
.linkedin-outreach-body {
  display: grid;
  gap: 18px;
  padding: 18px 20px;
}
.linkedin-outreach-body label {
  display: grid;
  gap: 8px;
  color: var(--color-text-tertiary);
  font: 10px/1.3 var(--font-family-mono);
  text-transform: uppercase;
}
.linkedin-outreach-body textarea {
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  padding: 10px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: 7px;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font: 13px/1.45 var(--font-family-inter);
}
.linkedin-outreach-body small {
  color: var(--color-text-muted);
  font: 10px var(--font-family-mono);
  text-transform: none;
}
.linkedin-outreach-body small[data-valid='false'] {
  color: var(--color-accent-amber-light);
}
.linkedin-outreach-traceability {
  color: var(--color-text-muted);
  font-size: 11px;
}
.email-workspace {
  display: grid;
  grid-template-columns: minmax(320px, 544px) minmax(0, 560px);
  gap: 32px;
  align-items: start;
}
.email-editor,
.email-preview-column {
  display: grid;
  gap: 12px;
}
.email-best,
.email-checks {
  padding: 14px;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  background: var(--color-card-default);
}
.email-best button {
  border: 0;
  background: none;
  color: var(--color-accent-amber-light);
}
.email-best ul {
  margin: 10px 0 0;
  color: var(--color-text-secondary);
  font-size: 12px;
}
.email-preview {
  height: 520px;
  padding: 16px;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  background: var(--color-card-default);
}
.email-preview header {
  display: flex;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: 11px;
}
.email-preview header span {
  margin-right: auto;
}
.email-preview header button {
  border: 0;
  background: none;
  color: var(--color-brand-light);
}
.email-preview header button:disabled {
  color: var(--color-text-muted);
}
.email-paper {
  height: 440px;
  margin-top: 12px;
  padding: 24px;
  overflow: auto;
  background: white;
  color: #111;
}
.email-paper p {
  font-size: 12px;
}
.email-paper pre {
  white-space: pre-wrap;
  font: 13px/1.5 var(--font-family-inter);
}
.email-paper small {
  color: #26734d;
}
.email-checks p {
  margin: 8px 0;
  color: var(--color-text-secondary);
  font-size: 12px;
}
.email-checks p[data-valid='false'] {
  color: var(--color-accent-amber-light);
}
.studio-secondary-state button {
  width: max-content;
  padding: 10px 14px;
}
.studio-page__empty button {
  margin-left: var(--spacing-8);
  color: var(--color-brand-light);
  background: none;
  border: 0;
}
.studio-page__context {
  display: grid;
  gap: var(--spacing-16);
}
.studio-page__controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-12);
}
.studio-page__status {
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
}
@media (max-width: 1100px) {
  .studio-page__filters {
    grid-template-columns: 1fr 1fr;
  }
  .studio-page__filters .studio-page__search {
    grid-column: 1/-1;
  }
  .studio-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .studio-editor-workspace {
    grid-template-columns: 1fr;
  }
  .email-workspace {
    grid-template-columns: 1fr;
  }
  .email-editor,
  .email-preview-column,
  .studio-editor-column,
  .studio-preview-column,
  .email-preview,
  .linkedin-preview {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  .linkedin-preview {
    width: 100%;
  }
  .landing-workspace {
    grid-template-columns: 1fr;
  }
  .linkedin-outreach-workspace {
    grid-template-columns: 1fr;
  }
  .sales-talking-points-workspace {
    grid-template-columns: 1fr;
  }
  .sales-draft-region {
    width: 100%;
  }
  .linkedin-outreach-region {
    width: 100%;
  }
  .landing-draft-region {
    width: 100%;
  }
  .studio-page__context--editor {
    grid-template-columns: 1fr 1fr;
  }
  .studio-page__context--editor > label,
  .studio-page__context--editor select,
  .studio-page__context-wide {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .studio-page__context-wide {
    grid-column: 1/-1;
  }
  .studio-company-input input {
    min-width: 0;
  }
}
@media (max-width: 767px) {
  .studio-page {
    padding: var(--spacing-16);
  }
  .studio-page__header {
    flex-direction: column;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .studio-page,
  .studio-page > *,
  .studio-page__context--editor > *,
  .studio-page__context-wide,
  .studio-asset-tabs,
  .landing-workspace,
  .landing-guidance,
  .landing-draft-region,
  .email-workspace,
  .studio-editor-workspace,
  .linkedin-outreach-workspace,
  .sales-talking-points-workspace {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
  .studio-page__context--editor > label,
  .studio-page__context--editor select,
  .studio-page__context-wide select,
  .studio-page__context-wide {
    width: 100%;
    min-width: 0;
  }
  .studio-page__filters,
  .studio-page__controls,
  .studio-page__grid {
    grid-template-columns: 1fr;
  }
  .studio-page__filters .studio-page__search {
    grid-column: auto;
  }
  .linkedin-outreach-card {
    height: auto;
    min-height: 390px;
  }
  .linkedin-outreach-card > header {
    grid-template-columns: 1fr;
  }
  .sales-draft-card {
    height: auto;
    min-height: 620px;
  }
  .sales-draft-card > header {
    grid-template-columns: 1fr;
  }
  .sales-angles,
  .sales-objection {
    grid-template-columns: 1fr;
  }
}
</style>

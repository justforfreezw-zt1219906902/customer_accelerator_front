import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { describe, expect, it, vi } from 'vitest';
import App from '../../src/App.vue';
import { createAppRouter } from '../../src/router';

const mountStudio = async (url = '/demo/content-studio') => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(url);
  await router.isReady();
  const wrapper = mount(App, { global: { plugins: [router] } });
  await flushPromises();
  return { router, wrapper };
};

describe('TASK-MAINT-006 Stage A Content Studio', () => {
  it('renders the Company Preview with Oracle and exact five assets in foundation state', async () => {
    const { wrapper } = await mountStudio();
    expect(wrapper.get('h1').text()).toBe('Content Studio');
    expect(wrapper.text()).toContain('Oracle');
    expect(wrapper.findAll('.studio-account-card')).toHaveLength(6);
    expect(wrapper.findAll('.studio-account-card')).toHaveLength(6);
  });
  it('uses opaque account query state and resolves direct links', async () => {
    const { router, wrapper } = await mountStudio();
    await wrapper.get('[aria-label="Select Oracle"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe(
      '/demo/content-studio?account=demo-acc-001',
    );
    expect(wrapper.text()).toContain('Build context');
    expect(wrapper.findAll('option')).toHaveLength(10);
  });
  it('keeps invalid account queries inside Demo and supports local filtering', async () => {
    const { wrapper } = await mountStudio(
      '/demo/content-studio?account=not-real',
    );
    expect(wrapper.get('[role="alert"]').text()).toContain('Account not found');
    const selection = await mountStudio();
    await selection.wrapper
      .get('[aria-label="Search accounts"]')
      .setValue('Oracle');
    expect(selection.wrapper.findAll('.studio-account-card')).toHaveLength(1);
    await selection.wrapper
      .get('.studio-page__actions button')
      .trigger('click');
    expect(selection.wrapper.findAll('.studio-account-card')).toHaveLength(6);
  });

  it.each([
    ['Subject line', 'Subject line', 'Subject replacement'],
    ['Opening', 'Opening', 'Opening replacement'],
    ['Value', 'Value', 'Value replacement'],
    ['CTA', 'CTA', 'CTA replacement'],
  ])('regenerates only the %s part and preserves edits', async (_name, label, replacement) => {
    const { wrapper } = await mountStudio('/demo/content-studio?account=demo-acc-001');
    const outreachTab = wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email');
    expect(outreachTab).toBeDefined();
    await outreachTab!.trigger('click');
    const valueOf = (selector: string) => (wrapper.get(selector).element as HTMLInputElement).value;
    await wrapper.get('[aria-label="Subject line"]').setValue('manual subject');
    await wrapper.get('[aria-label="Opening"]').setValue('manual opening');
    await wrapper.get('[aria-label="Value"]').setValue('manual value');
    await wrapper.get('[aria-label="CTA"]').setValue('manual cta');
    await wrapper.get('[aria-label="Signature name"]').setValue('Manual sender');
    const before = {
      subject: valueOf('[aria-label="Subject line"]'),
      opening: valueOf('[aria-label="Opening"]'),
      value: valueOf('[aria-label="Value"]'),
      cta: valueOf('[aria-label="CTA"]'),
      signature: valueOf('[aria-label="Signature name"]'),
    };
    const field = wrapper.findAll('.studio-field').find((item) => item.text().includes(label));
    expect(field).toBeDefined();
    await field!.get('button').trigger('click');
    expect(valueOf('[aria-label="Signature name"]')).toBe(before.signature);
    const current = {
      subject: valueOf('[aria-label="Subject line"]'),
      opening: valueOf('[aria-label="Opening"]'),
      value: valueOf('[aria-label="Value"]'),
      cta: valueOf('[aria-label="CTA"]'),
    };
    const key = label === 'Subject line' ? 'subject' : label.toLowerCase() as 'opening' | 'value' | 'cta';
    expect(current[key]).not.toBe(before[key]);
    (Object.keys(current) as Array<keyof typeof current>).filter((part) => part !== key).forEach((part) => {
      expect(current[part]).toBe(before[part]);
    });
    expect(current[key]).not.toBe(replacement);
    await field!.get('button').trigger('click');
    const selectedSelector = {
      subject: '[aria-label="Subject line"]',
      opening: '[aria-label="Opening"]',
      value: '[aria-label="Value"]',
      cta: '[aria-label="CTA"]',
    }[key];
    expect(valueOf(selectedSelector)).toBe(current[key]);
  });

  it('keeps Generate all deterministic, preserves signature, and makes no request', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { wrapper } = await mountStudio('/demo/content-studio?account=demo-acc-001');
    const outreachTab = wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email');
    expect(outreachTab).toBeDefined();
    await outreachTab!.trigger('click');
    const valueOf = (selector: string) => (wrapper.get(selector).element as HTMLInputElement).value;
    await wrapper.get('[aria-label="Signature name"]').setValue('Manual sender');
    await wrapper.get('[aria-label="Signature title"]').setValue('Director');
    await wrapper.get('[aria-label="Signature URL"]').setValue('manual.example');
    const generateAll = wrapper.findAll('button').find((button) => button.text().includes('Generate all parts'));
    expect(generateAll).toBeDefined();
    await generateAll!.trigger('click');
    const generated = [
      valueOf('[aria-label="Subject line"]'),
      valueOf('[aria-label="Opening"]'),
      valueOf('[aria-label="Value"]'),
      valueOf('[aria-label="CTA"]'),
    ];
    expect(generated).toEqual(['cloud infrastructure', 'Run your most demanding workloads with confidence.', 'Oracle Fusion 26C retraining creates a timely opening for a complete and integrated learning approach.', 'worth a quick look?']);
    expect(valueOf('[aria-label="Signature name"]')).toBe('Manual sender');
    expect(valueOf('[aria-label="Signature title"]')).toBe('Director');
    expect(valueOf('[aria-label="Signature URL"]')).toBe('manual.example');
    await generateAll!.trigger('click');
    expect([
      valueOf('[aria-label="Subject line"]'),
      valueOf('[aria-label="Opening"]'),
      valueOf('[aria-label="Value"]'),
      valueOf('[aria-label="CTA"]'),
    ]).toEqual(generated);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

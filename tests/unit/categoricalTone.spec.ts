import { describe, expect, it } from 'vitest';
import { categoricalTagTone, dnaDimensionTone } from '../../src/utils/categoricalTone';

describe('categorical visual tones', () => {
  it('normalizes values and remains stable independent of account or order', () => {
    expect(categoricalTagTone(' Agentforce ')).toBe(categoricalTagTone('agentforce'));
    expect(categoricalTagTone('Customer 360')).toBe(categoricalTagTone('Customer 360'));
    expect(categoricalTagTone('Agentforce')).not.toBe(categoricalTagTone('Trailblazer'));
  });

  it('keeps DNA dimensions mapped consistently across pages', () => {
    expect(dnaDimensionTone('Vocabulary')).toBe('success');
    expect(dnaDimensionTone('Vocabulary')).toBe(dnaDimensionTone(' vocabulary '));
    expect(dnaDimensionTone('Tone')).not.toBe(dnaDimensionTone('Problem Framing'));
  });
});

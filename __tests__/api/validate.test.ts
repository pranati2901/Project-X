import { describe, it, expect } from 'vitest';
import { requireFields } from '@/lib/validate';

describe('requireFields', () => {
  it('returns null for valid input', () => {
    expect(requireFields({ name: 'Alice', age: 25 }, { name: 'string', age: 'number' })).toBeNull();
  });

  it('returns null when no fields are required', () => {
    expect(requireFields({}, {})).toBeNull();
  });

  it('returns error for missing fields', () => {
    const err = requireFields({}, { topic: 'string' });
    expect(err).toContain('Missing required field');
    expect(err).toContain('topic');
  });

  it('returns error for null fields', () => {
    const err = requireFields({ topic: null }, { topic: 'string' });
    expect(err).toContain('Missing required field');
  });

  it('returns error for wrong type — string expected, got number', () => {
    const err = requireFields({ topic: 42 }, { topic: 'string' });
    expect(err).toContain('must be a non-empty string');
  });

  it('returns error for wrong type — number expected, got string', () => {
    const err = requireFields({ count: 'five' }, { count: 'number' });
    expect(err).toContain('must be a number');
  });

  it('returns error for NaN when number expected', () => {
    const err = requireFields({ count: NaN }, { count: 'number' });
    expect(err).toContain('must be a number');
  });

  it('returns error for empty strings', () => {
    const err = requireFields({ topic: '' }, { topic: 'string' });
    expect(err).toContain('must be a non-empty string');
  });

  it('returns error for whitespace-only strings', () => {
    const err = requireFields({ topic: '   ' }, { topic: 'string' });
    expect(err).toContain('must be a non-empty string');
  });

  it('returns error for non-object body (null)', () => {
    const err = requireFields(null, { topic: 'string' });
    expect(err).toBe('Request body must be a JSON object');
  });

  it('returns error for non-object body (string)', () => {
    const err = requireFields('hello', { topic: 'string' });
    expect(err).toBe('Request body must be a JSON object');
  });

  it('returns error for non-object body (undefined)', () => {
    const err = requireFields(undefined, { topic: 'string' });
    expect(err).toBe('Request body must be a JSON object');
  });

  it('validates array type correctly', () => {
    expect(requireFields({ items: [1, 2] }, { items: 'array' })).toBeNull();
    const err = requireFields({ items: 'not-array' }, { items: 'array' });
    expect(err).toContain('must be an array');
  });

  it('validates object type correctly', () => {
    expect(requireFields({ data: { key: 'val' } }, { data: 'object' })).toBeNull();
    // arrays should not pass as objects
    const err = requireFields({ data: [1, 2] }, { data: 'object' });
    expect(err).toContain('must be an object');
  });

  it('validates multiple fields and reports first error', () => {
    const err = requireFields({ a: 'ok' }, { a: 'string', b: 'number', c: 'array' });
    expect(err).toContain('b');
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDateTime, parseInteger, requiredText } from '../src/utils/validation.js';

test('parseInteger accepts integers inside the requested range', () => {
  assert.equal(parseInteger('12', 'La nota', { min: 0, max: 20 }), 12);
  assert.equal(parseInteger('0', 'La nota', { min: 0 }), 0);
});

test('parseInteger rejects decimals, unsafe values, and out-of-range values', () => {
  assert.throws(() => parseInteger('1.5', 'La nota'), /número entero/);
  assert.throws(() => parseInteger('21', 'La nota', { min: 0, max: 20 }), /entre/);
  assert.throws(() => parseInteger('9007199254740992', 'El ID'), /entre/);
});

test('parseDateTime accepts dates and datetimes in MySQL format', () => {
  assert.equal(parseDateTime('2026-10-05'), '2026-10-05 00:00:00');
  assert.equal(parseDateTime('2026-10-05 13:45'), '2026-10-05 13:45:00');
});

test('parseDateTime rejects invalid calendar dates and formats', () => {
  assert.throws(() => parseDateTime('2026-02-30'), /no es una fecha/);
  assert.throws(() => parseDateTime('05/10/2026'), /formato/);
  assert.throws(() => parseDateTime('2026-10-05 25:00'), /no es una fecha/);
});

test('requiredText trims input and rejects blank values', () => {
  assert.equal(requiredText('  Curso  '), 'Curso');
  assert.throws(() => requiredText('   ', 'El nombre'), /obligatorio/);
});

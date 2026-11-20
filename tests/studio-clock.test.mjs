import assert from 'node:assert/strict'
import test from 'node:test'
import { formatStudioTime, formatStudioZone } from '../src/scripts/studio-clock.mjs'

test('studio time is the wall clock in Zurich, not the visitor zone', () => {
  // 23:41 UTC on 21 Nov is 00:41 CET; 23:41 UTC on 21 Jul is 01:41 CEST.
  assert.equal(formatStudioTime(new Date('2026-11-21T23:41:00Z')), '00:41')
  assert.equal(formatStudioTime(new Date('2026-07-21T23:41:00Z')), '01:41')
})

test('the zone label follows daylight saving, so the time is never ambiguous', () => {
  assert.equal(formatStudioZone(new Date('2026-11-21T23:41:00Z')), 'CET')
  assert.equal(formatStudioZone(new Date('2026-07-21T23:41:00Z')), 'CEST')
})

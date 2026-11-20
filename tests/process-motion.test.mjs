import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getActiveStep,
  getRailProgress,
} from '../src/scripts/process-motion.mjs'

const tops = [100, 300, 500, 700]

test('the first step is active before the anchor reaches any step', () => {
  assert.equal(getActiveStep(tops, 0), 0)
})

test('the active step is the last one whose top the anchor has crossed', () => {
  assert.equal(getActiveStep(tops, 300), 1)
  assert.equal(getActiveStep(tops, 499), 1)
  assert.equal(getActiveStep(tops, 650), 2)
})

test('the last step stays active after the anchor leaves the list', () => {
  assert.equal(getActiveStep(tops, 9000), 3)
})

// Four steps of unequal height; the list ends at 1000.
const uneven = [0, 100, 400, 500]

test('the rail is empty until the anchor reaches the first step', () => {
  assert.equal(getRailProgress(uneven, 1000, -50), 0)
  assert.equal(getRailProgress(uneven, 1000, 0), 0)
})

test('the rail reaches each tick exactly as its step becomes active', () => {
  assert.equal(getRailProgress(uneven, 1000, 100), 0.25)
  assert.equal(getRailProgress(uneven, 1000, 400), 0.5)
  assert.equal(getRailProgress(uneven, 1000, 500), 0.75)
})

test('the rail moves through a segment at the rate the anchor moves through its step', () => {
  // Halfway through the 300px second step is halfway through the second quarter.
  assert.equal(getRailProgress(uneven, 1000, 250), 0.375)
  assert.equal(getRailProgress(uneven, 1000, 750), 0.875)
})

test('the rail is full once the anchor leaves the list', () => {
  assert.equal(getRailProgress(uneven, 1000, 1000), 1)
  assert.equal(getRailProgress(uneven, 1000, 4000), 1)
})

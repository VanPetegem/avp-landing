/**
 * Scroll state for the home page process section. The section reads as a
 * workflow moving forward: an anchor line at the middle of the viewport walks
 * down the step list, the rail fills with it, and the step it is inside wakes.
 */

/**
 * How full the rail is, 0 to 1. The rail is four equal segments, one per step,
 * while the steps themselves differ in height, so progress is piecewise: the
 * fill reaches a step's tick exactly as that step becomes active, and moves
 * through the segment at the rate the anchor moves through the step.
 * `stepTops` and `end` (the list's bottom) share the anchor's coordinate space.
 */
export function getRailProgress(stepTops, end, anchor) {
  const n = stepTops.length
  if (!n || anchor <= stepTops[0]) return 0
  if (anchor >= end) return 1
  const i = getActiveStep(stepTops, anchor)
  const from = stepTops[i]
  const to = stepTops[i + 1] ?? end
  const local = to > from ? (anchor - from) / (to - from) : 1
  return (i + local) / n
}

/**
 * The index of the last step whose top the anchor has crossed. Before the first
 * step the first one is active, so the section never shows no step at all; past
 * the last, the last stays, so Run is the state the section is left in.
 */
export function getActiveStep(stepTops, anchor) {
  let active = 0
  for (let i = 0; i < stepTops.length; i++) {
    if (stepTops[i] <= anchor) active = i
  }
  return active
}

const studioClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Zurich',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** The wall clock at the studio, as HH:MM, wherever the visitor is. */
export function formatStudioTime(date) {
  return studioClock.format(date)
}

const studioZone = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Zurich',
  timeZoneName: 'short',
})

/** The studio's zone abbreviation for that instant: CET in winter, CEST in summer. */
export function formatStudioZone(date) {
  return studioZone.formatToParts(date).find((part) => part.type === 'timeZoneName').value
}

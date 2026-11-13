import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

/*
 * A project's media is a list of string paths into public/, so a typo or a
 * screenshot that was never committed builds cleanly and ships a broken image
 * to /work, the detail page and the home page at once.
 */
test('every project media path points at a file in public/', async () => {
  const source = await readFile(
    new URL('../src/data/projects.ts', import.meta.url),
    'utf8'
  )
  const paths = [...source.matchAll(/'(\/[\w./-]+\.(?:avif|webp|png|jpg|mp4|webm))'/g)].map(
    (match) => match[1]
  )

  assert.ok(paths.length > 0, 'projects.ts declares no media at all')

  for (const path of paths) {
    await assert.doesNotReject(
      access(new URL(`../public${path}`, import.meta.url)),
      `${path} is referenced by a project but missing from public/`
    )
  }
})

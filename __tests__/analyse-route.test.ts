/** @jest-environment node */
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/analyse/route'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendAdminBenachrichtigung } from '@/lib/brevo'

jest.mock('@supabase/supabase-js', () => ({ createClient: jest.fn() }))
jest.mock('@/lib/supabase-server', () => ({ createServerSupabaseClient: jest.fn() }))
jest.mock('@/lib/brevo', () => ({
  sendKundenBestaetigung: jest.fn().mockResolvedValue(undefined),
  sendRegistrierterBestaetigung: jest.fn().mockResolvedValue(undefined),
  sendAdminBenachrichtigung: jest.fn().mockResolvedValue(undefined),
}))
const owner = '11111111-1111-4111-8111-111111111111'
const other = '22222222-2222-4222-8222-222222222222'
const getUser = jest.fn()
const insert = jest.fn()
const upload = jest.fn()
function request(type = 'registriert', id?: string | Blob) {
  const form = new FormData()
  Object.entries({ vorname: 'Test', nachname: 'User', email: 'contact@example.com', anfrage_typ: type })
    .forEach(([k, v]) => form.set(k, v))
  if (id !== undefined) form.set('user_id', id)
  return { formData: async () => form } as unknown as NextRequest
}
function login(overrides = {}) {
  getUser.mockResolvedValue({ data: { user: { id: owner, email: 'owner@example.com',
    email_confirmed_at: '2026-01-01', is_anonymous: false, ...overrides } }, error: null })
}
beforeEach(() => {
  jest.clearAllMocks()
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only'
  ;(createServerSupabaseClient as jest.Mock).mockReturnValue({ auth: { getUser } })
  ;(createClient as jest.Mock).mockReturnValue({ from: () => ({ insert }), storage: { from: () => ({ upload }) } })
  insert.mockResolvedValue({ error: null })
  getUser.mockResolvedValue({ data: { user: null }, error: null })
})
function expectNoEffects() {
  expect(createClient).not.toHaveBeenCalled()
  expect(insert).not.toHaveBeenCalled()
  expect(upload).not.toHaveBeenCalled()
  expect(sendAdminBenachrichtigung).not.toHaveBeenCalled()
}
test('guest submission is unowned', async () => {
  expect((await POST(request('gast'))).status).toBe(200)
  expect(insert).toHaveBeenCalledWith(expect.objectContaining({ user_id: null, anfrage_typ: 'gast' }))
})
test('guest cannot assign another account', async () => {
  expect((await POST(request('gast', other))).status).toBe(400)
  expectNoEffects()
})
test('unauthenticated registered submission is rejected', async () => {
  expect((await POST(request('registriert', owner))).status).toBe(401)
  expectNoEffects()
})
test.each([{ email_confirmed_at: null }, { is_anonymous: true }])('unverified/anonymous Auth user rejected: %p', async overrides => {
  login(overrides)
  expect((await POST(request())).status).toBe(401)
  expectNoEffects()
})
test('Auth error fails closed', async () => {
  login()
  getUser.mockResolvedValue({ data: { user: { id: owner } }, error: new Error('expired') })
  expect((await POST(request())).status).toBe(401)
  expectNoEffects()
})
test.each([undefined, owner])('owner ID is derived from verified session (input %s)', async id => {
  login()
  expect((await POST(request('registriert', id))).status).toBe(200)
  expect(insert).toHaveBeenCalledWith(expect.objectContaining({ user_id: owner }))
})
test.each(['ordinary@example.com', 'ehsan.amiri.de1986@gmail.com'])('no impersonation, including admin %s', async email => {
  login({ email })
  expect((await POST(request('registriert', other))).status).toBe(403)
  expectNoEffects()
})
test('file supplied as user ID is rejected before privileged effects', async () => {
  const response = await POST(request('registriert', new Blob(['id'])))
  expect(response.status).toBe(400)
  expectNoEffects()
})

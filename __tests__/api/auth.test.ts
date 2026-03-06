import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase-admin before importing verifyAuth
vi.mock('firebase-admin', () => ({
  default: {
    apps: [],
    initializeApp: vi.fn(),
    credential: { cert: vi.fn() },
    auth: vi.fn(() => ({
      verifyIdToken: vi.fn().mockRejectedValue(new Error('Invalid token')),
    })),
  },
}));

import { verifyAuth } from '@/lib/api-auth';

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request('http://localhost:3002/api/test', { headers });
}

describe('verifyAuth', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns fallback UID when admin SDK is not configured (no env vars)', async () => {
    // No FIREBASE_* env vars → admin not ready → demo mode
    delete process.env.FIREBASE_PROJECT_ID;
    delete process.env.FIREBASE_CLIENT_EMAIL;
    delete process.env.FIREBASE_PRIVATE_KEY;

    const result = await verifyAuth(makeRequest());
    expect(result).toEqual({ uid: 'demo-user' });
  });

  it('returns "unknown" UID when admin SDK not configured but token is provided', async () => {
    delete process.env.FIREBASE_PROJECT_ID;
    delete process.env.FIREBASE_CLIENT_EMAIL;
    delete process.env.FIREBASE_PRIVATE_KEY;

    const result = await verifyAuth(makeRequest({ Authorization: 'Bearer some-token' }));
    expect(result).toEqual({ uid: 'unknown' });
  });

  it('returns null when admin SDK is configured but no auth header', async () => {
    vi.stubEnv('FIREBASE_PROJECT_ID', 'test-project');
    vi.stubEnv('FIREBASE_CLIENT_EMAIL', 'test@test.iam.gserviceaccount.com');
    vi.stubEnv('FIREBASE_PRIVATE_KEY', '-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----');

    const result = await verifyAuth(makeRequest());
    expect(result).toBeNull();
  });

  it('returns null on invalid token when admin SDK is configured', async () => {
    vi.stubEnv('FIREBASE_PROJECT_ID', 'test-project');
    vi.stubEnv('FIREBASE_CLIENT_EMAIL', 'test@test.iam.gserviceaccount.com');
    vi.stubEnv('FIREBASE_PRIVATE_KEY', '-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----');

    const result = await verifyAuth(makeRequest({ Authorization: 'Bearer bad-token' }));
    expect(result).toBeNull();
  });
});

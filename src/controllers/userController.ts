import { getUserById } from '../services/userService';

interface CachedUserProfile {
  data: unknown;
  timestamp: number;
}

const cache = new Map<string, CachedUserProfile>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface RequestLike {
  params: {
    userId: string;
  };
}

export interface ResponseLike {
  json(payload: unknown): unknown;
  status(code: number): ResponseLike;
}

export function clearUserProfileCache() {
  cache.clear();
}

export async function getUserProfile(req: RequestLike, res: ResponseLike) {
  const userId = req.params.userId;

  const cached = cache.get(userId);

  if (cached) {
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    cache.delete(userId);
  }

  try {
    const user = await getUserById(userId);

    cache.set(userId, {
      data: user,
      timestamp: Date.now()
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}

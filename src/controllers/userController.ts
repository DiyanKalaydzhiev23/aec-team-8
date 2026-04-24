import { getUserById } from '../services/userService';

export interface RequestLike {
  params: {
    userId: string;
  };
}

export interface ResponseLike {
  json(payload: unknown): unknown;
  status(code: number): ResponseLike;
}

export async function getUserProfile(req: RequestLike, res: ResponseLike) {
  const userId = req.params.userId;

  try {
    const user = await getUserById(userId);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}

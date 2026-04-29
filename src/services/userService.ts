import db from '../db';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  updated_at: string;
}

export async function getUserById(userId: string) {
  const result = await db.query<UserRecord>(
    'SELECT id, name, email, updated_at FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0];
}

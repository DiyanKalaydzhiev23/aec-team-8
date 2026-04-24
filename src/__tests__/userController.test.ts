import { getUserProfile } from '../controllers/userController';
import * as userService from '../services/userService';

jest.mock('../services/userService');

describe('getUserProfile', () => {
  it('returns user data', async () => {
    const req = { params: { userId: '123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    jest.spyOn(userService, 'getUserById').mockResolvedValue({
      id: '123',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      updated_at: '2026-04-24T00:00:00.000Z'
    });

    await getUserProfile(req, res);

    expect(userService.getUserById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith({
      id: '123',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      updated_at: '2026-04-24T00:00:00.000Z'
    });
  });
});

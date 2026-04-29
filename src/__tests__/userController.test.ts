import { clearUserProfileCache, getUserProfile } from '../controllers/userController';
import * as userService from '../services/userService';

jest.mock('../services/userService');

describe('getUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearUserProfileCache();
  });

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

  it('returns cached user on second request', async () => {
    const req = { params: { userId: '456' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    jest.spyOn(userService, 'getUserById').mockResolvedValue({
      id: '456',
      name: 'Grace Hopper',
      email: 'grace@example.com',
      updated_at: '2026-04-24T00:00:00.000Z'
    });

    await getUserProfile(req, res);
    await getUserProfile(req, res);

    expect(userService.getUserById).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(2);
  });
});

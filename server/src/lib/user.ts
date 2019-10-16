import { UsersDao } from '../routes/users.dao';
import { User } from '../types';

class UserService {
  constructor(private dao = new UsersDao()) {}

  public listUsers(
    query: any = {},
    offset: number = 0,
    limit: number = 10
  ): Promise<User[]> {
    return this.dao.query(query, offset, limit);
  }

  public addUser(user: User) {
    return this.dao.insert(user);
  }
}

export const userService = new UserService();

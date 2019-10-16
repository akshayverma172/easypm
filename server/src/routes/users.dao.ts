import { Collection, Database, Datastore } from '../datastore/datastore';
import { User } from '../types';

export class UsersDao {
  constructor(private db: Database = Datastore.getDB()) {}

  public async insert(user: User): Promise<string> {
    const result = await this.userCollection().insert(user);
    return result._id;
  }

  public async query(
    query: any,
    offset: number,
    limit: number
  ): Promise<User[]> {
    const properties = await this.userCollection().find(query);
    return properties.slice(offset, offset + limit);
  }

  public getUser(id: string): Promise<User> {
    return this.userCollection().findById(id);
  }

  public clearAll() {
    return this.userCollection().destroy();
  }

  private userCollection(): Collection<User> {
    return this.db.collection('users');
  }
}

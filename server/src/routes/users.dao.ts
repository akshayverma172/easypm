import { Collection, Database, Datastore } from '../datastore/datastore';
import { User } from '../types';

export class PropertyDAO {
  constructor(private db: Database = Datastore.getDB()) {}

  public async insert(user: User): Promise<string> {
    const result = await this.propertyCollection().insert(user);
    return result._id;
  }

  public async query(
    query: any,
    offset: number,
    limit: number
  ): Promise<User[]> {
    const properties = await this.propertyCollection().find(query);
    return properties.slice(offset, offset + limit);
  }

  public getProperty(id: string): Promise<User> {
    return this.propertyCollection().findById(id);
  }

  public clearAll() {
    return this.propertyCollection().destroy();
  }

  private propertyCollection(): Collection<User> {
    return this.db.collection('users');
  }
}

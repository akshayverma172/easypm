import { PropertyDAO } from './property.dao';
import { Property, Unit } from './property.model';
// import {} from 'express'

export class PropertyService {
  constructor(private dao = new PropertyDAO()) {}

  public listProperties(
    query: any = {},
    offset: number = 0,
    limit: number = 10
  ): Promise<Property[]> {
    return this.dao.query(query, offset, limit);
  }

  public addProperty() {
    const unit: Unit = { floor: 3, number: 'sdfds', rent: 11500, vacant: true };
    const property: Property = {
      address: 'test',
      _id: 'test',
      name: 'test',
      units: [unit]
    };
    return this.dao.insert(property);
  }
}

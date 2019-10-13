import * as express from 'express';
import { Response, Request } from 'express';
import { PropertyService } from './property.service';

const propertyService = new PropertyService();
const controller = express.Router();

controller.post('/', async (req: Request, res: Response) => {
  const query = req.body;
  console.log(req.body, 'BODY');
  console.log(req.query, 'query');
  const properties = await propertyService.listProperties(
    query,
    req.query.offset,
    req.query.limit
  );
  // console.log(properties);
  res.status(200).send(properties);
});

controller.post('/add', async (req, res: Response) => {
  const details = {};
  await propertyService.addProperty();
  res.status(200).send('test');
});

export { controller as PropertyController };

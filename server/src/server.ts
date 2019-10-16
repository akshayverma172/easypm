import * as cors from 'cors';
import * as express from 'express';
import { PropertyController } from './properties/property.controller';
import { UserController } from './routes/users';
import { AuthController } from './routes/authenticate';
import { json, urlencoded } from 'body-parser';

const app = express();
app.use('*', cors());

app.use(express.json());

// app.use(
//   urlencoded({
//     extended: true
//   })
// );
// app.use(json());
// Routes

app.get('/ping', (req, res, next) => {
  console.log('mera loda');
  res.send('OK');
});
app.use('/api/property', PropertyController);
app.use('/api/users', UserController);
app.use('/api/authenticate', AuthController);

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));

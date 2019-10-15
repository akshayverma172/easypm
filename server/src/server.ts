import * as cors from 'cors';
import * as express from 'express';

import { PropertyController } from './properties/property.controller';
import { UserController } from './routes/users';
import { AuthController } from './routes/authenticate';
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/property', PropertyController);
app.use('/api/users', UserController);
app.use('/api/auth', AuthController);

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));

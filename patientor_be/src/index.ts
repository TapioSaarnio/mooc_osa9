import express from 'express';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
const app = express();
app.use(express.json());
const cors = require('cors'); //eslint-disable-line
app.use(cors()); //eslint-disable-line
//import { Diagnose } from './types'


const PORT = 3001;

app.get('/api/ping', (_req, res) => {

    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
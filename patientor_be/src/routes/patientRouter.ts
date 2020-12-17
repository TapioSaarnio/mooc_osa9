import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry }from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {

    res.send(patientService.getById(req.params.id));
    
});

router.post('/:id/entries', (req, res) => {
    
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    } catch(e) {
        res.status(400).send(e.message); //eslint-disable-line
    }

});

router.post('/', (req, res) => {
    
    try {
        const newPatient = toNewPatientEntry(req.body);

        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(e) {
        res.status(400).send(e.message); //eslint-disable-line
    }
});

export default router;
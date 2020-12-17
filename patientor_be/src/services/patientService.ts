import patientData from '../data/patients';
import {  Entry, NewEntryEntry, NewPatientEntry, Patient, PublicPatient } from '../types';
const { v1: uuid} = require('uuid') //eslint-disable-line

const patients: Array<Patient> = patientData;


const getPatients = (): PublicPatient[] => {

    return patientData.map(({id, name, occupation, gender, dateOfBirth}) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));

};

const getById = (id: string): Patient => {
    
    const patientArr = patients.filter(p => id === p.id);
    const patient = patientArr[0];
    //console.log('patient');
    //console.log(patient.entries);
    
    return patient;
};


const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        id: uuid(), //eslint-disable-line
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        ssn: entry.ssn,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: []
 
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
    
};

const addEntry = ( entry: NewEntryEntry, id: string ): Entry => {

    const newEntryEntry = {
        ...entry,
        id: uuid() //eslint-disable-line
    };

    const patientToAdd = patients.find((p) => p.id === id);
    if(patientToAdd) {
        if(patientToAdd.entries) {

            patientToAdd?.entries.push(newEntryEntry);
            patients.map(p => p.id == id ? patientToAdd : p);

        }

        patientToAdd.entries = [newEntryEntry];
        patients.map(p => p.id == id ? patientToAdd : p);
    }
    

     return newEntryEntry;
};

export default {
    getPatients,
    addPatient,
    addEntry,
    getById
};

import  diagnoseData  from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};
import { NewPatientEntry, NewEntryEntry, HealthCheckRating, SickLeave, Discharge } from './types';
import { Gender } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => { 
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDOB(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntryEntry => {

    const newEntryBase= {

        description: parseDescription(object.description),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: parseDOB(object.date),
        specialist: parseSpecialist(object.specialist),
        
    };

    const type = parseType(object.type);
    if(type == 'HealthCheck') {
        const newEntryHospital: NewEntryEntry = {
            ...newEntryBase,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            type: type
        };

        return newEntryHospital;
    }

    if(type == 'OccupationalHealthcare') {
        
        if(object.sickLeave) {
            const newEntryOccupationalWSickLeave: NewEntryEntry = {
                ...newEntryBase,
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave),
                type: type
            };
            return newEntryOccupationalWSickLeave;
        }

        const newEntryOccupational: NewEntryEntry = {
            ...newEntryBase,
            employerName: parseEmployerName(object.employerName),
            type: type
        };

        return newEntryOccupational;
    }

    
    if(type == 'Hospital') {
        const newEntryHospital: NewEntryEntry = {
            ...newEntryBase,
            discharge: parseDischarge(object.discharge),
            type: type
        };

        return newEntryHospital;
    }
    
   throw new Error('Something is wrong with type');

};

const parseDischarge = (discharge: any): Discharge => {

    if(!discharge.date) {

        throw new Error('missing discharge date');

    }
    
    if(!discharge.criteria) {

        throw new Error('missing discharge criteria');
    }

    const parsedDischarge: Discharge = {
        date: parseDOB(discharge.date),
        criteria: parseCriteria(discharge.criteria)

    };

    return parsedDischarge;
    
};

const parseSickLeave = (sickLeave: any): SickLeave => {

    
    if(!sickLeave.startDate || !isDate(sickLeave.startDate)){
        throw new Error('Incorrect or missing startdate on SickLeave');
    }

    if(!sickLeave.endDate || !isDate(sickLeave.endDate)){
        throw new Error('Incorrect or missing startdate on SickLeave');
    }
    

    const sickleaveParsed: SickLeave = {
        startDate: parseDOB(sickLeave.startDate),
        endDate: parseDOB(sickLeave.endDate)
    };
    

    return sickleaveParsed;

};

const parseCriteria = (criteria: any): string => {
    if(!isString(criteria)) {
        throw new Error('Incorrect discharge criteria');
    }

    return criteria;

};

const parseEmployerName = (employerName: any): string => {

    if(!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer');
    }

    return employerName;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {

    if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {

        throw new Error('Incorrect or missing healthCheckRating');

    }

    return healthCheckRating;
};

/*
const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {

    if(!diagnosisCodes) {
        throw new Error('Missing diagnosiscode')
    }


}
*/
const parseType = (type: any): string => {
    if(!type || !isString(type)){
        throw new Error('Incorrect or missing type');
    }
    return type;
};

const parseSpecialist = (specialist: any): string => {

    if(!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};

const parseDescription = (description: any): string => {

    console.log(description);
    if(!description || !isString(description)) {
        throw new Error('Incorrect or missing description');

    }

    return description;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ');
    }
    return gender;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDOB = (dateOfBirth: any): string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date');
    }
    return dateOfBirth;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
    return typeof text ==='string' || text instanceof String;
};


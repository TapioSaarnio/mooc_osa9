export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

/*
export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string

}
*/

export enum HealthCheckRating {

    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCare extends BaseEntry {

    type: "OccupationalHealthcare",
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital"
    discharge: {
        date: string,
        criteria: string
    }

}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {

    date: string;
    criteria: string;
}
export type NewEntryEntry = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthCare, 'id'> | Omit<HealthCheckEntry, 'id'>;

export interface NewPatientEntry {

    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = 
   | HospitalEntry
   | OccupationalHealthCare
   | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }

  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export enum Gender {

    Male = 'male',
    Female = 'female',
    Other = 'other'
}


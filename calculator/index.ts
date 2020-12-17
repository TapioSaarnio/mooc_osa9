import express from 'express';
import  { calculateBmi } from './bmiCalculator';
import { calculateExercises, TrainingInput } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack');
});

app.get('/bmi', (req, res) => {

    const height = req.query.height;
    const weight = req.query.weight;

    console.log(req.query);

    if(isNaN(Number(height)) || isNaN(Number(weight)) || height=="" || weight=="") {

        res.send({
            error: 'malformatted parameters'
        });
    }else {

    res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(height), Number(weight))
    });
}

});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as TrainingInput;
    const target = body.target;
    const daily_exercises = body.daily_exercises;

    if(!target || !daily_exercises) {
        res.send({
            error: 'parameters missing'
        });
    }

    if(isNaN(Number(target)) || daily_exercises.some(isNaN) || daily_exercises.length == 0) {
        res.send({
            error: 'malformatted parameters'
        });
    }

    res.send(calculateExercises(target, daily_exercises));

    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
interface TrainingData {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface TrainingInput {
    target: number,
    daily_exercises: Array<number>
}

const parseArgumentsTrainingData = (args: Array<string>): TrainingInput => {
     if(args.length < 4) throw new Error('not enough arguments');
     const arr = [];
     let target = 0;
     if(!isNaN(Number(args[2]))) {

        target = Number(args[2]);

     }
     
     for(let i = 2; i < args.length; i++) {
        if(isNaN(Number(args[i]))) {
            throw new Error('All arguments must be numbers');
        }
         arr.push(Number(args[i]));
     }

     return {
         target: target,
         daily_exercises: arr
     };
     
};

export const calculateExercises = (target: number, daily_exercises: Array<number>) : TrainingData => {

    let hoursSummed = 0;

    for (let i = 0; i < daily_exercises.length; i++) {
        hoursSummed += daily_exercises[i];
    }
    
    const periodLength = daily_exercises.length ;
    let trainingDays = 0;
    for(let d = 0; d < daily_exercises.length; d++) {
        if(daily_exercises[d] > 0) {
            trainingDays++;
        }
    }

    const feedBack = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        target: target
    };

    const average = hoursSummed / periodLength;
    switch(true) {
        case (average < target/2):
            return {

                ...feedBack,
                average: average,
                success: false,
                rating: 1,
                ratingDescription: 'Train more!'

            };
        case (average >= target/2):
            return {
                ...feedBack,
                average: average,
                success: true,
                rating: 2,
                ratingDescription: 'Doing fine but could do better!'
            };
        case (average >= target):
            return {
                ...feedBack,
                average: average,
                success: true,
                rating: 3,
                ratingDescription: 'Awesome! Keep up the good work!'
            };
        default: 
          throw new Error('Something went wrong');
    }   
};
try {
    const { target, daily_exercises } = parseArgumentsTrainingData(process.argv);
    console.log(daily_exercises);
    console.log(calculateExercises( target, daily_exercises));
} catch(e) {
    if(e instanceof Error) {
    console.log('Error, something went wrong. Message: ', e.message);
    }
}

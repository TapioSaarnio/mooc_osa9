
type Result = string;

/*
interface HeightAndWeight {
    height: number;
    weight: number;
}

/*
const parseArgumentsBmi = (args: Array<string>): HeightAndWeight => {
    if(args.length < 4) throw new Error('not enough arguments');
    if(args.length > 4) throw new Error('too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};
*/

export const calculateBmi = (a: number, b: number) : Result => {

    const bmi = b / (a/100 * a/100);

    switch(true) {
        case (bmi < 18.5):
            return 'You are underweight';
        case (bmi <= 25):
            return 'Your weight is normal';
        case (bmi > 25):
            return 'You are overweight';

        default: throw new Error('Unknown Error');
    }
};

/*
try {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    if(e instanceof Error) {
        console.log(e.message);
    }
}



//console.log(calculateBmi(180, 74))
*/
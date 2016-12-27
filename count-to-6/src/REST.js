var grades = process.argv.slice(2);

function average(grades) {
    var total = 0;
    grades.forEach( (value) => total += parseInt(value) );
    
    return (total / grades.length);
 };
console.log(`The average of [${grades}] is ${average(grades)}`);

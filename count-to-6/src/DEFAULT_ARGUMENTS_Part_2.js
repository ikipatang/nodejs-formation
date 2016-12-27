

function makeImportant(string, count = string.length)
{
  console.log(`${string}${'!'.repeat(count)}`);
}



makeImportant("Hi", 5); // => "Hi!!!!!"
makeImportant("Hi"); // => "Hi!!"
makeImportant("Hello?", undefined); // => "Hello?!!!!!!"

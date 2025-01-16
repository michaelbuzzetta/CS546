/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/
import { arrayAnalysis } from "./arrayUtils.js";
import { mergeKeyValuePairs } from "./arrayUtils.js";
import { deepArrayEquality } from "./arrayUtils.js";
import { processObjects } from "./objectUtils.js";
import { similarKeysValues } from "./objectUtils.js";
import { flipKeysForStringsAndNumbers } from "./objectUtils.js";
import { replaceCharsAtIndexes } from "./stringUtils.js";
import { anagrams } from "./stringUtils.js";
import { charSwap } from "./stringUtils.js";

const arr1 = [2, 3, [5, { a: 1 }], 8];
const arr2 = [2, 3, [5, { a: 1 }], 8];
const arr3 = [2, 3, [5, { a: 2 }], 8];
const arr4 = [2, 3, { x: [10, 20], y: "test" }];
const arr5 = [2, 3, { x: [10, 20], y: "test" }];
const arr6 = [2, 3, [1, 2, [3, { a: 4 }]]];
const arr7 = [2, 3, [1, 2, [3, { a: 4 }]]];

const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 1, y: 9, q: 10 };
const fourth = {};
const fifth = { a: 1, b: 2, c: "4" };

const obj1 = { a: 1, b: 2, c: "3" };
const obj2 = { a: "1", b: "2", c: 3, d: 4 };
const obj3 = { a: { x: 1, y: 2 }, b: 3 };
const obj4 = { a: { x: "1", y: 2 }, b: "3" };
const obj5 = {};
const obj6 = { a: 2, b: 3 };

const example1 = { a: 3, b: 7, c: "hello" };
const example2 = { a: 3, b: [1, 2], c: { x: 1 } };
const example3 = { a: "test", b: ["apple", "banana"], d: { y: 5, z: "ok" } };

// console.log(arrayAnalysis([7, 9, 11, 15, 19, 20, 35, 0]));
// console.log(arrayAnalysis([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
try {
  console.log(arrayAnalysis([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20]));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayAnalysis("test"));
} catch (e) {
  console.log(e);
}
try {
  console.log(
    mergeKeyValuePairs(
      ["foo", 10],
      ["bar", "hello"],
      ["foo", "world"],
      ["baz", 30],
      ["foo", 5],
      ["bar", 15],
      ["baz", "20"]
    )
  ); // Should return: {bar: "15, hello", baz: "20, 30", foo: "5, 10, world"}
} catch (e) {
  console.log(e);
}
try {
  console.log(mergeKeyValuePairs("{}"));
} catch (e) {
  console.log(e);
}
try {
  console.log(deepArrayEquality(arr4, arr5)); // true
} catch (e) {
  console.log(e);
}
try {
  console.log(deepArrayEquality([1, 2], { a: 1 })); // throws error
} catch (e) {
  console.log(e);
}
try {
  console.log(replaceCharsAtIndexes("mississippi", [1, 4, 7])); //Returns: "missmssspps"
} catch (e) {
  console.log(e);
}
try {
  console.log(replaceCharsAtIndexes(12345, [2])); // throws error
} catch (e) {
  console.log(e);
}
try {
  console.log(anagrams("Listen to the silent night", "listen")); // Returns: ["Listen", "silent"]
} catch (e) {
  console.log(e);
}
try {
  console.log(anagrams("hello there", ["target"])); // Throws error
} catch (e) {
  console.log(e);
}
try {
  console.log(charSwap("hello", "worldwide")); // Returns: "dello worldwihe"
} catch (e) {
  console.log(e);
}
try {
  console.log(charSwap("     ", "hello")); // Throws error (first string is only spaces)
} catch (e) {
  console.log(e);
}
try {
  console.log(processObjects([first, second], (x) => x + 1)); // Returns: { x: 15, y: 4, a: 71, z: 6 } // Explanation: // x = (2 + 1) * (4 + 1) // y = 3 + 1 // a = 70 + 1 // z = 5 + 1
} catch (e) {
  console.log(e);
}
try {
  console.log(processObjects([first, second, 42], (x) => x + 1)); //throws error
} catch (e) {
  console.log(e);
}
try {
  console.log(similarKeysValues(obj3, obj4)); // returns { a: { x: 1, y: 2 }, b: 3 }
} catch (e) {
  console.log(e);
}
try {
  console.log(similarKeysValues([1, 2, 3], [1, 2, 3])); //throws error
} catch (e) {
  console.log(e);
}
try {
  console.log(flipKeysForStringsAndNumbers(example3)); // Returns: { test: 'a', apple: 'b_0', banana: 'b_1', d: { 5: 'y', ok: 'z' } }
} catch (e) {
  console.log(e);
}
try {
  console.log(flipKeysForStringsAndNumbers("hello")); // throws error
} catch (e) {
  console.log(e);
}

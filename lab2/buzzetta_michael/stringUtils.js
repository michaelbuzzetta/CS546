/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

export let replaceCharsAtIndexes = (str, idxArr) =>
{
  if (typeof str !== "string") throw "Error, please enter a string";
  if (str.trim() == "") throw "Error, string cannot be only whitespace";
  if (!Array.isArray(idxArr)) throw "Error, please enter an array";
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  idxArr.forEach((element) => 
  {
    if (typeof element !== "number") throw "Error, please enter a valid array";
    if (element <= 0) throw "Error, element cannot be 0";
    if (element >= str.length - 2) throw "Error, element is too large";
  });

  let sToArr = str.split("");
  let tempString = str;

  for (let index = 0; index < sToArr.length; index++)
  {
    if (idxArr.includes(index)) {
      let before = str[index - 1];
      let after = str[index + 1];
      let subStr = str.substring(index, str.length);
      let beforeTrue = true;
      for (let i = index + 1; i < tempString.length; i++)
      {
        if (tempString[i] == tempString[index]) 
        {
          if (beforeTrue) 
          {
            sToArr[i] = before;
            beforeTrue = false;
          } 
          else
          {
            sToArr[i] = after;
            beforeTrue = true;
          }
        }
      }
    }
  }
  let arrToStr = sToArr.join("");
  return arrToStr;
};

export let anagrams = (str, target) =>
{
  if (typeof str !== "string") throw "Error, please enter a string";
  if (str.trim() == "") throw "Error, string cannot be only whitespace";
  if (typeof target !== "string") throw "Error, please enter a string";
  if (target.trim() == "") throw "Error, string cannot be only whitespace";

  let targetSort = target.toLowerCase().split("").sort().join("");
  let targetLength = target.length;
  //https://www.w3schools.com/jsref/jsref_regexp_whitespace.asp
  let strSplit = str.split(/\s+/);
  let anagrams = [];

  strSplit.forEach((target) => 
  {
    if ( target.length == targetLength && target.toLowerCase().split("").sort().join("") == targetSort)
    {
      anagrams.push(target);
    }
  });
  return anagrams;
};

export let charSwap = (str1, str2) => 
{
  if (str1 == null) throw "Error, please enter a string";
  if (str2 == null) throw "Error, please enter a string";
  if (typeof str1 !== "string") throw "Error, please enter a string";
  if (typeof str2 !== "string") throw "Error, please enter a string";
  if (str1.length < 2 || str2.length < 2) throw "Error, string is too short";
  if (str1.trim() == "" || str2.trim() == "") throw "Error, string cannot be only spaces";
  let mid = Math.floor(Math.min(str1.length, str2.length) / 2);
  let newStr1 = str2.slice(-mid) + str1.slice(mid);
  let newStr2 = str2.slice(0, -mid) + str1.slice(0, mid);
  return newStr1 + " " + newStr2;
};

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

export let processObjects = (objArr, func) => 
{
  if (!Array.isArray(objArr)) throw "Error, please enter a valid array";
  if (objArr.length == 0) throw "Error, please enter an array with atleast one object";
  if (typeof func !== "function") throw "Error, please enter a function";

  objArr.forEach((obj) => 
  {
    if (obj === null) throw "Error, object cannot be null";
    if (typeof obj !== "object")
      throw "Error, element in input is not an object.";
    if (Object.keys(obj).length === 0) throw "Error, object in input is empty.";
    for (let key in obj)
    {
      if (typeof obj[key] !== "number") throw "Error, the value of key must be a number";
    }
  });

  let output = {};

  objArr.forEach((obj) => 
  {
    for (let key in obj) 
    {
      const newValue = func(obj[key]);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
      if (output.hasOwnProperty(key)) 
      {
        output[key] *= newValue;
      }
      else
      {
        output[key] = newValue;
      }
    }
  });

  return output;
};

export let similarKeysValues = (obj1, obj2) => 
{
  if (typeof obj1 !== "object" || Array.isArray(obj1)) throw "Error, object 1 must be an object variable type";
  if (typeof obj2 !== "object" || Array.isArray(obj2)) throw "Error, object 2 must be an object variable type";
  if (obj1 == null) throw "Error, object 1 cannot be null";
  if (obj2 == null) throw "Error, object 2 cannot be null";

  let output = {};
  let objKey1;
  let objKey2;
  for (let key in obj1) 
  {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) 
    {
      objKey1 = obj1[key];
      objKey2 = obj2[key];

      if (typeof objKey1 == "object" && typeof objKey2 == "object")
      {
        let recur = similarKeysValues(objKey1, objKey2);
        if (Object.keys(recur).length > 0)
        {
          output[key] = recur;
        }
      } 
      else if (objKey1 == objKey2) 
      {
        output[key] = objKey1;
      }
    }
  }
  return output;
};

export let flipKeysForStringsAndNumbers = (obj) => 
{
  if (typeof obj !== "object") throw "Error, please enter an object";
  if (obj == null) throw "Error, object cannot be null";
  if (Array.isArray(obj)) throw "Error, obj cannot be an array";
  if (Object.keys(obj).length === 0) throw "Error, please enter something";

  let output = {};
  let newVal;

  for (let key in obj) 
  {
    if (obj.hasOwnProperty(key)) 
    {
      newVal = obj[key];

      if (typeof newVal == "string" && newVal.trim() == "") throw "Error, its fine if you enter a string, but theres gotta be something in the string.";
      if (typeof newVal == "string" || typeof newVal == "number") 
      {
        //if(isNaN(newVal)) throw "Error, value cannot be NaN";
        output[newVal] = key;
      } 
      else if (Array.isArray(newVal)) 
      {
        newVal.forEach((element, index) => 
        {
          if (typeof element !== "string" && typeof element !== "number") throw "Error, the value is neither a number or a string. Do better.";
          output[element] = `${key}_${index}`;
        });
      } 
      else if (typeof newVal === "object" && newVal !== null) 
      {
        let internalObj = flipKeysForStringsAndNumbers(newVal);
        output[key] = internalObj;
      } 
      else
        throw "Error, value for key must be a string, number, array, or object.";
    }
  }
  return output;
};

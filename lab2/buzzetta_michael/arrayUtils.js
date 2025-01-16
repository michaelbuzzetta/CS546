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

export let arrayAnalysis = (arr) => 
{
  if (!arr) throw "Error, please enter something";
  if (!Array.isArray(arr)) throw "Error, please enter a valid Array";
  if (arr.length == 0) throw "Error, please enter atleast one number";
  let average = 0;
  let middleVal = 0;
  let frequentVal = [];
  let span = 0;
  let lowest = arr[0];
  let highest = 0;
  let totalCount = 0;
  let totalSum = 0;
  let seen = {};
  for (let i = 0; i < arr.length; i++) 
  {
    if (isNaN(arr[i])) throw "Error, please enter a valid number";
    if (typeof arr[i] != "number") throw "Error, please enter a valid number";
    totalCount++;
    totalSum += arr[i];
    if (arr[i] < lowest) 
    {
      lowest = arr[i];
    }
    if (arr[i] > highest) 
    {
      highest = arr[i];
    }
    if (seen[arr[i]]) 
    {
      seen[arr[i]]++;
    } 
    else
    {
      seen[arr[i]] = 1;
    }
  }
  let frequency = 0;
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  for (const [key, value] of Object.entries(seen)) 
  {
    if (value > frequency) 
    {
      frequentVal = [];
      frequency = value;
      frequentVal.push(key);
    } 
    else if (value == frequency) 
    {
      frequentVal.push(key);
    }
  }
  if (frequentVal.length == 1) 
  {
    frequentVal = frequentVal[0];
  }
  if (frequentVal.length == arr.length) 
  {
    frequentVal = null;
  }
  let sort = [...arr];
  sort = sort.sort((a, b) => a - b);
  //https://blog.stackademic.com/finding-the-median-of-an-array-in-javascript-82ff31b3f544
  const median = Math.floor(sort.length / 2);
  if (sort.length % 2 == 0) 
  {
    middleVal = (sort[median - 1] + sort[median]) / 2;
  } 
  else 
  {
    middleVal = sort[median];
  }
  average = totalSum / totalCount;
  span = highest - lowest;
  let answer = 
  {
    average: average,
    middleValue: middleVal,
    frequentValue: frequentVal,
    span: span,
    lowest: lowest,
    highest: highest,
    totalCount: totalCount,
    totalSum: totalSum,
  };
  return answer;
};

export let mergeKeyValuePairs = (...arrays) => 
{
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  if (!arrays) throw "Error, please enter a valid array";
  if (!Array.isArray(arrays)) throw "Error, please enter atleast one valid Array";
  if (arrays.length == 0) throw "Error, please enter at least one valid data point";
  let store = {};
  let stringStore = [];
  let intStore = [];

  for (let input of arrays) 
  {
    let [key, value] = input;
    if (!Array.isArray(input)) throw "Error, each input must be an array";
    if (input.length !== 2) throw "Error, each array must have exactly two arguments";
    if (typeof key !== "string") throw "Error, key must be a string";
    if (typeof value !== "number" && typeof value !== "string") throw "Error, value must be a string or a number";

    if (typeof value == "string") 
    {
      if (stringStore[key]) 
      {
        stringStore[key].push(value);
      } 
      else 
      {
        stringStore[key] = [value];
      }
    } 
    else 
    {
      if (intStore[key]) 
      {
        intStore[key].push(value);
      }
      else 
      {
        intStore[key] = [value];
      }
    }
  }

  for (let key in intStore) 
  {
    intStore[key].sort((a, b) => a - b);
  }
  for (let key in stringStore) 
  {
    stringStore[key].sort((a, b) => a - b);
  }
  //console.log(intStore);

  let combine = {};
  for (let key in intStore) 
  {
    combine[key] = intStore[key];
  }
  for (let key in stringStore) 
  {
    if (combine[key]) 
    {
      combine[key] = combine[key].concat(stringStore[key]);
    } 
    else 
    {
      combine[key] = stringStore[key];
    }
  }

  let temp = Object.entries(combine).sort(([a], [b]) => a.localeCompare(b));
  let output = Object.fromEntries(temp);

  // //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  // for (const [key, value] of Object.entries(store))
  // {
  //   output[key]= value;
  // }

  return output;
};

export let deepArrayEquality = (...arrays) => 
{
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  if (arrays.length < 2) throw "Error, please provide atleast two arrays";
  let start = arrays[0];
  let next = [];
  if (Array.isArray(start))
  {
    for (let i = 1; i < arrays.length; i++)
    {
      next = arrays[i];
      if (!Array.isArray(next)) throw "Error, not an array";
      if (start.length !== next.length)
      {
        return false;
      } 
      else 
      {
        for (let x = 0; x < start.length; x++) 
        {
          //console.log(Array.isArray(start[x]) && Array.isArray(next[x]));
          if (Array.isArray(start[x]) && Array.isArray(next[x])) 
          {
            if (!deepArrayEquality(start[x], next[x])) 
            {
              return false;
            }
          } 
          else if (typeof start[x] == "object" && typeof next[x] == "object") 
          {
            if (!objCheck(start[x], next[x]))
            {
              return false;
            }
          } 
          else if (start[x] !== next[x])
          {
            return false;
          }
        }
      }
    }
  } 
  else 
  {
    throw "Error, not an array";
  }
  return true;
};

const objCheck = (obj1, obj2) => 
{
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
  {
    return false;
  }
  for (let key in obj1)
  {
    if (Array.isArray(obj1[key] && Array.isArray(obj2[key])))
    {
      deepArrayEquality(obj1[key], obj2[key]);
    } 
    else if (typeof obj1[key] == "object" && typeof obj2[key] == "object")
    {
      objCheck(obj1[key], obj2[key]);
    }
    else if (obj1[key] !== obj2[key]) 
    {
      return false;
    }
  }
  return true;
};

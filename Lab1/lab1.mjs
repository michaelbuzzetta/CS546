/*
CAs that helped:
Jack Gibson
Bernard Vitale
*/
export const questionOne = (arr) => 
{
  // Implement question 1 here

  let primeSum = 0;
  let compSum = 0;
  let isEven = false;
  for (let i = 0; i < arr.length; i++) 
  {
    if (primeCheck(arr[i]))
    {
      primeSum += arr[i]
    }
    else
    {
      compSum += arr[i];
    }

    if (compSum % 2 == 0 && primeSum % 2 == 0) 
    {
      isEven = true;
    }
    else
    {
      isEven = false;
    }
  }

  return [primeSum, compSum, isEven]; //return result
};

const primeCheck = (num) =>
{
  if (num == 2)
  {
    return true;
  }
  else if (num ==1 || num%2==0)
  {
    return false;
  }
  else if(num<0)
  {
    return false;
  }
  else 
  {
    for (let i = 2; i < num / 2; i++) 
    {
      if (num % i == 0)
      {
        return false;
      }
    }
  }
  return true;
}

export const questionTwo = (index, multiplier) => {
  let prev = 0;
  let next = 1;
  let total;
  if(index==null || multiplier==null)
  {
    return {0: 0};
  }
  if (index == 0) 
  {
    return {0: index*multiplier};
  }
  if (index == 1) 
  {
    return {1: index*multiplier};
  }
  for (let i = 2; i <= index; i++) 
  {
    total = prev + next;
    prev = next;
    next = total;
  }
  let answer = {};
  let fibNum=next;
  answer[fibNum]=next*multiplier;
  return answer; //return result
};


export const questionThree = (str) => 
  {
    // Implement question 3 here
    let wordCount=0;
    let strArr=str.replace(/*from here*//[^a-zA-Z\s]/g, "")/* to here, I used the following website: https://www.geeksforgeeks.org/javascript-program-to-remove-non-alphanumeric-characters-from-a-string/*/
    // strArr=strArr.replace('  ', ' ');
    // console.log(strArr);
    strArr=strArr.split(' ');
    for(let i=0; i<strArr.length; i++)
    {
      if(strArr[i]!=='')
      {
        wordCount+=1;

      }
    }
    //console.log(strArr);
    return wordCount; //return result
  };

export const questionFour = (arr) => 
{
  // Implement question 4 here
  let currentNum=0;
  let allNum=0;
  let answer=0;
  if(arr.length==0)
  {
    return 0;
  }
  for(let i=0; i<arr.length; i++)
  {
    currentNum=arr[i];
    allNum+=currentNum*currentNum*currentNum;
  }
  answer= allNum/arr.length;
  answer=Math.round(answer);
  return answer; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING OR NOT CHANGED.
export const studentInfo =
{
  firstName: 'Michael',
  lastName: 'Buzzetta',
  studentId: '10468107'
};

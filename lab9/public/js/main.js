/*
UUsing JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element (this will be the Fibonacci index) 
Calculate the Fibonacci value for the given index
Determine whether or not the number is a prime number
Add a list item to the #fibonacciResults list of numbers you have checked. This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
If the user does not have a value for the input when they submit, you should not continue checking and instead should inform them of an error somehow.


*/

const fibonacci = (index) => {
  let prev = 0;
  let next = 1;
  let total;
  if (index == null) {
    return 0;
  }
  if (index <= 1) {
    return 0;
  }
  if (index == 1) {
    return 1;
  }
  for (let i = 2; i <= index; i++) {
    total = prev + next;
    prev = next;
    next = total;
  }
  return total;
};

const primeCheck = (num) => {
  if (num == 2) {
    return true;
  } else if (num == 1 || num % 2 == 0) {
    return false;
  } else if (num < 0) {
    return false;
  } else {
    for (let i = 2; i < num / 2; i++) {
      if (num % i == 0) {
        return false;
      }
    }
  }
  return true;
};

const isInt = (input) => {
  let output = input % 1;
  if (output == 0) {
    return true;
  } else {
    return false;
  }
};

$("#fibForm").submit((event) => {
  event.preventDefault();
  $("#error").hide();
  //console.log("test");
  //$('#fibonacci_index_input').removeClass('inputClass');
  //let input = $("#fibonacci_index_input").val().trim();
  console.log($("#fibonacci_index_input").val().trim());
  if (!$("#fibonacci_index_input").val().trim()) {
    $("#error").html("Error, please enter something");
    $("#error").show();
    $("#fibonacci_index_input").focus();
  } else if (!$.isNumeric($("#fibonacci_index_input").val().trim())) {
    $("#error").html("Error, please enter a number");
    $("#error").show();
    $("#fibonacci_index_input").focus();
  } else if (!isInt($("#fibonacci_index_input").val().trim())) {
    $("#error").html("Error, please enter a whole number/integer");
    $("#error").show();
    $("#fibonacci_index_input").focus();
  } else {
    let output = fibonacci($("#fibonacci_index_input").val().trim());
    let mightBePrime = primeCheck(output);
    let li;
    if (mightBePrime) {
      li = `<li class=is-prime>The Fibonacci of ${$(
        "#fibonacci_index_input"
      ).val()} is ${output}.</li>`;
    } else {
      li = `<li class=not-prime>The Fibonacci of ${$(
        "#fibonacci_index_input"
      ).val()} is ${output}.</li>`;
    }
    $("#fibonacciResults").append(li);

    $("#fibonacci_index_input").val("");
  }
});

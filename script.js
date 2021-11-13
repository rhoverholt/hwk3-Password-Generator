// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
// and notify user if they canceled the pwd generation
function writePassword() {
  var password = generatePassword();
  if (password != null) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  } else {
    alert("Password Generation Canceled");
  }
}

// Interact with user to determine password criteria and ultimately generate the password
// INPUT: none
// OUTPUT: null if the user aborted, or a valid password of the user-defined length with their charsets.
// PROCESS: Will generate multiple modal questions for the user to answer 
function generatePassword() {

  let pwdLength = getPwdLength();

  // If the user cancelled out of the length questions, abort password generation
  if (pwdLength === null) {return(null)};

  let charString = getCharString();

  // user must enter at least one charset.  If they did not, make them aware so they can abort or try again.
  while (charString === "") {
    
    let wantContinue = confirm("At least one character set must be selected to continue.\nClick 'OK' to try again or 'Cancel' to abort.");

    if (wantContinue) {
      charString = getCharString();
    } else {
      return(null);
    }
  }

  // Generate and return the actual password
  return getPassword(pwdLength, charString)
 
  //The end, the rest are all of the functions used

  // This function will ask the user for a valid length for the password and
  // handle all error scenarios, returning null whenever the user cancels or a valid integer
  function getPwdLength() {
    
    const minPwdLength = 8;
    const maxPwdLength = 128;
    let pwdLength = prompt("How long should your password be (8-128):", 10);

    // While they haven't entered an integer in the range of 8-128
    // Note, this loop allows them to cancel twice at any point to leave the generation process.
    while (!(pwdLength >= minPwdLength && pwdLength <= maxPwdLength && pwdLength == parseInt(pwdLength,10))) {

      // Handle user request to cancel password generation
      if (pwdLength === null) {
          pwdLength = prompt("Press cancel to cancel the password generation process or enter a password length to continue (8-128):", 10);
      }

      // Cancel and return if user truly chooses to cancel
      if (pwdLength === null) {
        return (null);
      }

      // Ensure user entered length is an integer in the range of 8-128
      if (pwdLength >= 8 && pwdLength <= 128 && pwdLength == parseInt(pwdLength,10)) {
        return (pwdLength);
      } else {
        pwdLength = prompt("Invalid answer.  \n\nPlease enter the length as a regular number (no decimals) between 8 and 128:", 10);
      }
    }
    return(pwdLength);
  }

  function getCharString() {

    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = lowerCaseChars.toUpperCase();
    const numericChars = "0123456789";
    const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    let useLowerCase = allowCharSet("LOWER CASE LETTERS", lowerCaseChars);
    let useUpperCase = allowCharSet("UPPER CASE LETTERS", upperCaseChars);
    let useNumeric = allowCharSet("NUMBERS", numericChars);
    let useSpecial = allowCharSet("SPECIAL CHARACTERS", specialChars);
        
    let outputString = "";

    if (useLowerCase) {outputString += lowerCaseChars;}
    if (useUpperCase) {outputString += upperCaseChars;}
    if (useNumeric) {outputString += numericChars;}
    if (useSpecial) {outputString += specialChars;}

    return(outputString);

    function allowCharSet(setName, setDetails) {
      return (confirm(`\n
${setName} (${setDetails})\n
Press 'OK' to allow these in your password.\n
Press 'Cancel' to not allow them in your password.\n`)
      )
    }
  }
  function getPassword (pwdLength, passwordChars) {

    Password = "";

    while (Password.length < pwdLength) {
      Password += passwordChars[Math.floor(Math.random() * passwordChars.length)];
    }

    return Password;
  }
}
/*
function random_password_generate(min,max)
{
    var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
    var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
}

document.getElementById("generatePassword").addEventListener("click", function(){
    random_password = random_password_generate(16,8);
    document.getElementById("randomPassword").value = random_password;
}); 
*/
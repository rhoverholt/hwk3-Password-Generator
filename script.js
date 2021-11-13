// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
// and notify user if they aborted the pwd generation
function writePassword() {

  var password = generatePassword();

  if (password != null) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  } else {
    // Simple abort message for all error scenarios
    alert("Password Generation Canceled");
  }
}

/********************************************************************************************************/
// Interact with user to determine password criteria and ultimately generate the password
// INPUT: none
// OUTPUT: null if the user aborted, or a valid password of the user-defined length with their charsets.
// USER INTERACTION: Will generate multiple modal questions for the user to answer 
/********************************************************************************************************/
function generatePassword() {

  // First user interaction -- get the desired length of the password
  let pwdLength = getPwdLength();

  // If the user cancelled out of the length questions, abort password generation
  if (pwdLength === null) {return(null)};

  // Second user interaction -- determine which character sets to include
  let charString = getCharString();

  // user must enter at least one charset.  If they did not, make them aware so they can abort or try again.
  while (charString === "") {

    let wantContinue = confirm("At least one character set must be selected to continue.\nClick 'OK' to try again or 'Cancel' to abort.");

    if (wantContinue) {
      // Try again
      charString = getCharString();
    } else { // Abort at user's request.
      return(null);
    }
  }

  // Generate and return the actual password
  return getPassword(pwdLength, charString)

  /********************************************************************************************************/
  // The end, the rest are the internal functions used
  /********************************************************************************************************/

  /********************************************************************************************************/
  // This function will ask the user for a valid length for the password and
  // handle all error scenarios, returning null whenever the user cancels or else the valid integer entered
  /********************************************************************************************************/
function getPwdLength() {
    
    const minPwdLength = 8;
    const maxPwdLength = 128;
    let pwdLength = prompt("How long should your password be (8-128):", 10);

    // While they haven't entered an integer in the range of 8-128, allow the user to try again.
    // Make them cancel twice to abort the generation process.
    while (!(pwdLength >= minPwdLength && pwdLength <= maxPwdLength && pwdLength == parseInt(pwdLength,10))) {

      // Handle user request to cancel password generation
      if (pwdLength === null) {
          pwdLength = prompt("Press cancel to abort the password generation process or enter a password length to continue (8-128):", 10);
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

  /********************************************************************************************************/
  // OUTPUT: This function returns a string of valid characters to include in the password or null to abort
  // INPUT: None
  // User Interface: Multiple modal messages are sent to the user to determine which characters to include
  /********************************************************************************************************/
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

    // A deeply nested function to avoid the ugliness of repeating it 4 times above.
    function allowCharSet(setName, setDetails) {
      return (confirm(`\n
${setName} (${setDetails})\n
Press 'OK' to allow these in your password.\n
Press 'Cancel' to not allow them in your password.\n`)
      )
    }
  }

  /********************************************************************************************************/
  // INPUT: The desired length and the possible chars to include
  // OUTPUT: A string of the desired length including random characters from the list
  // User Interface: None
  /********************************************************************************************************/
  function getPassword (pwdLength, passwordChars) {

    // Validate the input data, aborting if it is invalid
    // pwdLength must be a number that is 1 or greater
    if (!(typeof pwdLength === 'number') && (isNaN(pwdLength)) && (pwdLength >= 1)) {
      
      console.log (typeof pwdLength);

      console.log (typeof pwdLength === 'number');
      console.log(isNAN(pwdLength));
      console.log(pwdLength >= 1);

      return null;
    }

    // passwordChars must be a non-empty string
    if (!(typeof passwordChars === 'string')) {return null}

    // Input is valid, so process through and create the output Password.
    Password = "";

    while (Password.length < pwdLength) {
      Password += passwordChars[Math.floor(Math.random() * passwordChars.length)];
    }

    return Password;
  }
}
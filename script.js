var birthDate = document.querySelector("#birth-date");
var btnCheck = document.querySelector("#btn-check");
var output = document.querySelector("#output");

function reverseStr(str) {
  return str.split("").reverse().join("");
}
function isPalindrome(str) {
  var reverse = reverseStr(str);
  if (str === reverse) {
    return true;
  } else {
    return false;
  }
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindrome = getAllDateFormats(date);

  var flag = false;
  for (var i = 0; i < listOfPalindrome.length; i++) {
    if (isPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  var day = date.day + 1; //1
  var month = date.month; //2
  var year = date.year; //2020

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousDate(date) {
  var day = date.day - 1; //0
  var month = date.month; //2
  var year = date.year; //2020

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 3 && day === 0) {
    if (isLeapYear(year)) {
      day = 29;
      month--;
    } else {
      day = 28;
      month--;
    }
  } else {
    if (day <= 0) {
      day = daysInMonth[month - 2];
      month -= 1;
    }
  }

  if (month <= 0) {
    day = 31;
    month = 12;
    year -= 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var count = 0;
  var nextDate = getNextDate(date);
  while (1) {
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

function checkhandler() {
  var dateInput = birthDate.value;

  if (dateInput === "") {
    output.innerText = "Please enter your birth-date!";
  } else {
    var listOfDate = dateInput.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome=checkPalindromeForAllDateFormats(date);

    if(isPalindrome){

        output.innerText = "Yes your birthday is a plindrome"
    }
    else{
        var [count, nextDate] = getNextPalindromeDate(date);
        output.innerText = `Oops! The closest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days!`;
      }
   
  }
}

btnCheck.addEventListener("click", checkhandler);


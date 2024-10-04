function palindromeCheck(number) {
    if (number < 0) return false;
    let numStr = number.toString();
    return isPalindrome(numStr, 0, numStr.length - 1);
}

function isPalindrome(str, start, end) {
    if (start >= end) return true;
    if (str[start] !== str[end]) return false;
    return isPalindrome(str, start + 1, end - 1);
}

// Checking the given number is palindrome or not
console.log(palindromeCheck(121));    // true
console.log(palindromeCheck(12321));  // true
console.log(palindromeCheck(12345));  // false
console.log(palindromeCheck(12341));  // false
console.log(palindromeCheck(1221));   // true
console.log(palindromeCheck(10));     // false
console.log(palindromeCheck(-10));    // false
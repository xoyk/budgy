const decl = function(number, words) {
  var value = Math.abs(number) % 100;
  var num = value % 10;
  var result = value + ' '
  if(value > 10 && value < 20) {
    result = result + words[2]
  } else if(num > 1 && num < 5) {
    result = result + words[1]
  } else if(num == 1) {
    result = result + words[0]
  } else {
    result = result + words[2]
  }

  return result
}

export default {
  decl,
}


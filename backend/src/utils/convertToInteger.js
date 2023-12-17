const convertToInteger = (str) => {
  if (/^\d+$/.test(str)) {
    return parseInt(str, 10);
  } else {
    return str;
  }
};

module.exports = convertToInteger;

const CreateError = require("http-errors");

const generateSlug = (inputString) => {
  // Trim leading ,trailing spaces & Remove characters
  let cleanedString = inputString.trim().replace(/["().,&\-]/g, "");
  // Replace spaces with hyphens
  let hyphenatedString = cleanedString.replace(/\s+/g, "-");
  if (!hyphenatedString) throw CreateError(404, "Invalid hyphenation");
  return hyphenatedString.toLowerCase();
};

const generateSKU = (length = 8) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    sku += charset.charAt(randomIndex);
  }
  return sku;
};

module.exports = { generateSlug, generateSKU };

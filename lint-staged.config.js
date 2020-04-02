const runLint = (files) => {
  return `eslint ${files.join(' ')} --fix`;
};

module.exports = {
  '*.{js,ts,jsx,tsx}': runLint
};

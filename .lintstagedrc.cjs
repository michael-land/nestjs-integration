module.exports = {
  '*.{ts}': ['eslint --fix', 'git add'],
  '*.{ts,md,json}': ['prettier --write', 'git add'],
};

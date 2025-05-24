const isPasswordValid = (password: string) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};
export default isPasswordValid;

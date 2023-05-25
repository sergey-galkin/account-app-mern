module.exports = {

  checkName(name) {
    if (name.trim().length === 0) return 'This field is required';
    return '';
  },
  
  checkPassword(password) {
    if (password.length < 7) return 'Password must be at least 7 characters';
    if (password.length > 100) return 'Password must be less than 100 characters';
    if (/[а-яё]/i.test(password)) return 'Password must not contain cyrillic characters';
    if (!/\d/.test(password)) return 'Password must contain at least 1 digit';
    if (!/[a-z]/.test(password)) return 'Password must contain at least 1 latin alphabet character';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase latin alphabet character';
    if (!/[\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/.test(password)) return 'Password must contain at least 1 special character: []/\\^$.|*+()@!~_={}-';
    if ((password.match(/[\da-z\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/ig) || []).length != password.length) {
      return 'The password must contain only the following special characters: []/\\^$.|*+()@!~_={}-';
    }
    
    return '';
  },
  
  checkRepeatedPassword(password, repeatedPassword) {
    if (password !== repeatedPassword) return 'Passwords does not match';
    return '';
  },
  
  checkEmail(email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i.test(email)) return 'Email must match the following template: example@example.com';
    if (email.length > 100) return 'Email must be less than 100 characters';
    return '';
  },
  
  checkSex(sex) {
    if (sex !== '' && !/[mf]/i.test(sex)) return 'Check data in this field';
    return '';
  },
  
  checkBirthDate(birthDate) {
    if (/^\d\d\d\d-\d\d-\d\d$/.test(birthDate) || birthDate === '') return '';
    return 'Check data in this field';
  },
  
};

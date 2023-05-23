const User = require('../db/User');

const registration = (req, res) => {
  const checks = checkRegData(req.body);
  if (!checks.status) return res.send(checks);

  const user = new User({
    name: req.body.name,
    salt: Math.random() + '',
    password: req.body.password,
    email: req.body.email,
    birthday: req.body.birthday,
    sex: req.body.sex,
  });
  
  user.save(function (err, user) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send({
      status: true,
      msg: 'User created'
    });

  });
};

// function isEmailUnique(req, res) {
//   return new Promise(function (resolve, reject) {
    
//     User.findOne({email: req.body.email.toLowerCase()}, function (err, _user) {
//       if (err) {
//         reject(err);
//         return;
//       }
//       if (_user) {
//         reject({status: false, warnings: {email: 'User with specified email is already exist.'}});
//       } else {
//         resolve();
//       }
//     })
    
//   })
// };

function checkRegData({ name, password, email, birthDate, sex }) {
  let status = true;
  const warnings = {
    name: checkName(name),
    password: checkPassword(password),
    email: checkEmail(email),
    sex: checkSex(sex),
    birthDate: checkBirthDate(birthDate),
  };

  if (!Object.keys(warnings).length) status = false;

  return {status, warnings};
};

function checkName(name) {
  if (name.trim().length < 0) return 'This field is required';
  return '';
};

function checkPassword(password) {
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
};

function checkEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i.test(email)) return 'Email must match the following template: example@example.com';
  if (email.length > 100) return 'Email must be less than 100 characters';
  return '';
};

function checkSex(sex) {
  if (!/[mf]/i.test(sex)) return 'Check data in this field';
  return '';
};

function checkBirthDate(birthDate) {
  try {
    new Date(birthDate)
  } catch (error) {
    return 'Check data in this field';
  }
  return '';
};


module.exports = registration;

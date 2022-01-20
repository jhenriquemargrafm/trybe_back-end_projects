const validateEmail = (email) => {
  if (email === '') {
    return { err: { message: '"email" is not allowed to be empty', code: 400 } };
  }

  if (!email) {
    return { err: {
      message: '"email" is required',
      code: 400,
    } };
  }

  const format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!format.test(email)) {
    return { err: {
      message: '"email" must be a valid email',
      code: 400,
    } };
  }
  
  return null;
};

const validatePassword = (password) => {
  if (password === '') {
    return { err: { message: '"password" is not allowed to be empty', code: 400 } };
  }

  if (!password) {
    return { err: {
      message: '"password" is required',
      code: 400,
    } };
  }

  if (password.length < 6) {
    return { err: {
      message: '"password" length must be 6 characters long',
      code: 400,
    } };
  }

  return null;
};

const validateFields = ({ email, password }) => {
  const emailValidation = validateEmail(email);
  if (emailValidation) return emailValidation;

  const passwordValidation = validatePassword(password);
  if (passwordValidation) return passwordValidation;

  return null;
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const isLoginOK = validateFields({ email, password });

  if (isLoginOK) {
    return res.status(isLoginOK.err.code).json({ message: isLoginOK.err.message });
  }

  next();
};

module.exports = {
  loginValidation,
};

const validateEmail = (email) => {
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

const validateDisplayName = (displayName) => {
  if (!displayName || displayName.length < 8) {
    return { err: {
      message: '"displayName" length must be at least 8 characters long',
      code: 400,
    } };
  }

  return null;
};

const validateImage = (image) => {
  if (!image) {
    return { err: {
      message: '"image" is required',
      code: 400,
    } };
  }

  return null;
};

const validateFields = ({ email, password, displayName, image }) => {
  const emailValidation = validateEmail(email);
  if (emailValidation) return emailValidation;

  const passwordValidation = validatePassword(password);
  if (passwordValidation) return passwordValidation;

  const displayNameValidation = validateDisplayName(displayName);
  if (displayNameValidation) return displayNameValidation;
  
  const imageValidation = validateImage(image);
  if (imageValidation) return imageValidation;
  
  return null;
};

const userValidation = (req, res, next) => {
  const { email, password, displayName, image } = req.body;
  const isUserOK = validateFields({ email, password, displayName, image });

  if (isUserOK) {
    return res.status(isUserOK.err.code).json({ message: isUserOK.err.message });
  }

  next();
};

module.exports = {
  userValidation,
};
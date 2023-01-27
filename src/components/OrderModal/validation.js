export const nameValidation = {
  validate: (value) => {
    if (value.match(/[0-9]/)) {
      return 'The name cannot contain numbers.';
    }

    return true;
  },
};

export const phoneValidation = {
  validate: (value) => {
    if (value.length !== 17) {
      return 'The phone number must contain 9 symbols.';
    }

    return true;
  },
};

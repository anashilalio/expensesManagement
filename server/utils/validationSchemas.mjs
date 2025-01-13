export const ExpenseValidationSchema = {
    category: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    description: {
        optional: true,
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        }
    },
    amount: {
        notEmpty: {
            errorMessage: 'Amount is empty!'
        }, 
        custom: {
            options: (value) => {
                if(typeof value === 'number' && !isNaN(value))
                    return true
                throw new Error("Amount must be a number");
            }
        }
    },
    date: {
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        },
        isISO8601: {
            errorMessage: 'Date must be a valid ISO8601 date'
        },
        custom: {
            options: (date) => {
                if (Math.abs(date - new Date) > 60000) 
                    throw new Error('Date must be in the future');
                return true;
            }
        }
    }
}

export const UserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        }
    }
}
export const BudgetValidationSchema = {
    category: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    amount: {
        notEmpty: {
            errorMessage: 'Amount is empty!'
        }, 
        custom: {
            options: (value) => {
                if(typeof value === 'number' && !isNaN(value))
                    return true
                throw new Error("Amount must be a number");
            }
        }
    }
}

//auth schemas
export const loginCredentialsValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Name is empty!'
        },
        isString: {
            errorMessage: 'Name must be a string!'
        }
    }
}
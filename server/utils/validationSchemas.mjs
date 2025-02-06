export const addExpenseValidationSchema = {
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
            errorMessage: 'description is empty!'
        },
        isString: {
            errorMessage: 'description must be a string!'
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

export const deleteExpenseValidationSchema = {
    id: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    }
}

export const updateExpenseValidationSchema = {
    id: {
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
            errorMessage: 'description is empty!'
        },
        isString: {
            errorMessage: 'description must be a string!'
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
    maxAmount: {
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
    currentAmount: {
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
export const updateAmountBudgetValidationSchema = {
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
export const updateCommunityAmountBudgetValidationSchema = {
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    },
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
export const deleteBudgetValidationSchema = {
    category: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    }
}
export const deleteCommunityBudgetValidationSchema = {
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    },
    category: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    }
}

export const CategoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    color: {
        notEmpty: {
            errorMessage: 'color is empty!'
        },
        isString: {
            errorMessage: 'color must be a string!'
        }
    }
}

export const CommunityValidationSchema = {
    name: {
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
    }
}
export const addMemberToCommunityValidationSchema = {
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    }
}

export const CommunityCategoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    },
    color: {
        notEmpty: {
            errorMessage: 'color is empty!'
        },
        isString: {
            errorMessage: 'color must be a string!'
        }
    }
}

export const CommunityExpenseValidationSchema = {
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    },
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
            errorMessage: 'description is empty!'
        },
        isString: {
            errorMessage: 'description must be a string!'
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

export const CommunityBudgetValidationSchema = {
    communityCode: {
        notEmpty: {
            errorMessage: 'communityCode is empty!'
        },
        isString: {
            errorMessage: 'communityCode must be a string!'
        }
    },
    category: {
        notEmpty: {
            errorMessage: 'Category is empty!'
        },
        isString: {
            errorMessage: 'Category must be a string!'
        }
    },
    maxAmount: {
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
    currentAmount: {
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
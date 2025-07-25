import { LoanRule } from '../../interfaces/loanRules';

export const isBorrowerLegit: LoanRule = (input) => {
    const { creditScore } = input;

    if (creditScore >= 700) {
        return {
            result: true,
        };
    }

    return {
        result: false,
        reason: 'Credit score too low',
    };
};

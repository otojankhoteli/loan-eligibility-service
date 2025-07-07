import { LoanRule } from './interface';

export const isEligibleByMonthlyIncome: LoanRule = (input) => {
    const { monthlyIncome, requestedAmount, loanTermMonths } = input;

    if (monthlyIncome > (requestedAmount / loanTermMonths) * 1.5) {
        return {
            result: true,
        };
    }

    return {
        result: false,
        reason: 'Monthly income too low',
    };
};

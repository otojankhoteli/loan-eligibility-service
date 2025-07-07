export type LoanRuleInput = {
    monthlyIncome: number,
    requestedAmount: number,
    loanTermMonths: number
    creditScore: number;
};

export type LoanRuleExecutionResult = { result: boolean, reason?: string };

export type LoanRule = (input: LoanRuleInput) => LoanRuleExecutionResult;

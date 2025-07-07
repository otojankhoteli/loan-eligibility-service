import { isEligibleByCreditScore } from './rules/isEligibleByCreditScore';
import { isEligibleByMonthlyIncome } from './rules/isEligibleByMonthlyIncome';
import { LoanRuleInput, LoanRuleExecutionResult } from './rules/interface';

const collectRules = () => [
    isEligibleByCreditScore,
    isEligibleByMonthlyIncome,
];

const evaluateRules = (input: LoanRuleInput) => {
    const rules = collectRules();
    return rules.map((rule) => rule(input));
};

const selectRuleDecision = (ruleEvaluations: LoanRuleExecutionResult[]) => {
    const nonEligibleRules = ruleEvaluations.filter(({ result }) => result === false);
    if (nonEligibleRules.length === 0) {
        return {
            result: true,
            reason: 'Passed all checks',
        };
    }

    const nonEligibleRuleReasons = nonEligibleRules.map(({ reason }) => reason);
    const rejectionReason = nonEligibleRuleReasons.join('; ');

    return {
        result: false,
        reason: rejectionReason,
    };
};

export const evaluateLoanEligibility = (input: LoanRuleInput) => {
    const ruleEvaluationResults = evaluateRules(input);
    const decision = selectRuleDecision(ruleEvaluationResults);

    return decision;
};

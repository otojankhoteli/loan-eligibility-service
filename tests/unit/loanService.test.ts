import _ from 'lodash';
import { expect } from 'chai';
import { evaluateLoanEligibility } from '../../src/services/loanRulesService';
import { LoanRuleInput } from '../../src/services/rules/interface';

describe('loanRulesService', () => {
    const ruleInput: LoanRuleInput = {
        creditScore: 0,
        loanTermMonths: 1,
        monthlyIncome: 1000,
        requestedAmount: 1000,
    };

    let input: LoanRuleInput;

    beforeEach(() => {
        input = _.cloneDeep(ruleInput);
    });

    it('should return true when all of the loan rules are eligible', () => {
        input.creditScore = 800;
        input.monthlyIncome = 10000;
        const { result, reason } = evaluateLoanEligibility(input);

        expect(result).to.eq(true);
        expect(reason).to.eq('Passed all checks');
    });

    it('should return false when any of the loan rules are not eligible and should include reason', () => {
        input.monthlyIncome = 10000;
        const { result, reason } = evaluateLoanEligibility(input);

        expect(result).to.eq(false);
        expect(reason).to.eq('Credit score too low');
    });

    it('should include all non eligibility reasons', () => {
        const { result, reason } = evaluateLoanEligibility(input);

        expect(result).to.eq(false);
        expect(reason).to.eq('Credit score too low; Monthly income too low');
    });
});

import _ from 'lodash';
import { expect } from 'chai';
import { isEligibleByMonthlyIncome } from '../../../src/services/rules/isEligibleByMonthlyIncome';
import { LoanRuleInput } from '../../../src/services/rules/interface';

describe('isEligibleByMonthlyIncome', () => {
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

    it('should return false when monthlyIncome is less than (requestedAmount / loanTermMonths) * 1.5', () => {
        input.monthlyIncome = 100;
        const { result, reason } = isEligibleByMonthlyIncome(input);

        expect(result).to.eq(false);
        expect(reason).to.equal('Monthly income too low');
    });

    it('should return false when monthlyIncome is greater than (requestedAmount / loanTermMonths) * 1.5', () => {
        input.monthlyIncome = 10000;
        const { result } = isEligibleByMonthlyIncome(input);

        expect(result).to.eq(true);
    });
});

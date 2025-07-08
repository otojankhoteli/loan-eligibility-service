import _ from 'lodash';
import { expect } from 'chai';
import { isEligibleByCreditScore } from '../../../src/services/rules/isEligibleByCreditScore';
import { LoanRuleInput } from '../../../src/interfaces/loanRules';

describe('isEligibleByCreditScore', () => {
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

    it('should return false when credit score is less than 700', () => {
        input.creditScore = 699;
        const { result, reason } = isEligibleByCreditScore(input);

        expect(result).to.eq(false);
        expect(reason).to.equal('Credit score too low');
    });

    it('should return true when credit score is greater than or equal to 700', () => {
        input.creditScore = 700;
        const { result } = isEligibleByCreditScore(input);

        expect(result).to.eq(true);
    });
});

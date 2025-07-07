import { Loan } from '../dao/entities/Loan';
import { AppDataSource } from '../dao/db';
import { evaluateLoanEligibility } from './loanRulesService';

const loanRepository = AppDataSource.getRepository(Loan);

const getLoan = (id: string) => loanRepository.findOneBy({ id });

const saveLoan = async (loanDto: Loan) => {
    const { result, reason } = evaluateLoanEligibility(loanDto);

    const newLoan = new Loan();
    newLoan.eligible = result;
    newLoan.reason = reason;
    Object.assign(newLoan, loanDto);

    return loanRepository.save(newLoan);
};

export { getLoan, saveLoan };

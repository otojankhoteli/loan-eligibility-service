import { Loan } from '../dao/entities/Loan';
import { loanEventEmitter } from '../lib/loanEmitter';
import { getCrimes } from '../services/crimeService';
import { analyzeCrime } from '../agents/crimeGraderAgent';
import { AppDataSource } from '../dao/db';
import logger from '../logger';

const loanRepository = AppDataSource.getRepository(Loan);

loanEventEmitter.on('loanRequest', async (loan: Loan) => {
    logger.info(`Enriching loan request with crimeGrade: ${loan.id}`);
    const crimes = getCrimes();
    const crimeGrade = await analyzeCrime(crimes);

    if (crimeGrade) {
        loan.crimeGrade = crimeGrade;

        await loanRepository.save(loan);
    }
});

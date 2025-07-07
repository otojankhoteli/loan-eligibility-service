import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { createLoanSchema } from '../schemas/loanSchemas';
import { getLoan, saveLoan } from '../services/loanService';
import { Loan } from '../dao/entities/Loan';

const loanRouter = Router();

loanRouter.get(
    '/:id',
    asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const loan = await getLoan(id as string);

        res.json(loan);
    }),
);

loanRouter.post(
    '/',
    requestValidator({ body: createLoanSchema }),
    asyncWrapper(async (req, res, next) => {
        const newLoan = await saveLoan(req.body as Loan);

        res.status(201).json(newLoan);
    }),
);

export { loanRouter };

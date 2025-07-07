import * as z from 'zod/v4';

const createLoanSchema = z.object({
    applicantName: z.string(),
    creditScore: z.number(),
    monthlyIncome: z.number(),
    requestedAmount: z.number(),
    loanTermMonths: z.number(),
});

export { createLoanSchema };

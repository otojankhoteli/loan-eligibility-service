/* eslint-disable @typescript-eslint/no-floating-promises */
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import logger from '../logger';

const INSTRUCTIONS_PATH = path.join('/Users/otarjankhoteli/SWE/loan-eligibility-service/agentRules.md');

const { GEMINI_API_KEY } = process.env;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const buildDecisionMakerPrompt = (loanData: any, instructionsString: string) => `
You are Loan analyst. Analyze following loan data and either approve the loan or reject it with specific reason.
You will receive rules list that contains rule name, rule logic and rule rejection reason.
Evaluate each rule for the loan input and return true if 'ruleLogic' is satisfied. If it's not then return false
with the proper rejectionReason. Whenever you encounter "{}" symbol, treat it as placeholder for a command.
 
Loan data contains following fields:
    applicantName: $string
    propertyAddress: $string
    creditScore: $string
    monthlyIncome: $string
    requestedAmount: $string
    loanTermMonths: $string
 
Please format the response in the following format
Format: "{
    "ruleName": $string
    "decision": $boolean
    "rejectionReason": $string
}"

Instructions: ${instructionsString};

Loan data as json object: ${JSON.stringify(loanData)}
    `.trim();

export const calculateLoanEligibility = async (loanData: any) => {
    if (!GEMINI_API_KEY) return;

    const fileBuffer = fs.readFileSync(INSTRUCTIONS_PATH);
    const instructionsString = fileBuffer.toString();
    console.log(instructionsString);

    try {
        const prompt = buildDecisionMakerPrompt(loanData, instructionsString);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(responseText);
    } catch (err) {
        logger.error('Failed to calculate loan eligibility');
        logger.error(err);
    }
};

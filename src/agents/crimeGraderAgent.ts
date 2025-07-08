/* eslint-disable @typescript-eslint/no-floating-promises */
import { GoogleGenAI } from '@google/genai';
import logger from '../logger';

const { GEMINI_API_KEY } = process.env;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const buildCrimeAnalysisPrompt = (crimeData: any) => `
You are an AI crime analyst. Analyze the following crime data and assign a crime grade from 1 to 5, where:
1 = Very Low Risk (minor infractions, low impact)
2 = Low Risk (petty crimes, minimal public safety concern)
3 = Moderate Risk (property crimes, moderate public safety concern)
4 = High Risk (violent crimes, significant public safety concern)
5 = Very High Risk (severe violent crimes, major public safety threat)
 
Crime Data contains following fields:
- Type: $string
- Description: $string
- Status: $string
 
Consider factors such as:
- Type of crime (violent vs non-violent)
- Potential for harm to public safety
- Impact on community
- Likelihood of recurrence
 
Please respond with just the numerical grade (1-5).
Format: "crimeGrade: X"

You will receive JSON array as an input: ${JSON.stringify(crimeData)}
    `.trim();

export const analyzeCrime = async (crimes: any) => {
    if (!GEMINI_API_KEY) return;

    try {
        const prompt = buildCrimeAnalysisPrompt(crimes);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        logger.info(`Analyzed crime grade as string: $${responseText}`);
        return parseInt((responseText ?? '').split('crimeGrade: ')[1]!, 10);
    } catch (err) {
        logger.error('Failed to analyze crime');
        logger.error(err);
    }
};

import _ from 'lodash';
import { crimeData } from '../lib/crimes';
import logger from '../logger';

/*
    Simulates crime data fetching
*/
export const getCrimes = () => {
    // Max number of crimes will be 5
    const numberOfCrimes = _.random(1, 5);

    const crimeIndices = Array.from({ length: numberOfCrimes }, () => _.random(0, 49));
    const selectedCrimes = crimeIndices.map((index) => crimeData[index]);
    logger.info(`Selected crime indices: ${crimeIndices}`);
    return selectedCrimes;
};

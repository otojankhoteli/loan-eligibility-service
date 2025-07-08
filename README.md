# loan-eligibility-service

Small backend service that processes loan applications and determines whether an applicant is eligible for a loan based on defined business rules.

## Environment
API_KEY


## Instructions
To start a service locally
```
npm install
API_KEY={SOME-KEY} GEMINI_API_KEY={API_KEY_FOR_GEMINI} npm run start
```

### Using docker
```
docker build -t loan-api .
docker run -p 3000:3000 -e API_KEY="SOME-KEY" GEMINI_API_KEY="Replace-with-gemini-api-key" loan-api
```

## Running tests
```
npm run test
```

## Tech stack
- Express - Simple yet robust framework
- TypeORM - ORM for database abstraction
- sqlite - Simple storage, not suitable for production grade application. For prod possible candidate is Postgresql.
- Zod - For verifying user payload


Endpoints are protected with `API_KEY` that needs to be passed as env var.
All the users use the same api key.
This is a simple implementation that's not usable in prod environment.
For production grade app we should use JWT tokens.

Service implements loan eligibility engine. It's a simple rule based system that's easily extensible. Instead of having complicated logic in a single place where it becomes hard to add new rules, this approach offers split design. We now add a new logical rule in a `rules` folder and add the new rule in our rules list in `loanRulesService`. All the rules comply to the same interface accepting and returning data of the same shape.
```
    result: true | false,
    reason: 'Rejection reason'
``` 
Whenever loan eligibility needs to be calculated `loanRulesService` invokes all the rules and returns the final decision.

Loan service uses gemini LLM to analyze crime data in the given area.
I could not get access to actual crime api, so instead I have predefined crimes list with length 50.
Each request requested loan I select random crimes from the list (max number of crimes is 5);

Generated crimes list is then analyzed by google gemini which grades the severity of the crimes on the scale from 1 to 5;

Loan request is then updated with the analyzed `crimeGrade`;

All this happens asynchronously with the help of node event emitters, because agent can take significant amount of time to complete and we don't want to make users wait.

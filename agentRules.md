# isEligibleByCreditScore
- ruleLogic: creditScore >= 700
- rejectionReason: Credit score too low

# isEligibleByMonthlyIncome
- ruleLogic: monthlyIncome > (requestedAmount / loanTermMonths) * 1.5
- rejectionReason: Monthly income too low

# isBorrowerLegit
- ruleLogic: Is borrower able to take the loan based on the creditScore and requestedAmount
- rejectionReason: {Give your decision, reasoning behind decision and category of risk}

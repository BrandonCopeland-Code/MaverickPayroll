//Calculation for federal tax amount
function calculateFederalTax(grossSalary) {
    //Determines taxs brackets - this is for single filers. Would need to reference an updated database
    const federalTaxBracketsSingle2024 = [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11601, max: 47150 },
        { rate: 0.22, min: 47151, max: 100525 },
        { rate: 0.24, min: 100526, max: 191950 },
        { rate: 0.32, min: 191951, max: 243725 },
        { rate: 0.35, min: 243726, max: 609350 },
        { rate: 0.37, min: 609351, max: Infinity } // No upper limit
      ];

      let tax = 0;
      //Need to loop through all tax brackets applicable to gross salary
      for (i = 0; i < federalTaxBracketsSingle2024.length; i++) {
        bracket = federalTaxBracketsSingle2024[i];
        //Evaluates if salary is higher that max on the bracket, and if so adds max * rate to tax
        if (grossSalary > bracket.max) {
            tax += bracket.max * bracket.rate;
        // If salary is not higher than max, calculate amount you are over min and add to tax. Break.
        } else if (grossSalary > bracket.min) {
            tax += (grossSalary - bracket.min) * bracket.rate;
            break;
        }
      }
      //Annual federal tax value
      return tax;
}
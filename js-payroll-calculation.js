/*
Javascript for Maverick Payroll - Payroll Calculations
Created 3/13/2025
*/

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
      for (let i = 0; i < federalTaxBracketsSingle2024.length; i++) {
        let bracket = federalTaxBracketsSingle2024[i];
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

 //Assuming single filer, and no additional city taxes etc. No variability for states.
 function calculatePayroll() {
    //Define tax rates - would have to reference some sort of online source in future
    const socialSecurityTaxRate = 0.062;
    const medicareTaxRate = 0.0145;
    const stateTaxRate = 0.061; //assuming NYS for now - needs to have logic behind this for diff states

    //Pull gross salary and pay frequency from form
    const grossSalary = parseFloat(document.getElementById('grossSalary').value);
    const frequency = document.getElementById('payFrequency').value;

    //Calculate number of pay periods, pay per period, and annual federal tax using function
    const periods = frequency === 'biweekly' ? 26 : 12;
    let payPerPeriod = grossSalary / periods;
    let annualFederalTax = calculateFederalTax(grossSalary);

    //Calculate all taxes for each pay period
    let periodFederalTax = annualFederalTax / periods;
    let periodSocialSecurityTax = payPerPeriod * socialSecurityTaxRate;
    let periodMedicareTax = payPerPeriod * medicareTaxRate;
    let periodStateTax = payPerPeriod * stateTaxRate;

    //Calculate total tax and net pay
    let periodTotalTax = periodFederalTax + periodSocialSecurityTax + periodMedicareTax + periodStateTax;
    let periodNetPay = payPerPeriod - periodTotalTax;

    document.getElementById('results').innerHTML = `
    <h2 class="text-lg font-bold mb-2">Results:</h2>
    <p><strong>Gross Pay Per Period:</strong> $${payPerPeriod.toFixed(2)}</p>
    <p><strong>Federal Income Tax:</strong> $${periodFederalTax.toFixed(2)}</p>
    <p><strong>Social Security:</strong> $${periodSocialSecurityTax.toFixed(2)}</p>
    <p><strong>Medicare:</strong> $${periodMedicareTax.toFixed(2)}</p>
    <p><strong>NY State Income Tax:</strong> $${periodStateTax.toFixed(2)}</p>
    <p><strong>Total Deductions:</strong> $${periodTotalTax.toFixed(2)}</p>
    <p class="font-bold"><strong>Net Pay Per Period:</strong> $${periodNetPay.toFixed(2)}</p>
  `;
}
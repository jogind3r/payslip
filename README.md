Simple application to calculate the tax
Please find the postman collection in the repo (payslip.postman_collection.json)

Run Application : npm start
Run Tests: npm test

sampleInput = {
  paymentPeriod: "31 march",
  firstName: "Andrew",
  lastName: "Smith",
  annualSalary: "60050",
  superRate: "9"
};

sampleOutput = {
  name: "Andrew Smith",
  "pay-period": "31 march",
  "gross-income": "5004",
  "income-tax": "922",
  "net-income": "4082",
  "super-amount": "450"
};

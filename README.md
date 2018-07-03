# Payslip : Tax Calculator

Simple application to calculate the tax

# Instructions

## assumptions

-   User will provide the numeric and string values as required
    ( 400 error for bad request and 500 error for data exception will be thrown )

## git clone https://github.com/jogind3r/payslip

## to run the application

```sh
npm install
run tests: npm test
run app: npm start
```

### application route: /payslip method:POST

     - please check the postman collection to look into other request examples

## sample input and output

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

-   Please find the postman collection in the project directory to review different requests (payslip.postman_collection.json)

class IncomeTax {
    constructor(req, res) {
        try {
            let response = 0;
            let exit = 0;
            const error = () => {
                exit = 1;
            };
            if (req.body.paymentPeriod !== undefined && req.body.paymentPeriod.length > 0) {
                const period = req.body.paymentPeriod || error();
                const fname = req.body.firstName || error();
                const lname = req.body.lastName || error();
                const salary = req.body.annualSalary || error();
                const rate = req.body.superRate || error();
                const r = this.calculate(salary, rate) || error();
                if (salary < 0 || rate < 0 || (isNaN(salary) || isNaN(rate))) error();

                response = {
                    name: fname + ' ' + lname,
                    'pay-period': period,
                    'gross-income': r[0],
                    'income-tax': r[1],
                    'net-income': r[2],
                    'super-amount': r[3]
                };
                if (!exit) {
                    res.status(200).send(response);
                } else {
                    res.status(400).send(
                        'error processing the request, Please check the post values again'
                    );
                }
            } else {
                res.status(400).send('error processing the request');
            }
        } catch (e) {
            res.status(500).send('Server error occured');
        }
    }
    calculate(salary, superRate) {
        let tax = 0;
        let rate = 0.19;
        let minTax = 0;
        let taxIncome = 0;

        if (salary > 180000) {
            rate = 0.45;
            minTax = 54232;
            taxIncome = salary - 180000;
        } else if (salary > 87000) {
            rate = 0.37;
            minTax = 19822;
            taxIncome = salary - 87000;
        } else if (salary > 37000) {
            rate = 0.325;
            minTax = 3572;
            taxIncome = salary - 37000;
        } else if (salary > 18200) {
            rate = 0.325;
            minTax = 3572;
            taxIncome = salary - 18200;
        } else {
            rate = 0;
            minTax = 0;
            taxIncome = salary - 0;
        }

        tax = taxIncome * rate + minTax;
        tax = (tax / 12).toFixed(0);
        let grossIncome = (salary / 12).toFixed(0);
        let netIncome = (grossIncome - tax).toFixed(0);
        let superAmount = ((grossIncome * superRate) / 100).toFixed(0);
        return [grossIncome, tax, netIncome, superAmount];
    }
}

module.exports = IncomeTax;

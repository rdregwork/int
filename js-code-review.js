// GET: http://example.com/get-rows
// [
//     {
//         "title": "Foo",
//         "price": 123,
//         "currency": "RUB",
//     },
//     {
//         "title": "Foo",
//         "price": 5,
//         "currency": "USD",
//     },
// ]

// RowsReport.js
export class RowsReport {
    async get_report(dateFrom) {
        var rows = await fetch(`http://example.com/get-rows?dateFrom=${dateFrom}`).then(res => res.json())
        let report_sum = 0
        let reportText = '';

        const formatPrice = (price, currency) => {
            let formatted;

            if (currency == "RUB") {
                formatted =  price + ' ₽'
            }
            else if (currency == "USD") {
                formatted =  '$' + price
            }

            return formatted
        }

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            report_sum = row.currency == 'RUB' ? report_sum + row.price : report_sum + row.price * 34.13
            reportText = reportText + '\n' + row.title + ': ' + formatPrice(row.price, row.currency)
        }

        reportText = reportText + '\nСумма в рублях: ' + formatPrice(report_sum, "RUB")

        return reportText
    }
}

// index.js
import { RowsReport } from './RowsReport.js'

async function run() {
    var report = new RowsReport();

    console.log(await report.get_report('01.01.2020'))
}

run();

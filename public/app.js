const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const term = form.term.value

  const queryTerm = term.replaceAll(' ', '+').split()
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queryTerm, term }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        let average = []
        const { items } = data
        console.log(items)
        for (const iterator in items) {
          let size = items[iterator].length
          let sum = 0
          items[iterator].forEach((item) => {
            sum += parseInt(item.price)
          })
          let ave = sum / size
          let date = new Date(iterator)
          average.push({
            x: new Date(iterator),
            y: ave,
          })
        }
        const sortedAverage = average.sort((a, b) => b.x - a.x)

        var chart = new CanvasJS.Chart('chartContainer', {
          theme: 'dark1',
          title: {
            text: `Sales of ${data.term}`,
          },
          axisX: {
            valueFormatString: 'DD MMM YY',
            title: 'Month',
          },
          axisY: {
            title: 'USD',
            valueFormatString: '$#,###',
            titleFontSize: 24,
          },
          data: [
            {
              type: 'line',
              dataPoints: sortedAverage.slice(0, 40),
            },
          ],
        })
        chart.render()
      }
    })
})

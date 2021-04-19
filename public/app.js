const form = document.querySelector('form')
let searchItems = {
  lastWeek: [],
  lastMonth: [],
  last3Months: [],
}
let searchTerm = null
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const term = form.term.value
  searchItems = {
    lastWeek: [],
    lastMonth: [],
    last3Months: [],
  }
  const queryTerm = term.replaceAll(' ', '+').split()
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queryTerm, term }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        var today = new Date()
        let lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        )
        let lastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30
        )
        let last3Months = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 60
        )
        searchItems.term = data.term
        let src = false

        const { items } = data
        console.log(items)
        for (const iterator in items) {
          const img = document.querySelector('img')
          img.setAttribute('src', items[iterator][0].image)
          if (new Date(iterator) > lastWeek) {
            searchItems.lastWeek.push({
              x: new Date(iterator),
              y: parseInt(items[iterator][0].price),
              link: items[iterator][0].link,
              click: function (e) {
                if (e.dataPoint.link) {
                  window.open(e.dataPoint.link)
                } else {
                  alert('Link not available')
                }
              },
            })
          }
          if (new Date(iterator) > lastMonth) {
            searchItems.lastMonth.push({
              x: new Date(iterator),
              y: parseInt(items[iterator][0].price),
              link: items[iterator][0].link,
              click: function (e) {
                if (e.dataPoint.link) {
                  window.open(e.dataPoint.link)
                } else {
                  alert('Link not available')
                }
              },
            })
          }
          if (new Date(iterator) > last3Months) {
            searchItems.last3Months.push({
              x: new Date(iterator),
              y: parseInt(items[iterator][0].price),
              link: items[iterator][0].link,
              click: function (e) {
                if (e.dataPoint.link) {
                  window.open(e.dataPoint.link)
                } else {
                  alert('Link not available')
                }
              },
            })
          }
        }
        searchItems.lastWeek.sort((a, b) => b.x - a.x)
        searchItems.lastMonth.sort((a, b) => b.x - a.x)
        searchItems.last3Months.sort((a, b) => b.x - a.x)

        let results = null
        switch (form.time.value) {
          case 'lastWeek':
            results = searchItems.lastWeek
            break
          case 'lastMonth':
            results = searchItems.lastMonth
            break
          case 'last3Months':
            results = searchItems.last3Months
            break
        }

        var chart = new CanvasJS.Chart('chartContainer', {
          theme: 'dark1',
          title: {
            text: `Sales of ${searchItems.term}`,
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
              dataPoints: results,
            },
          ],
        })
        chart.render()
      }
    })
})
const select = document.querySelector('select')

select.addEventListener('change', (e) => {
  let results = null
  switch (select.value) {
    case 'lastWeek':
      results = searchItems.lastWeek
      break
    case 'lastMonth':
      results = searchItems.lastMonth
      break
    case 'last3Months':
      results = searchItems.last3Months
      break
  }
  if (results.length > 0) {
    var chart = new CanvasJS.Chart('chartContainer', {
      theme: 'dark1',
      title: {
        text: `Sales of ${searchItems.term}`,
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
          dataPoints: results,
        },
      ],
    })
    chart.render()
  }
})

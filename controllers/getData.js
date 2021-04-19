const fetch = require('node-fetch')

const sorts = {
  allCompleted: 'Completed+-+All+Most+Recent',
  recentlyAdded: '',
}

module.exports.getData = async (req, res) => {
  const query = req.body.queryTerm
  const term = req.body.term
  const response = await fetch(
    `https://cardsnoop.com/json/searchEbay.json-90.php?q=${query}&sort=Sold+-+Most+Recent`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua':
          '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          '_y=c9aa7a15-255F-43F2-3B7A-E6160FEE0D08; _shopify_y=c9aa7a15-255F-43F2-3B7A-E6160FEE0D08; PHPSESSID=2hacdq518qsnmql7kafd8qtco4; _s=ceb4507d-F32C-49EB-0D92-E0594986CB53; _shopify_s=ceb4507d-F32C-49EB-0D92-E0594986CB53; fbm_803159810214233=base_domain=.cardsnoop.com; fbsr_803159810214233=j8jm8NVOWTDiEw9jrFGiHPv9aEnSO9qZ4iNiaUQ4DdI.eyJ1c2VyX2lkIjoiMTE2NzgwNjc0MDMwODE4MCIsImNvZGUiOiJBUUJxeVRhWnFyUXVvNktkaG91aEkxQ25vbGFqakJ1OVNuSi15RFhZZlJGVk9WM1V6UjVZTVQ2bGV4Wkl0QjMtaVlwdmMyRDhJNWVfeTVySUV6SUxNMUpjdVNPSlhOdDhHMDBjZ1QxcGlxTTVtckRZSEp0V1E4eWVTZ1RpcU5XaGNOelByVkROQkM1WUgyd2huRkdJTS1INHpqa1hxMTdObkdidGx0aFNWUjVkVHk1WDNtZE1ySFdiUWJYY01xZnZzcWhBLWFneTAyRGpGN0ZiNkVZZ1lYeXltd05ldjcyc2JuNGJaaVFYMnN5YlVraGItVHlvUzRtMFpGdjhnaWpKQmF2SFlXS2ltTHJDWXFDcXctbjZoVWVrU0JjTHZjNy1UTk9rbzRUQVpuZ2ItdHkwT29iZXhXTFFLLWFOcWlRc0FPZlNmUGViTFpIaGwtQTY2UEhSVGtHc191aFFfaTB5dFJkU0MwMmVtVUZ0WnciLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYxODM3NTYyOH0; fbsr_803159810214233=j8jm8NVOWTDiEw9jrFGiHPv9aEnSO9qZ4iNiaUQ4DdI.eyJ1c2VyX2lkIjoiMTE2NzgwNjc0MDMwODE4MCIsImNvZGUiOiJBUUJxeVRhWnFyUXVvNktkaG91aEkxQ25vbGFqakJ1OVNuSi15RFhZZlJGVk9WM1V6UjVZTVQ2bGV4Wkl0QjMtaVlwdmMyRDhJNWVfeTVySUV6SUxNMUpjdVNPSlhOdDhHMDBjZ1QxcGlxTTVtckRZSEp0V1E4eWVTZ1RpcU5XaGNOelByVkROQkM1WUgyd2huRkdJTS1INHpqa1hxMTdObkdidGx0aFNWUjVkVHk1WDNtZE1ySFdiUWJYY01xZnZzcWhBLWFneTAyRGpGN0ZiNkVZZ1lYeXltd05ldjcyc2JuNGJaaVFYMnN5YlVraGItVHlvUzRtMFpGdjhnaWpKQmF2SFlXS2ltTHJDWXFDcXctbjZoVWVrU0JjTHZjNy1UTk9rbzRUQVpuZ2ItdHkwT29iZXhXTFFLLWFOcWlRc0FPZlNmUGViTFpIaGwtQTY2UEhSVGtHc191aFFfaTB5dFJkU0MwMmVtVUZ0WnciLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYxODM3NTYyOH0',
      },
      referrer: 'https://cardsnoop.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    }
  )
  const data = await response.json()
  let itemLinks = []
  let finalObj = { term, items: {} }
  data.items.forEach((item) => {
    const date = item.end
    if (itemLinks.includes(item.link)) {
      return
    }
    if (finalObj[date]) {
      finalObj.items[date].push(item)
    } else {
      finalObj.items[date] = [item]
    }
    itemLinks.push(item.link)
  })
  console.log(Object.keys(finalObj.items).length)
  console.log(itemLinks.length)
  res.send(finalObj)
}

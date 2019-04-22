const request = require('request')
const cheerio = require('cheerio') 
const moment = require('moment')

class hitParade
{
    constructor(){
       this.cookieJar = request.jar()
    }
    
    GetChartRow(cells){
        const position = cells[0].children[1].children[0].data
        const title =  cells[2].children[1].children[3].children[1].children[1].children[0].data
        const artist = cells[2].children[1].children[3].children[3].children[1].children[0].data
        return {position,title,artist}
    }

    async GetChartForDate(Date, count = null){
        let self = this
        return new Promise((resolve,reject)=>{
            let url = 'https://www.officialcharts.com/charts/singles-chart/' + Date + '/7501/'
            let chart = []
            request.get ({url:url,jar:this.cookieJar},function (err,response,body){
                if (err)
                {
                    reject(err)
                }
                try {
                    const $ = cheerio.load(body)
                    let chartLength  = $('table.chart-positions tbody tr:not([class])').length
                    let extractLength = count ? count: chartLength 
                    let index = 0
                    let nullCount =3
                    while (extractLength > 0 && nullCount >0 ) {
                        const res = $('table.chart-positions tbody tr:not([class])').eq(index)
                        const cells =  $(res).find('td')
                        try {
                            let entry =self.GetChartRow(cells)
                            chart.push(entry)
                            extractLength = extractLength -1
                        } catch (error) {
                            nullCount = nullCount - 1
                        }   
                        index = index +1
                    }   
                    resolve(chart)
                } catch (error) {
                    reject(' ERROR WHEN PROCESSING ' + error)
                }
            })
        })
    }
}

module.exports = hitParade
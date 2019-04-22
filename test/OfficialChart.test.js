const assert = require('chai').assert
const hitParade = require('../index')
describe('hitParade tests', function() {

    it('can instantiate hitParade', function() {
        const hp = new hitParade()
        assert.isObject(hp);
    })

    it('can get top 50 singles for a historic date', async function() {
        const hp = new hitParade()
        const res = await hp.GetChartForDate('19760919')
        assert.lengthOf(res,50)
        assert.equal(res[0].position,'1')
        assert.equal(res[0].title,'DANCING QUEEN')
        assert.equal(res[0].artist,'ABBA')
    }).timeout(0)

    it('can get top 10 singles for a historic date', async function() {
        const hp = new hitParade()
        const res = await hp.GetChartForDate('19760919',10)
        assert.lengthOf(res,10)
        assert.equal(res[0].position,'1')
        assert.equal(res[0].title,'DANCING QUEEN')
        assert.equal(res[0].artist,'ABBA')
        
        assert.equal(res[1].position,'2')
        assert.equal(res[1].title,'CAN\'T GET BY WITHOUT YOU')
        assert.equal(res[1].artist,'REAL THING')

        assert.equal(res[4].position,'5')
        assert.equal(res[4].title,'MISSISSIPPI')
        assert.equal(res[4].artist,'PUSSYCAT')

        assert.equal(res[9].position,'10')
        assert.equal(res[9].title,'(LIGHT OF EXPERIENCE) DOINA DE JALE')
        assert.equal(res[9].artist,'GEORGHE ZAMFIR')
    }).timeout(0)

    it('can get top 75 singles for a historic date that only has 50 returns 50', async function() {
        const hp = new hitParade()
        const res = await hp.GetChartForDate('19760919',75)
        console.log(res.length)
        assert.lengthOf(res,50)
        assert.equal(res[0].position,'1')
        assert.equal(res[0].title,'DANCING QUEEN')
        assert.equal(res[0].artist,'ABBA')
        
        assert.equal(res[1].position,'2')
        assert.equal(res[1].title,'CAN\'T GET BY WITHOUT YOU')
        assert.equal(res[1].artist,'REAL THING')

        assert.equal(res[4].position,'5')
        assert.equal(res[4].title,'MISSISSIPPI')
        assert.equal(res[4].artist,'PUSSYCAT')

        assert.equal(res[49].position,'50')
        assert.equal(res[49].title,'I\'LL MEET YOU AT MIDNIGHT')
        assert.equal(res[49].artist,'SMOKIE')
    }).timeout(0)


})
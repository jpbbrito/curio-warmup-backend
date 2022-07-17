require('dotenv').config()
const cron = require('node-cron')

const { deleteProblem, getProblemByUUID, saveProblem } = require('./src/services/curio-api')

async function main (apiKey, endpoint) {
  const date = new Date()
  const time = date.toISOString()

  const body = {
    description: `warmup: ${time}`,
    address: 'warmup',
    reporterUsername: 'warmup',
    longitude: '-12.1468335',
    latitude: '-38.3975976',
    category: 'warmup'
  }

  const responseSave = await saveProblem(body, apiKey, endpoint)

  if (responseSave === 'error_api') {
    console.error('[main] responseSave - error_api')
    return false
  }

  const responseDeleted = await deleteProblem(responseSave.uuid, apiKey, endpoint)
  if (responseDeleted === 'error_api') {
    console.error('[main] responseDeleted - error_api')
    return false
  }
  const responseGet = await getProblemByUUID(responseSave.uuid, apiKey, endpoint)
  if (responseGet === 'error_api') {
    console.error('[main] responseGet - error_api')
    return false
  }
  console.log('[main] responseGet ', responseGet)
  return false
}

cron.schedule('0 5,17 * * *', () => {
  console.log('running a task every minute')
  main(process.env.API_KEY, process.env.ENDPOINT)
})

const axios = require('axios')

module.exports = {
  async saveProblem ({
    description,
    address,
    reporterUsername,
    longitude,
    latitude,
    category
  },
  apiKey,
  endpoint
  ) {
    const data = JSON.stringify({
      description,
      address,
      reporterUsername,
      longitude,
      latitude,
      category
    })

    console.log('[saveProblem] data', data)

    const url = `${endpoint}/api/v1/problems`
    const config = {
      method: 'post',
      url,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      data
    }

    try {
      const response = await axios(config)
      console.log('[saveProblem] response -> ', response.data)
      return response.data
    } catch (errors) {
      console.error('[saveProblem] Erro ao salvar registro Errors->', errors)
      return 'error_api'
    }
  },
  async saveImageProblem ({ uuid, base64, description = ' ' }, apiKey, endpoint) {
    const data = JSON.stringify({
      base64,
      description
    })

    console.log('[saveProblem] data', data)

    const url = `${endpoint}/api/v1/problems/${uuid}/images`
    const config = {
      method: 'post',
      url,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      data
    }

    try {
      const response = await axios(config)
      console.log('[saveImageProblem] response -> ', response.data)
      return response.data
    } catch (errors) {
      console.error('[saveImageProblem] Erro ao salvar registro Errors->', errors)
      return 'error_api'
    }
  },
  async deleteProblem (uuid, apiKey, endpoint) {
    console.log('[deleteProblem] uuid', uuid)

    const url = `${endpoint}/api/v1/problems/${uuid}`
    const config = {
      method: 'delete',
      url,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios(config)
      console.log('[deleteProblem] response -> ', response.data)
      return response.data
    } catch (errors) {
      console.error('[deleteProblem] Erro ao salvar registro Errors->', errors)
      return 'error_api'
    }
  },
  async getProblemByUUID (uuid, apiKey, endpoint) {
    console.log('[getProblemByUUID] uuid', uuid)

    const url = `${endpoint}/api/v1/problems/${uuid}`
    const config = {
      method: 'get',
      url,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await axios(config)
      console.log('[getProblemByUUID] response -> ', response.data)
      return response.data
    } catch (errors) {
      console.error('[getProblemByUUID] Erro ao salvar registro Errors->', errors)
      return 'error_api'
    }
  }
}

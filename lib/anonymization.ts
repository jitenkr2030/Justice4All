import crypto from 'crypto'

export const anonymizeData = (data: any): any => {
  if (typeof data === 'string') {
    return crypto.createHash('sha256').update(data).digest('hex')
  }
  if (Array.isArray(data)) {
    return data.map(item => anonymizeData(item))
  }
  if (typeof data === 'object' && data !== null) {
    const anonymizedData: any = {}
    for (const key in data) {
      if (key === 'id' || key === 'email' || key === 'name') {
        anonymizedData[key] = crypto.createHash('sha256').update(data[key]).digest('hex')
      } else {
        anonymizedData[key] = anonymizeData(data[key])
      }
    }
    return anonymizedData
  }
  return data
}


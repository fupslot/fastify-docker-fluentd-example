const crypto = require('crypto')

module.exports.createContext = () => new Context()

class Context {
  constructor() {
    this.tokens = new Map()
  }

  createToken(tenant) {
    if (this.tokens.has(tenant)) {
      return this.tokens.get(tenant)
    }

    const token = Buffer.from(JSON.stringify({
      tenantId: tenant,
      token: crypto.createHash('sha256', "secret").update(tenant).digest('hex')
    })).toString('base64')

    this.tokens.set(tenant, token)
    return token
  }

  hasToken(tenant) {
    return this.tokens.has(tenant)
  }

  getToken(tenant) {
    return this.tokens.get(tenant)
  }
}
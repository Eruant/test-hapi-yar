const Hapi = require('hapi')
const yar = require('yar')

const server = new Hapi.Server()

server.connection({
  port: 3001
})

server.register({
  register: yar,
  options: {
    cookieOptions: {
      password: 'afjrg%fica###gsigv0scjedgkGYTTTv',
      isSecure: false
    },
    cache: {
      expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  }
})
  .then(() => {
    server.route({
      method: 'GET',
      path: '/',
      handler (request, reply) {
        const serverOne = request.yar.get('serverOne') || {visits: 0}
        const replyMessage = `Visit number: ${serverOne.visits}`

        request.yar.set('serverOne', {
          visits: serverOne.visits + 1
        })
        reply(`<!doctype html>
          <h1>Server 1</h1>
          <p>${replyMessage}</p>
          <a href='http://localhost:3002'>Go to server 2</a>
        `)
      }
    })

    server.start((error) => {
      if (error) {
        throw error
      }

      console.log(`Server started at ${server.info.uri}`)
    })
  })
  .catch(error => {
    console.log(error)
  })

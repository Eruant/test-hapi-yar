const Hapi = require('hapi')
const yar = require('yar')

const server = new Hapi.Server()

server.connection({
  port: 3002
})

server.register({
  register: yar,
  options: {
    cookieOptions: {
      password: 'sdgt6Fchl9f3jgdxz!!1s00yhhgDcaav',
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
        const serverTwo = request.yar.get('serverTwo') || {visits: 0}
        const replyMessage = `Visit number: ${serverTwo.visits}`

        request.yar.set('serverTwo', {
          visits: serverTwo.visits + 1
        })
        reply(`<!doctype html>
          <h1>Server 2</h1>
          <p>${replyMessage}</p>
          <a href='http://localhost:3001'>Go to server 1</a>
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

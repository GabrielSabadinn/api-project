const fastify = require('fastify')();
const mssql = require('mssql');
const start = async () => {
  try {
    await fastify.listen({ port: process.env.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
// conexão
mssql.connect(process.env.SQLServer)
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  });

// buscar os dados federais
fastify.get('/api/cnd/federal', (request, reply) => {
  mssql.query('EXEC [CND].[Buscar.Federal]')
    .then((results) => {
      reply.send(results.recordset);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados federais:', error);
      reply.status(500).send({ error: 'Erro ao buscar dados federais' });
    });
});

// buscar os dados estaduais
fastify.get('/api/cnd/estadual', (request, reply) => {
  mssql.query('EXEC [CND].[Buscar.Estadual]')
    .then((results) => {
      reply.send(results.recordset);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados estaduais:', error);
      reply.status(500).send({ error: 'Erro ao buscar dados estaduais' });
    });
});

// buscar os dados municipais
fastify.get('/api/cnd/municipal', (request, reply) => {
  mssql.query('EXEC [CND].[Buscar.Municipal]')
    .then((results) => {
      reply.send(results.recordset);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados municipais:', error);
      reply.status(500).send({ error: 'Erro ao buscar dados municipais' });
    });
});


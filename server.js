const fastify = require('fastify')();
const mssql = require('mssql');

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
fastify.get('/federal', (request, reply) => {
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
fastify.get('/estadual', (request, reply) => {
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
fastify.get('/municipal', (request, reply) => {
  mssql.query('EXEC [CND].[Buscar.Municipal]')
    .then((results) => {
      reply.send(results.recordset);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados municipais:', error);
      reply.status(500).send({ error: 'Erro ao buscar dados municipais' });
    });
});

fastify.listen(3001, (error, address) => {
  if (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});

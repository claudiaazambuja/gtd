// test-pg.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Conectado com sucesso!');
    return client.end();
  })
  .catch(e => {
    console.error('Erro na conexão:', e);
  });

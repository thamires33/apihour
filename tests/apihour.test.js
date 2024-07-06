const request = require('supertest');
const app = require('../index'); 

describe('POST /saudacao', () => {
  let server;

  beforeAll(done => {
    server = app.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('deve retornar Bom dia para 09:30', async () => {
    const res = await request(server)
      .post('/saudacao')
      .send({ horario: '09:30' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('saudacao', 'Bom dia');
  });

  it('deve retornar Boa tarde para 14:00', async () => {
    const res = await request(server)
      .post('/saudacao')
      .send({ horario: '14:00' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('saudacao', 'Boa tarde');
  });

  it('deve retornar Boa noite para 20:15', async () => {
    const res = await request(server)
      .post('/saudacao')
      .send({ horario: '20:15' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('saudacao', 'Boa noite');
  });

  it('deve retornar erro para horário não fornecido', async () => {
    const res = await request(server)
      .post('/saudacao')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Horário não fornecido.');
  });
});

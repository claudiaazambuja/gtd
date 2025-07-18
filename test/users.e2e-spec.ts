import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { faker } from '@faker-js/faker';

describe('Users Endpoints (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let userId: number;
  let server: any;

  const userData = {
    email: faker.internet.email(),
    username: faker.internet.username(),
    password: 'test123',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    server = app.getHttpServer();

    // Register user
    const registerRes = await request(server).post('/auth/register').send(userData);
    userId = registerRes.body.IdUser;

    // Login to get token
    const loginRes = await request(server).post('/auth/login').send({
      email: userData.email,
      password: userData.password,
    });
    jwtToken = loginRes.body.access_token;
  });

  it('/users (GET) - should return all users with valid JWT', async () => {
    const res = await request(server)
      .get('/users')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(u => u.IdUser === userId)).toBe(true);
  });

  it('/users/:id (DELETE) - should delete user with valid JWT', async () => {
    const res = await request(server)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.IdUser).toBe(userId);
  });

  afterAll(async () => {
    await app.close();
  });
});

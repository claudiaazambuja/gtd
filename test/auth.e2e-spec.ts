import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { faker } from '@faker-js/faker';

describe('Auth Endpoints (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const testEmail = faker.internet.email();
  const testPassword = 'test123';
  const testUsername = faker.internet.username();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should register a new user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      email: testEmail,
      password: testPassword,
      username: testUsername,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('Email');
    expect(res.body.Email).toBe(testEmail);
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      email: testEmail,
      password: testPassword,
      username: testUsername,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should login and return JWT', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
    jwtToken = res.body.access_token;
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: testEmail,
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should update password with valid token', async () => {
    const res = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ newPassword: 'novaSenha456' });

    expect(res.status).toBe(200);
    expect(res.body.Email).toBe(testEmail);

  });

  it('should reject password change with invalid token', async () => {
    const res = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', `Bearer invalidtoken`)
      .send({ newPassword: 'novaSenha456' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await app.close();
  });
});

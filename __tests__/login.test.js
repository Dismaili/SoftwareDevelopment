import request from 'supertest';
import app from '../server.js'; // Adjust path as needed

describe('User Flow Integration Tests', () => {
  let token;

  test('Login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'pass' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('Create a resource', async () => {
    const res = await request(app)
      .post('/resources')
      .send({ name: 'New Resource' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New Resource');
  });

  test('Update profile with new email', async () => {
    const res = await request(app)
      .put('/profile')
      .send({ email: 'newemail@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Profile updated');
  });
});

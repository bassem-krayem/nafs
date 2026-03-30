const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('GET /', () => {
  it('should return 200 and render Hello World', async () => {
    const res = await request(app).get('/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('Hello World'));
  });
});

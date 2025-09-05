const fetch = require('node-fetch');
require('dotenv').config();

const BASE_URL = 'http://localhost:3000';

async function testEndpoint(method, url, body = null, headers = {}) {
  try {
    const options = { method };
    if (body) {
      options.body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    options.headers = headers;

    const response = await fetch(`${BASE_URL}${url}`, options);
    const data = await response.json();
    console.log(`${method} ${url} - Status: ${response.status}`);
    if (response.ok) {
      console.log('Response:', data);
    } else {
      console.log('Error:', data);
    }
    return { response, data };
  } catch (error) {
    console.error(`Error testing ${method} ${url}:`, error.message);
    return null;
  }
}

async function runTests() {
  console.log('Starting backend API tests...\n');

  // Test public endpoints
  console.log('=== Public Endpoints ===');

  // GET /api/events
  await testEndpoint('GET', '/api/events');

  // Create a test event first (assuming admin is set up)
  // For now, assume there's an event with id 1

  // GET /api/events/:id
  await testEndpoint('GET', '/api/events/1');

  // POST /api/events/:id/register
  await testEndpoint('POST', '/api/events/1/register', { name: 'Test User', email: 'test@example.com', form_data: {} });

  console.log('\n=== Admin Endpoints ===');

  // First, register an admin (this might fail if superadmin not set)
  // POST /api/admin/auth/register
  await testEndpoint('POST', '/api/admin/auth/register', {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  });

  // POST /api/admin/auth/login
  const loginResult = await testEndpoint('POST', '/api/admin/auth/login', {
    email: 'admin@example.com',
    password: 'password123'
  });

  let token = null;
  if (loginResult && loginResult.response.ok) {
    token = loginResult.data.token;
  }

  if (token) {
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // POST /api/admin/events
    const createEventResult = await testEndpoint('POST', '/api/admin/events', {
      title: 'Test Event',
      description: 'This is a test event',
      starts_at: '2024-12-31T10:00:00Z',
      ends_at: '2024-12-31T18:00:00Z',
      location: 'Test Location'
    }, authHeaders);

    let eventId = 1; // Default
    if (createEventResult && createEventResult.response.ok) {
      eventId = createEventResult.data.id;
    }

    // PUT /api/admin/events/:id
    await testEndpoint('PUT', `/api/admin/events/${eventId}`, {
      title: 'Updated Test Event',
      description: 'Updated description',
      starts_at: '2024-12-31T10:00:00Z',
      ends_at: '2024-12-31T18:00:00Z',
      location: 'Updated Location',
      category: 'updated'
    }, authHeaders);

    // GET /api/admin/events/:id/registrations
    await testEndpoint('GET', `/api/admin/events/${eventId}/registrations`, null, authHeaders);

    // GET /api/admin/events/:id/export (this will download file, so just test the endpoint)
    console.log('Testing export endpoint...');
    const exportResponse = await fetch(`${BASE_URL}/api/admin/events/${eventId}/export`, {
      headers: authHeaders
    });
    console.log(`GET /api/admin/events/${eventId}/export - Status: ${exportResponse.status}`);

    // DELETE /api/admin/events/:id
    await testEndpoint('DELETE', `/api/admin/events/${eventId}`, null, authHeaders);
  } else {
    console.log('Skipping admin tests due to login failure');
  }

  console.log('\nTests completed.');
}

runTests();

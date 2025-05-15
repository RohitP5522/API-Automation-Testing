describe('Create User with Reqres API Key', () => {
  it('should successfully create a user', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Cypress.env('reqresApiKey')  // 👈 using the stored API key
      },
      body: {
        name: 'morpheus',
        job: 'leader'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'leader');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    });
  });
});

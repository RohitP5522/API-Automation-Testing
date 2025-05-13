describe('PUT Update User', () => {
    it('should update user with new data', () => {
      cy.reqresRequest({
        method: 'PUT',
        url: '/api/users/2',
        body: {
          name: 'morpheus',
          job: 'zion leader'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('updatedAt');
      });
    });
  });
  
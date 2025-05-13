describe('GET Single User', () => {
    it('should fetch user with id 2', () => {
      cy.reqresRequest({
        method: 'GET',
        url: '/api/users/2'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
      });
    });
  });
  
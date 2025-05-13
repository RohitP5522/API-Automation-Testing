describe('DELETE User', () => {
    it('should delete user with id 2', () => {
      cy.reqresRequest({
        method: 'DELETE',
        url: '/api/users/2'
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
  
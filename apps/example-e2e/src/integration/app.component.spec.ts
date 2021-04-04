describe('example', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));

  it('should render the component', () => {
    cy.get('zy2ba-components-root').should('exist');
  });
});

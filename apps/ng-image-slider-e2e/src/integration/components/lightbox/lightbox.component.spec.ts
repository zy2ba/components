describe('ng-image-slider', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lightboxcomponent--primary&knob-images&knob-videoAutoPlay=false&knob-direction=ltr&knob-paginationShow=false&knob-infinite=false&knob-arrowKeyMove=true&knob-showVideoControls=true&knob-imageIndex&knob-show&knob-animationSpeed'));

  it('should render the component', () => {
    cy.get('ng-image-slider-lightbox').should('exist');
  });
});

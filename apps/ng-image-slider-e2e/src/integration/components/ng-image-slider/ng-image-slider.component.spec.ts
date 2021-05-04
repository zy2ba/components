describe('ng-image-slider', () => {
  beforeEach(() => cy.visit('/iframe.html?id=ngimageslidercomponent--primary&knob-imageSize&knob-infinite=false&knob-imagePopup=true&knob-direction&knob-animationSpeed&knob-images&knob-slideImage&knob-autoSlide&knob-showArrow&knob-videoAutoPlay=false&knob-paginationShow=false&knob-arrowKeyMove=true&knob-manageImageRatio=false&knob-showVideoControls=true'));

  it('should render the component', () => {
    cy.get('ng-image-slider').should('exist');
  });
});

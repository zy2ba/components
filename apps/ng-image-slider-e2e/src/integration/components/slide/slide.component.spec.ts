describe('ng-image-slider', () => {
  beforeEach(() => cy.visit('/iframe.html?id=slidecomponent--primary&knob-showVideo=false&knob-videoAutoPlay=false&knob-showVideoControls=1&knob-currentImageIndex=0&knob-imageIndex&knob-speed=1&knob-imageUrl&knob-isVideo=false&knob-alt=&knob-title=&knob-direction=ltr&knob-ratio=false&knob-loading'));

  it('should render the component', () => {
    cy.get('ng-image-slider-slide').should('exist');
  });
});

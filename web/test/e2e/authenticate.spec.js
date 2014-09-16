'use strict';

describe('Views needed authenticate', function () {
  it('should redirect to login when not authenticated', function() {
    browser.get('#/dashboard');
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/login');
  });
});

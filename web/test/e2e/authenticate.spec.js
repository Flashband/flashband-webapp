'use strict';

describe('Views needed authenticate', function () {
  it('should redirect to login when not authenticated', function() {
    browser.get('#/dashboard');

    expect(browser.getCurrentUrl()).toContain('#/login');
  });
});

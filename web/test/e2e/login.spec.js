'use strict';

describe('The login view', function () {
  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should visible fields email field, password field and submit button', function() {
    var emailField = element(by.model('credencials.email'));
    var emailPassw = element(by.model('credencials.password'));

    expect(emailField.getAttribute('value')).toEqual('');
    expect(emailPassw.getAttribute('value')).toEqual('');
  });
});

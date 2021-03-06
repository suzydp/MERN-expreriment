// for adding login rules
// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';


  //// validation for required fields
  // if character in handle is under 2 or over 40
  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters.'
  }

  // if handle was empty
  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required.'
  }

  // if status was empty
  if(Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required.'
  }

  // if status was empty
  if(Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required.'
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
      errors.youtube = 'Not a valid URL';
    }
  }
  
  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
      errors.twitter = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
      errors.facebook = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)){
      errors.linkedin = 'Not a valid URL';
    }
  }

  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.website)){
      errors.website = 'Not a valid URL';
    }
  }

  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};
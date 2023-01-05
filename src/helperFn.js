
export const validators = {
  required: (value) => value ? undefined : 'Required',
  checkLength: (value, min = 3, max = 10) => value.length >= min && value.length <= max ? undefined : `Length should be in between ${min} and ${max}`,
  regexPattern: value => value && !/^[A-Za-z\s.-]+$/i.test(value) ? 'Numbers & Special Chars not allowed' : undefined,
  phoneValidator: (value, max = 10) => (!!value && (value.split('')).filter(char => !isNaN(parseInt(char))).length > max) ? `Must be ${max} characters` : undefined,
  isNumber: value => value && isNaN(Number(value)) ? 'Only number allowed' : undefined,
  noNumber: value => value && /[0-9]/i.test(value) ? 'Numbers not allowed' : undefined
 }
  
 export const validateFormData = (formValidations, values) => {
  let errors = []
  !!formValidations && formValidations.map((data) => {
    let field = data.field
    let value = values[field]
    data.validator.map((validate) => {
      // TODO: Can be improved
       if(validate["required"] !== undefined && validate["required"] && validators.required(value) !== undefined){
         errors.push({field, error: validators.required(value)})
         return true;
       }

       if(validate["checkLength"] !== undefined && validate["checkLength"]){
        const min = validate["min"] ? validate["min"] : 3;
        const max = validate["max"] ? validate["max"] : 10;
        if(validators.checkLength(value, min, max) !== undefined){
          errors.push({field, error: validators.checkLength(value, min, max)})
          return true;
        }
       }

       if(validate["isNumber"] !== undefined && validate["isNumber"] && validators.isNumber(value) !== undefined){
        errors.push({field, error: validators.isNumber(value)})
        return true;
       }

       if(validate["isNumber"] !== undefined && !validate["isNumber"] && validators.noNumber(value) !== undefined){
        errors.push({field, error: validators.noNumber(value)})
        return true;
       }

       return true
    })
    return true
  })
  return errors
}
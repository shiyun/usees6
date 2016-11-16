const success = (result) => {
  return {status: {code: 1, desp: ""}, result: result}
}

const fail = (desp, result, code) => {
  code = code || 0;
  return {status: {code: code, desp: desp}, result: result} 
}

module.exports = {
  success,
  fail
}
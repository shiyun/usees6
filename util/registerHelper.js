const fs = require('fs');

const norender = (path, cb) => {
  fs.exists(path, (exists)=>{
    if(exists){
      fs.readFile(path, 'utf-8', (data)=>{
        cb(data);
      })
    }else{
      console.log('no such file');
    }
  });
}

const isEqual = (a, b, options) => {
  return a === b ? options.fn(this) : options.inverse(this);
}

module.exports = {
  isEqual,
  norender
}
'use strict';


const fs = require('fs');
const { SSMClient, PutParameterCommand, DeleteParameterCommand } = require('@aws-sdk/client-ssm');
const client = new SSMClient({ region: 'region' });

const parse2Object = async (path) => {
      return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                  if (err) {
                        reject(err);
                        return;
                      } 
      let json = JSON.parse(data.trim());
                  resolve(json);
                });
          });
}; 
const isObject = (value) => {  
  return Object.prototype.toString.call(value) === '[object Object]';
}; 
const isArray = (value) => {
      return Array.isArray(value);
}; 

const parse2Dic = async (obj, path, tags) => {
      let keys = Object.keys(obj)
      for (const key of keys) {
            let value = obj[key];
            if (isObject(value)) {
                  parse2Dic(value,  (path ? path + '/' : '/') + key);
                } 
    else {
          let psName = path + '/' + key;
          let psValue = value;       if (!psValue) {
                psValue = 'your value';
              }       let isArr = isArray(psValue);       if (isArray) {
                    psValue = JSON.stringify(psValue);
                  }
          try {
                let execCmd = `aws ssm put-parameter --name '${psName}' --value '${psValue}' --type 'String'`;         fs.appendFile('./src/powershell/put-parameters.ps1', execCmd + '\n','utf8', (err) => {
                      if (err) {
                            console.log(err);
                          } else {
                                console.log(psName, isArr ? '[Array] ' + psValue : psValue);
                              }
                    });
              }
          catch(err) {
                console.log(err);
              }       //      await client.send(new DeleteParameterCommand({ Name: psName }));     }
      };
    }
};
const main = async (args) => {
      try {
            let rootPath = args.rootPath;
            let obj = await parse2Object('./src/data/appsettings.json'); 
    await parse2Dic(obj, rootPath);
          }
      catch(err) {
            console.log('Error', err);
          }
};


main({rootPath: 'your_root_path'});



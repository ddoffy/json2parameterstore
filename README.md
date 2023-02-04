# json2parameterstore
a tool to convert json settings to aws parameter store. using NodeJs/AWS SDK/Powershell


# get started
- clone source code
- after cloning source code, jump into folder that contains source code
`
npm install
`
- find ***index.js*** to update your root path in aws parameter store than save it
- copy json settings to ***src\data*** and change the name to ***appsettings.json***
- run sourcde code by the below cmd
* notes: remember update aws credentials files ***.aws/credentials***
`
npm start
`
- you got powershell commmand for all json settings into folder ***src/powershell*** named __*put-parameters.ps1*__
- using powershell to run put-parameters.ps1

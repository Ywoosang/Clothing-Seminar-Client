const express = require('express')
const serveStatic = require('serve-static')

const path = require('path')

const app = express()
app.use('/', serveStatic(path.join(__dirname,'../dist')))

app.get('/',(req,res)=>{
    res.send(express.static(path.join(__dirname,'../dist/index.html')));
})
app.listen(8080,()=>{
    console.log('server start');
})
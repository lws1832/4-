const express = require('express');
const main = require('./routes');
const board = require('./routes/board');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const app = express();
//경로 폴더만 설정해도 그 안에서 insex파일을 찾는다
//단 index.js-> 파일만 해당됨 index2.js->안됨
//require 패키지를 가져온다
//main도 특정 객체가 담겨져있다라고 생각?
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})
app.use(bodyparser.urlencoded({extended:false}));
app.use('/',main);
app.use('/board',board)
//특정 uri일때 파일을 불러와서 사용하겟다
//main으로 지정한 파일->./routes/index


app.listen(3000,()=>{
    console.log(`터미널`)
})
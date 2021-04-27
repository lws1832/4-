const express = require('express');
const router = express.Router();
//app == router라고 우선생각
//router도 따지고보면 미들웨어

router.get('/',(req,res)=>{
    res.render('index.html',{
        title:'homepage'
    });
})
//0427.js에도 app.get이 존재하는데 hello world가 찍혔다.
//main보다 위에 app.get 위치하면 <- 실행된다.

//router존재할때는?
/*
포트부분을 쓸 수가 없어서 아래와 같이 작성했다.
현재 이 파일은 0427.js에서 main으로 파일설정 해놨고
app.listen은 사용할 수 없어서 이유는 0427.js에서 이미 사용중이다.
0427.js에서 사용하는걸 여기서도 적용 시켤려고 사용햇다?
*/
module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
router.use(express.static('public'));

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'hom',
})
connection.connect();


//url->localhost:3000/board/list
//나는->localhost:3000/list 경로가 잘못됬엇다.
router.get('/list',(req,res)=>{
    connection.query("select idx,subject,woo_name,content,hit,date_format(today,'%Y-%m-%d') as today from woo order by idx desc",(error,results)=>{
        if(error){
            console.log(error)
        }else{
            let total_record = results.length;
            results.forEach(ele=>{
                ele.number = total_record;
                total_record--;
            })
    
            res.render('./board/list.html',{
                list:results,
            })
        }
    })
})


router.get('/write',(req,res)=>{
    res.render('./board/write.html');
})

router.post('/write',(req,res)=>{
    console.log(req.body)
    let subject = req.body.subject;
    let woo_name=req.body.woo_name;
    let content=req.body.content;
    let sql=`insert into woo (subject,woo_name,content,hit) values
     ('${subject}','${woo_name}','${content}',0)`
     console.log(req.body);
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }else {
            console.log(results);
            res.redirect('./list');  
        }
    })
  
})

router.get('/view',(req,res)=>{
    let idx = req.query.idx;
    console.log(req.query);
    
    connection.query(`select * from woo where idx='${idx}'`,(error,results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results)
            res.render('./board/view.html',{
                view:results[0],
            });
        }
    })

    connection.query(`update woo set hit=hit+1 where idx='${idx}'`);
    
})
router.post('/view',(req,res)=>{
    let idx = req.body.idx;
    connection.query(`delete from woo where idx=${idx}`,(error,results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results)
            res.redirect('./list')
        }
    })
})

router.get('/update',(req,res)=>{//수정하기 페이지

    let idx=req.query.idx;

    connection.query(`select * from woo where idx=${idx}`,(error,results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results)
            res.render('./board/update.html',{
                modify:results[0],
            })
        }
    })
    res.render('./board/update.html');
})
router.post('/update',(req,res)=>{
   let idx = req.body.idx;
   console.log(req.body);
   let subject = req.body.subject;
   let woo_name = req.body.woo_name;
   let content = req.body.content;
   let sql = `update woo set subject='${subject}',woo_name='${woo_name}',content='${content}',
   today=now() where idx='${idx}'`;
   
   connection.query(sql,(error,results)=>{
       if(error){
           console.log(error)
       }else{
           console.log(results)
          
       }
   })
   res.redirect('/board/list')
})
module.exports = router;
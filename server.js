let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: false}))//对body的内容进行解码
app.use(bodyParser.json())//转成json格式


//返回验证码
app.post('/code',(req,res) => {
	let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/i;
	if(regPhone.test(req.body.userName)){
		res.send({
			code: getCode(),
			msg: '验证已发送'
		})
	}else{
		res.send({
			code: 1,
			msg: '手机号不正确'
		})
	}
})

//登陆
app.post('/login1',(req,res) => {
	console.log(req.body);
	let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/i;
	let user = req.body.user;
	let reg = regPhone.test(user);
    if(user == ''){
        res.send({
            code:1,
            msg:'手机号码不能为空'
        });
    }else if(reg && user){
        res.send({
            code:0,
            msg:'登录成功',
            userId:'10010'
        });
    }else{
        res.send({
            code:2,
            msg:'手机号错误'
        });
    }
    res.send('uuu');
})

//生成验证码
function getCode(){
	let a = '';
	for(let i = 0;i < 4;){
		let num = Math.floor(Math.random() * 75 + 48);
		if(num >= 48 && num <= 57 || num >= 65 && num <= 90 || num >= 97 && num <= 122){
			a += String.fromCharCode(num);
			i++;
		}
	}
	return a;
}



app.listen(8004, () => {
	console.log('服务器启动成功');
})

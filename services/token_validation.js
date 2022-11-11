const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) =>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token,process.env.PASS,(err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "invalid token"
                    });
                }else{
                    /*return res.status(200).json({
                        data: results
                    });*/
                    next();
                }
            })
        }else{
            res.json({
                success: 0,
                message:"access denied unauthorized user"
            });
        }
    }
}
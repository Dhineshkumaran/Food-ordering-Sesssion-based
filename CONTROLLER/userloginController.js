exports.userlogin = async (req, res)=>{
    const path = require('path');
    try {
        const fp = path.resolve('HTML','UserLogin.html');
        res.setHeader('Content-Type','text/html');
        res.status(200).sendFile(fp);
    } catch (error) {
        console.log('Error:',error);
        res.status(500).send('Internal Server Error');
    }
};

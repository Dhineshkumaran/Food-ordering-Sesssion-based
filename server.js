const app = require('./APP/Express');
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server has started');
});
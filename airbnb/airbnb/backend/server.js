const app = require('./app');
const { port } = require('./config/appConfig');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
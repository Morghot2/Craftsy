import { app } from './app';

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Craftsy working on port ${port}`);
});

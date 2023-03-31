const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const placesRouter = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const orderRoutes = require('./routes/order-routes');
const productRoutes = require('./routes/product-routes');
const userOrdersRoutes = require('./routes/userOrders-routes');
const finalOrderRoutes = require('./routes/finaOrder-routes');
const app = express();
const cors = require('cors');

const AppPort = process.env.PORT || 5000;
const HttpError = require('./models/http-error');

const fileUpload = require('express-fileupload');
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Headers'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,PUT');

  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/uploads', express.static('uploads'));

app.use('/api/places', placesRouter); //=> /api/places/...
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/useroders', userOrdersRoutes);
app.use('/api/finalorder', finalOrderRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    // if there is almost error sent, then no need to send other error,if no then send  res.status(error.code || 500);

    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error accurred !' });
});

mongoose
  .connect(
    'mongodb+srv://holylandapplicat:rffU4JncyyT826Ud@cluster0.qwkwzgk.mongodb.net/?retryWrites=true&w=majority',

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )

  .then(() => {
    console.log('server is listening now');
    app.listen(AppPort);
  })
  .catch((err) => {
    console.log(err);
  });

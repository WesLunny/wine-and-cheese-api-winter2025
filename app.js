import express from 'express';
import bodyParser from 'body-parser';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import mongoose from 'mongoose';

//controllers
import cheesesController from './controllers/cheeses.js';

//create server start
const app = express();

//configure bodyParser
app.use(bodyParser.json());

//swagger config
const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cheese API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/*.js'] // where to find api methods (controllers)
};

const openapiSpecification = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//mongoose setup db connection

mongoose.connect(process.env.DB,{})
.then((res)=>console.log('connected to db'))
.catch((err) => console.log("Connection failed: ${err}"));

//url dispatching
app.use('/api/v1/cheeses',cheesesController);

//start web server
app.listen(3000, ()=> {
    console.log('Express API running on port 3000')
});
require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const{tokenCleaning}=require('../src/utils/scheduledCleaning')

const dbConnection=require('./db')
const userRouter=require('./routes/user routes/userRouter')
const adminRouter=require('./routes/admin routes/adminRouter')
const stockRouter=require('./routes/workerRoutes/stockRouter')
const shopingCart=require('./routes/user routes/shopingCartRouter')
const services=require('./routes/user routes/servicesRouter')
const auditLog=require('./controllers/auditLogController')
const history=require('./routes/user routes/historyRouter')
const deliveries=require('./routes/workerRoutes/deliveriesRouter')
const port=process.env.PORT
const app=express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();
app.listen(port,()=>{
    console.log(`el servidor esta escuchando en el puerto 3000`)
})
tokenCleaning();

app.use(auditLog.auditLogger)
app.use(userRouter)
app.use(stockRouter)
app.use(shopingCart)
app.use(services)
app.use(adminRouter)
app.use(history)
app.use(deliveries)
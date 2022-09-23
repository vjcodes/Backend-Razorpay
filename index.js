const express = require('express')
const Razorpay = require('razorpay')

const app = express();
app.use(express.static("./public"));
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send(index)
// })

app.post("/order",async (req,res) => {
    const amount = req.body.amount

    var instance = new Razorpay({
         key_id: 'rzp_test_MAPHSQXwkLtcUs',
         key_secret: 'BUg7ZNr9tYavVlutn3GXHCLz' 
         // this needs to go in .env file
    })

    var options ={
        amount: amount *100, 
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }

    // instance.orders.create(options, function (err, order) {
    //     console.log(order);
    // })

    const myOrder = await instance.orders.create(options)

    res.status(201).json({
        success: true,
        amount,
        order: myOrder
    })
})

app.listen(4000, () => console.log(`Server is running at PORT 4000`))
require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const port = process.env.port||4000;
// const fetc_data1 =require("./Functions/Route_fun")
const serect_key = "rahul";
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { setUser } = require("./Functions/Auth");
const cors = require("cors");
const { default: fetc_data } = require("./Functions/Route_fun");
// app.use(cors());


app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client app origin
    credentials: true,
  })
);
// app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// mongoose.connect("mongodb://localhost:27017/admin");
// mongoose.connect("mongodb://localhost:27017/admin");



//connection of mongo atlas cluster
mongoose.connect(`mongodb+srv://rahulmunnalal1:${process.env.MONGOOSSE_KEY}@cluster0.e5685.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
 
}).then(()=>console.log("Successfully"))
const stockSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  expire: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const billSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  expire: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const singup = new mongoose.Schema({
  Name: {
    type: String,
  },
  role: {
    type: String,
  },

  Email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  empJoiningDate:{
    type:Date
  },
  empAddress:{
    type:String
  },
  empQualification:{
    type:String
  }

});

const medical_mr = new mongoose.Schema({
  medicineName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Object,
  },
});

const user_customerSchema = new mongoose.Schema({
  Mr: {
    type: String,
  },
  custNum: {
    type: Number,
  },

  medicalName: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  address: {
    type: String,
  },
  products: [medical_mr],
});

const user_customer_order_outSchema = new mongoose.Schema({
  Mr: {
    type: String,
  },
  custNum: {
    type: Number,
  },

  medicalName: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  address: {
    type: String,
  },
  products: [medical_mr],
});

//Orderded Print Collection Schema
const orderded_print_Schema = new mongoose.Schema({
  Mr: {
    type: String,
  },
  custNum: {
    type: Number,
  },

  medicalName: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  address: {
    type: String,
  },
  products: [medical_mr],
});

//mr_Schema for login
const mr_login_schema = new mongoose.Schema({
  Email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const expireSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  expire: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
const orderded_printed = new mongoose.model(
  "orderded_print",
  orderded_print_Schema
);
const mr_order_out = new mongoose.model(
  "mr_order_out",
  user_customer_order_outSchema
);
const expire_stock = new mongoose.model("expire_stock", expireSchema);
const mr_login = new mongoose.model("mrLogins", mr_login_schema);
const mr = new mongoose.model("Mr", user_customerSchema);
const user = new mongoose.model("admins", stockSchema);
const bills = new mongoose.model("forms", billSchema);
const sing = new mongoose.model("logins", singup);

app.get("/", async (req, res) => {
  try {
    let result = await user.find({});
    res.send(result);
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
app.get("/name/:key", async (req, res) => {
  try {
    console.log(req.params.key);
    let result = await user.find({
      $or: [{ Name: { $regex: req.params.key } }],
    });

    console.log(result);

    var date_time = new Date();

    const filteredData = result.filter((item) => {
      const expiryDate = new Date(item.expire);
      return expiryDate > date_time;
    });

    let rt = filteredData.length;
    console.log(rt);
    if (filteredData.length == 0) {
      console.log("their is no medicine is expire now");
      res.send("their is no medicine is expire now");
    } else {
      res.send(filteredData);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

app.get("/expire/:key", async (req, res) => {
  try {
    let result = await user.find({
      $or: [{ expire: { $gte: req.params.key } }],
    });
    res.send(result);
    res.send(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.send("enter only date");
  }
});

app.get("/med-name/:key", async (req, res) => {
  try {
    let result = await user.findOne({
      $or: [{ Name: { $regex: req.params.key } }],
    });
    console.log(result._id);
    if (result) {
      // Add the item to the bill list
      // await billCollection.push(result);
      await bills.insertMany(result);
      // Remove the item from the database
      await user.deleteOne({ _id: result._id });
    }

    // console.log(result.Name)
    res.send("Medicine Added successfully...");
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

// app.get('/data/:year/:month', async (req, res) => {
//   const { year, month } = req.params;
//   const startDate = new Date( year,month - 1, 1);

//   try {
//       const data = await user.find({
//           expire: {
//               $gte: startDate,

//           }
//       });
//       res.json(data);
//   } catch (err) {
//       console.error('Error fetching data:', err);
//       res.status(500).send('Server error');
//   }
// });

app.get("/data", async (req, res) => {
  const { year, month } = req.query;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  console.log(req.query);
  try {
    const data = await user.find({
      expire: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});

//Medicine add post route for stock module in client side
app.post("/add_med_stock", async (req, res) => {
  try {
    let result = req.body;
    // res.send(result)
    await user.insertMany(req.body);
    console.log(result);
    return res.json("added successfully");
  } catch (error) {
    console.error("Fetch error:", error);
    res.send("error in uploading details");
  }
});

app.post("/singup", async (req, res) => {
  let result = req.body;
 
  const {empName,empRole,empId,empPassword,empJoiningDate,empAddress,empQualification}=req.body
  console.log(empName)

  let Name=empName
  let Email = empId;
  let role = empRole;
  let haspass = empPassword;
  const password = await bcrypt.hash(haspass, 10);
   await sing.insertMany({ Email, password, role,Name,empAddress,empJoiningDate,empQualification });

 
  res.json({Status:"Success"});
});

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   const { Email, password } = req.body;
//   const user = await sing.findOne({ Email });
//   console.log(user);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json("success");
//   } else {
//     res.json("fail");
//   }
// });

//mr post

app.post("/mr", async (req, res) => {
  const { Mr, medicalName, custNum, orderDate, address, products } = req.body;
  console.log();

  const user = new mr({
    Mr,
    medicalName,
    custNum,
    orderDate,
    address,
    products,
  });
  console.log(user);
  await user.save();
  res.json("Order is Submited Successfully!");
});

// post route for orderData out
app.post("/mr_order_out", async (req, res) => {
  const { Mr, medicalName, custNum, orderDate, address, products } = req.body;
  console.log();

  const user = new mr_order_out({
    Mr,
    medicalName,
    custNum,
    orderDate,
    address,
    products,
  });
  console.log(user);
  await user.save();
  res.send("its work");
});

//get route for mr

app.get("/mr_pr", async (req, res) => {
  const { Mr_id, year, month } = req.query;

  console.log(Mr_id);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const data = await mr.find({
      orderDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    let Name = Mr_id;

    const filteredUsers = data.filter((user) => user.Mr === Name);
    // console.log(filteredUsers)
    // if (filteredUsers.length>0) {
    //   res.json(filteredUsers)
    // }else{
    //   res.json("No record find")
    // }

    res.json(filteredUsers);
  } catch (err) {
    // console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});

app.post("/sign1", async (req, res) => {
  let result = req.body;
  let Email = await result.Email;
  let role = await result.role;
  let haspass = await result.password;
  const password = await bcrypt.hash(haspass, 10);
  let hm = await sing.insertMany({ Email, password, role });

  res.send(hm);
});

// app.post("/log", async (req, res) => {
//   let result = req.body;
//   let Email = await result.Email;
//   let password = await result.password;

//   let tm = await sing.findOne({ Email });
//   const isPasswordValid = await bcrypt.compare(password, tm.password);
//   if (!isPasswordValid) {
//     return res.status(401).send("Invalid password");
//   }
//   console.log({ Email: user.Email });
//   const token = jwt.sign({ Email: result.Email }, serect_key, {
//     expiresIn: "1h",
//   });
//   res.cookie("token", token, { httpOnly: true }).send("Logged in");
//   // res.send(token)
//   console.log(token);
// });

// app.post("/test", async (req, res) => {
//   let result = req.body;
//   let Email = await result.Email;
//   let password = await result.password;

//   let tm = await sing.findOne({ Email });
//   const isPasswordValid = await bcrypt.compare(password, tm.password);
//   if (!isPasswordValid) {
//     return res.status(401).send("Invalid password");
//   }

//   const name = jwt.sign({ Email: result.Email }, "rahul", { expiresIn: "1d" });
//   let hm = res.cookie("token", name, { httpOnly: true });
//   // console.log(hm)
//   return res.json({ Status: "Success" });
// });

app.post("/login", async (req, res) => {
  const { Email, password } = req.body;
  let result = req.body;
 let name
  let tm = await sing.findOne({ Email });
  if (tm) {
    const isPasswordValid = await bcrypt.compare(password, tm.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }
  name = jwt.sign({ Email: tm.Email, role: tm.role }, "rahul", {
    expiresIn: "1d",
  });
  }
  

  res.json(name);
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token)
  if (!token) {
    return res.json({ Message: "we needd to taken token" });
  } else {
    jwt.verify(token, "rahul", (err, decoded) => {
      if (err) {
        return res.send(err);
      } else {
        // req.name=decoded.name;
        next();
      }
    });
  }
};

// app.get("/check", verifyUser, (req, res) => {
//   return res.json({ Status: "Success", name: req.name });
// });

app.get("/log6", (req, res) => {
  res.clearCookie("token");
  // console.log(res.clearCookie("token"))
  return res.json({ Status: "Success" });
});

// Post Login route for Mr
app.post("/login_mr", async (req, res) => {
  let result = req.body;
  let Email = result.Email;
  let password = result.password;

  let check = await sing.findOne({ Email });
  const isPasswordValid = await bcrypt.compare(password, check.password);
  if (!isPasswordValid) {
    return res.json("Invalid");
  }

  const name = jwt.sign({ Email: result.Email }, "rahul", { expiresIn: "1d" });

  res.cookie("token", name, { httpOnly: true });
  return res.json({ Status: "Success" });
});

//verify

const verifyMr = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);

  if (!token) {
    return res.json({ Message: "we needd to taken token" });
  } else {
    jwt.verify(token, "rahul", (err, decoded) => {
      if (err) {
        return res.send(err);
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

// get route for mr verification and authentication

app.get("/ch", verifyUser, (req, res) => {
  let mm = req.cookies.token;

  function decodeJWT(mm) {
    return jwt.decode(mm);
  }

  const decode = decodeJWT(mm);
  let Email = decode.Email;
  console.log(Email);

  console.log(req.name);
  return res.json({ Status: "Success", Name: Email });
});

//Singup route for mr_login
app.post("/sing_mr", async (req, res) => {
  let hasspass = req.body.password;
  let password = await bcrypt.hash(hasspass, 10);
  await mr_login.insertMany({ Email: req.body.Email, password });
  res.send(password);
});

app.get("/mr_pr_order", async (req, res) => {
  // const { User,year, month } = req.query;
  // console.log(User)
  // const startDate = new Date(year, month - 1, 1);
  // const endDate = new Date(year, month, 0);
  // console.log(req.query);
  const { date } = req.body;
  console.log(date);
  try {
    const data = await mr.find({
      orderDate: {
        $gte: date,
      },
    });

    res.json(data);
  } catch (err) {
    // console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});
// Total_Stock and  Total_Expiry Data connection
app.get("/get1", async (req, res) => {
  let raw_data = await user.find({});
  console.log(raw_data["paracetemol"]);
  let date = new Date();
  let filter = await raw_data.filter((item) => {
    const expiryDate = new Date(item.expire);
    return expiryDate < date;
  });

  if (filter) {
    await expire_stock.insertMany(filter);
    // Remove the item from the database

    let ids = filter.map((item) => item._id);
    let ll = await user.deleteMany({ _id: ids });
    console.log(ll);
  }

  res.send(raw_data);
});
// Data api for print order
app.get("/order_to_print", async (req, res) => {
  const { date } = req.query;
  console.log(date);
  try {
    const data = await mr_order_out.find({ orderDate:date });

    res.json(data);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//data api  which order was printed
app.post("/order_printed", async (req, res) => {
  let condition = req.body;
  let bool = condition.mm;
  let date = condition.date;
  console.log(date);

  if (bool) {
    console.log("okay");
  } else {
    console.log("not okay");

    let raw_data = await mr_order_out.find({
      orderDate: {
        $gte: date,
      },
    });

    if (raw_data) {
      await orderded_printed.insertMany(raw_data);
      // Remove the item from the database

      let ids = raw_data.map((item) => item._id);
      let ll = await mr_order_out.deleteMany({ _id: ids });
      //  console.log(ll)
    }
  }
  res.send("printed");
});

app.get("/get3", async (req, res) => {
  const { custNum } = req.body;
  const order = await orderded_printed.findOne({ custNum });

  const obj = order.products.reduce((acc, item, index) => {
    acc[`t_${index}`] = item;
    return acc;
  }, {});

  objectLength = Object.keys(obj).length;
  //   console.log(objectLength);
  // console.log(obj)

  let mm = new Object();
  mm.Name = obj.t_0.medicineName.toLowerCase();
  mm.Name1 = obj.t_1.medicineName.toLowerCase();
  mm.Name2 = obj.t_2.medicineName.toLowerCase();
  // mm.Name3=obj.t_3.medicineName
  // mm.Name4=obj.t_4.medicineName

  //for Quantity
  mm.quantity = obj.t_0.quantity;
  mm.quantity1 = obj.t_1.quantity;
  mm.quantity2 = obj.t_2.quantity;
  let { Name } = mm;
  let { quantity } = mm;
  console.log(quantity);

  async function updateWithTransaction() {
    // const pre_data=await user.findOne({Name})
    // console.log(pre_data.quantity)
    // if (pre_data.quantity>quantity) {
    //   const result = await user.updateOne(
    //     { Name: Name }, // Filter
    //     // { $set: { quantity: 77 } } // Update
    //     { $inc: { quantity: -quantity } }
    //   );
    // }
    // else{
    //   console.log("No stock available")
    // }
    // const result = await user.updateOne(
    //   { Name: Name }, // Filter
    //   // { $set: { quantity: 77 } } // Update
    //   { $inc: { quantity: -quantity } }
    // );
    // console.log(result.matchedCount)
  }
  updateWithTransaction();

  let rr = await user.findOne({ Name });
  // console.log(rr)

  async function check(Name, quantity) {
    console.log(Name);
    console.log(quantity);
    const result = await user.updateOne(
      { Name: Name }, // Filter
      // { $set: { quantity: 77 } } // Update
      { $inc: { quantity: -quantity } }
    );
    console.log(result);
  }
  check(Name, quantity);
  res.send(rr);
});

app.get("/get4", async (req, res) => {
  const { custNum } = req.query;
  console.log(req.body);
  const order = await orderded_printed.findOne({ custNum });

  const obj = order.products.reduce((acc, item, index) => {
    acc[`t_${index}`] = item;
    return acc;
  }, {});

  objectLength = Object.keys(obj).length;

  let products_data = new Object();
  if (objectLength === 1) {
    console.log("its 1");
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
  } else if (objectLength === 2) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
  } else if (objectLength === 3) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
  } else if (objectLength === 4) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
  } else if (objectLength === 5) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
  } else if (objectLength === 6) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    products_data.Name5 = obj.t_5.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
    products_data.quantity5 = obj.t_5.quantity;
  } else if (objectLength === 7) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    products_data.Name5 = obj.t_5.medicineName.toLowerCase();
    products_data.Name6 = obj.t_6.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
    products_data.quantity5 = obj.t_5.quantity;
    products_data.quantity6 = obj.t_6.quantity;
  } else if (objectLength === 8) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    products_data.Name5 = obj.t_5.medicineName.toLowerCase();
    products_data.Name6 = obj.t_6.medicineName.toLowerCase();
    products_data.Name7 = obj.t_7.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
    products_data.quantity5 = obj.t_5.quantity;
    products_data.quantity6 = obj.t_6.quantity;
    products_data.quantity7 = obj.t_7.quantity;
  } else if (objectLength === 9) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    products_data.Name5 = obj.t_5.medicineName.toLowerCase();
    products_data.Name6 = obj.t_6.medicineName.toLowerCase();
    products_data.Name7 = obj.t_7.medicineName.toLowerCase();
    products_data.Name8 = obj.t_8.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
    products_data.quantity5 = obj.t_5.quantity;
    products_data.quantity6 = obj.t_6.quantity;
    products_data.quantity7 = obj.t_7.quantity;
    products_data.quantity8 = obj.t_8.quantity;
  } else if (objectLength === 10) {
    products_data.Name0 = obj.t_0.medicineName.toLowerCase();
    products_data.Name1 = obj.t_1.medicineName.toLowerCase();
    products_data.Name2 = obj.t_2.medicineName.toLowerCase();
    products_data.Name3 = obj.t_3.medicineName.toLowerCase();
    products_data.Name4 = obj.t_4.medicineName.toLowerCase();
    products_data.Name5 = obj.t_5.medicineName.toLowerCase();
    products_data.Name6 = obj.t_6.medicineName.toLowerCase();
    products_data.Name7 = obj.t_7.medicineName.toLowerCase();
    products_data.Name8 = obj.t_8.medicineName.toLowerCase();
    products_data.Name9 = obj.t_9.medicineName.toLowerCase();
    //data of qualtiy
    products_data.quantity = obj.t_0.quantity;
    products_data.quantity1 = obj.t_1.quantity;
    products_data.quantity2 = obj.t_2.quantity;
    products_data.quantity3 = obj.t_3.quantity;
    products_data.quantity4 = obj.t_4.quantity;
    products_data.quantity5 = obj.t_5.quantity;
    products_data.quantity6 = obj.t_6.quantity;
    products_data.quantity7 = obj.t_7.quantity;
    products_data.quantity8 = obj.t_8.quantity;
    products_data.quantity9 = obj.t_9.quantity;
  } else {
    console.log("Please enter only 10 medicine");
  }

  const {
    Name0,
    Name1,
    Name2,
    Name3,
    Name4,
    Name5,
    Name6,
    Name7,
    Name8,
    Name9,
    quantity,
    quantity1,
    quantity2,
    quantity3,
    quantity4,
    quantity5,
    quantity6,
    quantity7,
    quantity8,
    quantity9,
  } = products_data;

  let stock_price;
  let mednum = new Object();
  {
    let Name = Name0;
    console.log(Name);
    let quantit = quantity;
    console.log(quantit);
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med1 = total_stock.price;

      let total_order_quantity = total_stock.quantity;
      console.log(total_order_quantity);
      if (total_order_quantity >= quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 100 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not available");
      }
    }
  }
  {
    let Name = Name1;

    let quantit = quantity1;

    let total_stock = await user.findOne({ Name });

    if (total_stock) {
      mednum.med2 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name2;
    let quantit = quantity2;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med3 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name3;
    let quantit = quantity3;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med4 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name4;
    let quantit = quantity4;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med5 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name5;
    let quantit = quantity5;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med6 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name6;
    let quantit = quantity6;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med7 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name7;
    let quantit = quantity7;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med8 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }
  {
    let Name = Name8;
    let quantit = quantity8;
    let total_stock = await user.findOne({ Name });
    if (total_stock) {
      mednum.med9 = total_stock.price;
      let total_order_quantity = total_stock.quantity;

      if (total_order_quantity > quantit) {
        await user.updateOne(
          { Name: Name }, // Filter
          // { $set: { quantity: 77 } } // Update
          { $inc: { quantity: -quantit } }
        );
      } else {
        console.log("Stock is not  available");
      }
    }
  }

  const total_stock_medic_price = { price: mednum };
  // console.log(tt)
  order.products.push(total_stock_medic_price);
  res.send(order);
});

app.get("/expire_data", async (req, res) => {
  const { Name, date } = req.query;

  const date1 = new Date(date);
  const month = date1.getMonth() + 1;
  const year = date1.getFullYear();
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  let data;
  let filterData;
  try {
    data = await expire_stock.find({
      expire: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    filterData = data.filter((person) => person.Name === Name);
  } catch (error) {
    res.json("No response from server");
  }
  if (Name) {
    res.json(filterData);
  } else {
    res.json(data);
  }
});

app.get("/mr_pr1", async (req, res) => {
  const { Mr, date, date1 } = req.query;
  let ee;
  let data;
  let filterData;
  let filterData1
  // let Mr=Id
  // console.log(date1)
  if (date) {
    try {
      ee = await mr.find({ orderDate: date });
      console.log(ee);
      filterData = ee.filter((person) => person.Mr === Mr);
    } catch (error) {
      console.log("Data Not Found");
    }
  } else if (date1) {
    const date2 = new Date(date1);
    const month = date2.getMonth() + 1;
    const year = date2.getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    try {
      data = await mr.find({
        orderDate: {
          $gte: startDate,
          $lt: endDate,
        },
        
      });
      filterData1 = data.filter((person) => person.Mr === Mr);
    } catch (error) {
      console.log("Data Not Found");
    }
  }

  console.log(Mr);
  if (ee) {
    res.send(filterData);
  } else {
    res.send(filterData1);
  }
});


//Anop mongooges connection
// let mongodb2=mongoose.connect("mongodb+srv://anoopyadav7977195135:anop@789@cluster0.mygi8h4.mongodb.net/result")

app.get("/anop",async (req,res) => {
 
// let mongodb2= await  mongoose.connect("mongodb+srv://anoopyadav7977195135:anop@789@cluster0.mygi8h4.mongodb.net/result")
 res.send(mongodb2)

})
app.listen(port, () => console.log("server is connected"));

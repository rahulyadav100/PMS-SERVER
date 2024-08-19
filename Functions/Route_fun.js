// const fetc_data = async (req, res) => {
//   const { custNum } = req.body;
//   const order = await orderded_printed.findOne({ custNum });
//   // Make the products array of object into  object
//   const obj = order.products.reduce((acc, item, index) => {
//     acc[`t_${index}`] = item;
//     return acc;
//   }, {});




// function data_fetch_fun(Name) {
//     console.log(Name)
// }




//   objectLength = Object.keys(obj).length;
//   let products_data = new Object();
//   if (objectLength === 1) {
//     console.log("its 1");
//     products_data.Name = obj.t_0.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//   } else if (objectLength === 2) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//   } else if (objectLength === 3) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//   } else if (objectLength === 4) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//   } else if (objectLength === 5) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//   } else if (objectLength === 6) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     products_data.Name5 = obj.t_5.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//     products_data.quantity5 = obj.t_5.quantity;
//   } else if (objectLength === 7) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     products_data.Name5 = obj.t_5.medicineName.toLowerCase();
//     products_data.Name6 = obj.t_6.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//     products_data.quantity5 = obj.t_5.quantity;
//     products_data.quantity6 = obj.t_6.quantity;
//   } else if (objectLength === 8) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     products_data.Name5 = obj.t_5.medicineName.toLowerCase();
//     products_data.Name6 = obj.t_6.medicineName.toLowerCase();
//     products_data.Name7 = obj.t_7.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//     products_data.quantity5 = obj.t_5.quantity;
//     products_data.quantity6 = obj.t_6.quantity;
//     products_data.quantity7 = obj.t_7.quantity;
//   } else if (objectLength === 9) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     products_data.Name5 = obj.t_5.medicineName.toLowerCase();
//     products_data.Name6 = obj.t_6.medicineName.toLowerCase();
//     products_data.Name7 = obj.t_7.medicineName.toLowerCase();
//     products_data.Name8 = obj.t_8.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//     products_data.quantity5 = obj.t_5.quantity;
//     products_data.quantity6 = obj.t_6.quantity;
//     products_data.quantity7 = obj.t_7.quantity;
//     products_data.quantity8 = obj.t_8.quantity;
//   } else if (objectLength === 10) {
//     products_data.Name0 = obj.t_0.medicineName.toLowerCase();
//     products_data.Name1 = obj.t_1.medicineName.toLowerCase();
//     products_data.Name2 = obj.t_2.medicineName.toLowerCase();
//     products_data.Name3 = obj.t_3.medicineName.toLowerCase();
//     products_data.Name4 = obj.t_4.medicineName.toLowerCase();
//     products_data.Name5 = obj.t_5.medicineName.toLowerCase();
//     products_data.Name6 = obj.t_6.medicineName.toLowerCase();
//     products_data.Name7 = obj.t_7.medicineName.toLowerCase();
//     products_data.Name8 = obj.t_8.medicineName.toLowerCase();
//     products_data.Name9 = obj.t_9.medicineName.toLowerCase();
//     //data of qualtiy
//     products_data.quantity = obj.t_0.quantity;
//     products_data.quantity1 = obj.t_1.quantity;
//     products_data.quantity2 = obj.t_2.quantity;
//     products_data.quantity3 = obj.t_3.quantity;
//     products_data.quantity4 = obj.t_4.quantity;
//     products_data.quantity5 = obj.t_5.quantity;
//     products_data.quantity6 = obj.t_6.quantity;
//     products_data.quantity7 = obj.t_7.quantity;
//     products_data.quantity8 = obj.t_8.quantity;
//     products_data.quantity9 = obj.t_9.quantity;
//   } else {
//     console.log("Please enter only 10 medicine");
//   }

//   let {Name}=products_data.medicineName
//   data_fetch_fun(Name)


//   function data_fetch_fun(Name) {
//     console.log(Name)
// }
// return "jsdhjgdjvh"
// };


// module.exports=fetc_data()


 
const RC = require("../models/rc");
const rcwithchallan = require("../models/rcwithchallan.js");
const challan = require("../models/challan.js");
const DrivingLicense = require("../models/drivingLicense");
const User = require("../models/User.js");
const WalletTransaction = require("../models/WalletTransaction.js");



// exports.getRCDetails = async (req, ress) => {
//   try {
//     let { rcNumber,  user: userId } = req.params;


//       rcNumber = rcNumber
//       .toUpperCase()   // sabko capital
//       .replace(/\s+/g, "") // beech ke space remove
//       .trim(); // starting aur ending space remove

//     // 1. Check agar DB me already hai
//     let rcData = await RC.findOne({ rcNumber });

//     if (rcData) {
//       console.log("Returning data from DB...");
//       return ress.json(rcData.data); // DB ka data return
//     }

//        const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Check if wallet has enough balance
//     if (user.wallet_point < 8) {
//       return res.status(400).json({ message: "Insufficient wallet balance" });
//     }

    





// let responsiveAPI;



//   const res = await fetch("https://api.gridlines.io/rc-api/fetch-detailed", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
      
//       "X-API-Key": "d9M9chG1Fhdzlh1ie7069nzAC5m6EIzA",
//       "X-Auth-Type": "API-Key",
//       "X-Reference-ID": "xxxx",
//     },
//     body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
//   });

//   if (!res.ok) {
//        console.log(res)
//         return    ress.status(500).json({ message:  "Gridline API Down" });
//     const resggg = await fetch(
//       "https://stoplight.io/mocks/gridlines/gridlines-api-docs/133154724/rc-api/fetch-detailed",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "X-API-Key": "test-credential-396015679557935104",

//           "X-Auth-Type": "API-Key",
//           "X-Reference-ID": "",
//         },
//         body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
//       }
//     );

//       responsiveAPI = await resggg.json();
   
//   }else{
//       responsiveAPI = await res.json();
//   }

//   console.log(responsiveAPI)

//     // 3. DB me save karo
//     rcData = new RC({
//       rcNumber,
//       data: responsiveAPI,
//     });
//     await rcData.save();

//     return ress.json(responsiveAPI);

//   } catch (error) {
//     console.error("Error fetching RC details:", error.message);
//     ress.status(500).json({ message: error.message || "Something went wrong" });
//   }
// };







exports.getRCDetails = async (req, res) => {
  try {
    let { rcNumber, user: userId } = req.params;
 
    // Clean RC number
    rcNumber = rcNumber.toUpperCase().replace(/\s+/g, "").trim();

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if wallet has enough balance
    if (user.wallet_point < 8) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // 1. Check if RC is in DB
    let rcData = await RC.findOne({ rcNumber });
    if (rcData) {
      console.log("Returning data from DB...");
      
      // Deduct ₹8 and create wallet transaction
      user.wallet_point -= 8;
      await user.save();

      await WalletTransaction.create({
        user: user._id,
        amount: 8,
        type: "DEBIT",
        reason: `RC Fetch - ${rcNumber}`,
        status: "SUCCESS",
        orderId: `RC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });

      return res.json(rcData.data);
    }

    // 2. Fetch from external API
    console.log("Fetching new data from external API...");
    let responsiveAPI;

    const apiRes = await fetch("https://api.gridlines.io/rc-api/fetch-detailed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": "d9M9chG1Fhdzlh1ie7069nzAC5m6EIzA",
        "X-Auth-Type": "API-Key",
        "X-Reference-ID": "xxxx",
      },
      body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
    });


const rp = await apiRes.json();
console.log(rp)
 if(rp?.status==200){
if (rp?.data?.code=='1001'){
  return  res.status(404).json({ message: "rc not exist" });
}
if (rp?.data?.code=='1002'){
  return  res.status(404).json({ message: "Vehicle record found in more than one RTO." });
}
if (rp?.data?.code!=='1000'){
  return  res.status(404).json({ message: "Provided insurer mapping id is not valid" });
}
 }



 if(rp?.status==500){
 
  return  res.status(404).json({ message: "Vahan solution api server down!" });
}


    if (!apiRes.ok) {


      // fallback mock API
      const fallbackRes = await fetch(
        "https://stoplight.io/mocks/gridlines/gridlines-api-docs/133154724/rc-api/fetch-detailed",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-API-Key": "test-credential-396015679557935104",
            "X-Auth-Type": "API-Key",
            "X-Reference-ID": "",
          },
          body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
        }
      );
      responsiveAPI = await fallbackRes.json();
    } else {
       user.wallet_point -= 8;
    await user.save();

    await WalletTransaction.create({
      user: user._id,
      amount: 8,
      type: "DEBIT",
      reason: `RC Fetch - ${rcNumber}`,
      status: "SUCCESS",
      orderId: `RC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    });
      responsiveAPI = rp
    }

   

    // 3. Save RC data to DB
    rcData = new RC({ rcNumber, data: responsiveAPI });
    await rcData.save();

    // 4. Deduct ₹8 and create wallet transaction
   

    return res.json(responsiveAPI);
  } catch (error) {
    console.error("Error fetching RC details:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};







exports.getRCWithChallanDetails = async (req, ress) => {
  try {
    let { rcNumber } = req.params;


      rcNumber = rcNumber
      .toUpperCase()   // sabko capital
      .replace(/\s+/g, "") // beech ke space remove
      .trim(); // starting aur ending space remove

    // 1. Check agar DB me already hai
    let rcData = await rcwithchallan.findOne({ rcNumber });
console.log(rcData) 
    if (rcData) {
      console.log("Returning data from DB...");
      return ress.json(rcData.data); // DB ka data return
    }

    // 2. Agar DB me nahi hai to API se fetch karo
    console.log("Fetching new data from external API...");

    





let responsiveAPI;
 


  const res = await fetch("https://api.gridlines.io/rc-api/fetch-detailed-challan", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": "d9M9chG1Fhdzlh1ie7069nzAC5m6EIzA",
      "X-Auth-Type": "API-Key",
      "X-Reference-ID": "xxxx",
    },
    body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
  });

  if (!res.ok) { 
      console.log("res notttt")
      console.log(res)
        return    ress.status(500).json({ message:  "Gridline API Down" });
    const resggg = await fetch(
      "https://stoplight.io/mocks/gridlines/gridlines-api-docs/133154724/rc-api/fetch-detailed-challan",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": "test-credential-396015679557935104",

          "X-Auth-Type": "API-Key",
          "X-Reference-ID": "",
        },
        body: JSON.stringify({ rc_number: rcNumber, consent: "Y" }),
      }
    );

      responsiveAPI = await resggg.json();
   
  }else{
      responsiveAPI = await res.json();
  }

  console.log(responsiveAPI)

    // 3. DB me save karo
    rcData = new rcwithchallan({
      rcNumber,
      data: responsiveAPI,
    });
    await rcData.save();

    return ress.json(responsiveAPI);

  } catch (error) {
    console.error("Error fetching RC details:", error.message);
    ress.status(500).json({ message: error.message || "Something went wrong" });
  }
};




exports.drivinglicense = async (req, res) => {
  try {
    let { driving_license_number,  userId, date_of_birth, source, consent } = req.body;

    // Validate required fields
    if (!driving_license_number || !date_of_birth || !consent) {
      return res.status(400).json({ 
        message: "Driving license number, date of birth, and consent are required" 
      });
    }



    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if wallet has enough balance
    if (user.wallet_point < 8) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }




    // Format and clean the input
    driving_license_number = driving_license_number
      .toUpperCase()
      .replace(/\s+/g, "")
      .trim();

    // Check if data already exists in DB
    let licenseData = await DrivingLicense.findOne({ 
      driving_license_number, 
      date_of_birth 
    });

    if (licenseData) {



    user.wallet_point -= 8;
      await user.save();

      await WalletTransaction.create({
        user: user._id,
        amount: 8,
        type: "DEBIT",
        reason: `DL Fetch - ${driving_license_number}`,
        status: "SUCCESS",
        orderId: `DL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });



      console.log("Returning driving license data from DB...");
      return res.json(licenseData.data);
    }

    // Fetch from external API if not in DB
    console.log("Fetching new data from external API...");

    const apiResponse = await fetch("https://api.gridlines.io/dl-api/fetch", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-Key": "d9M9chG1Fhdzlh1ie7069nzAC5m6EIzA",
        "X-Auth-Type": "API-Key",
        "X-Reference-ID": Date.now().toString()
      },
      body: JSON.stringify({
        driving_license_number,
        date_of_birth,
        source: source || 1,
        consent
      })
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("API Error:", errorText);
      return res.status(500).json({ 
        message: "Failed to fetch driving license details from external API" 
      });
    }

    const apiData = await apiResponse.json();




    user.wallet_point -= 8;
      await user.save();

      await WalletTransaction.create({
        user: user._id,
        amount: 8,
        type: "DEBIT",
        reason: `DL Fetch - ${driving_license_number}`,
        status: "SUCCESS",
        orderId: `DL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });








    // Save to database
    licenseData = new DrivingLicense({
      driving_license_number,
      date_of_birth,
      data: apiData
    });
    
    await licenseData.save();

    return res.json(apiData);

  } catch (error) {
    console.error("Error fetching driving license details:", error.message);
    res.status(500).json({ 
      message: error.message || "Something went wrong" 
    });
  }
};










exports.getChallan = async (req, ress) => {
  try {
    let { rcNumber, chassis_number,engine_number } = req.params;


      rcNumber = rcNumber
      .toUpperCase()   // sabko capital
      .replace(/\s+/g, "") // beech ke space remove
      .trim(); // starting aur ending space remove
      chassis_number = chassis_number
      .toUpperCase()   // sabko capital
      .replace(/\s+/g, "") // beech ke space remove
      .trim(); // starting aur ending space remove
      engine_number = engine_number
      .toUpperCase()   // sabko capital
      .replace(/\s+/g, "") // beech ke space remove
      .trim(); // starting aur ending space remove

    // 1. Check agar DB me already hai
    let rcData = await challan.findOne({  rcNumber, chassis_number,engine_number  });

    if (rcData) {
      console.log("Returning data from DB...");
      return ress.json(rcData.data); // DB ka data return
    }

    // 2. Agar DB me nahi hai to API se fetch karo
    console.log("Fetching new data from external API...");

    





let responsiveAPI;



  const res = await fetch("https://api.gridlines.io/rc-api/echallan/fetch", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "X-API-Key": "test-credential-396015679557935104",
      "X-API-Key": "d9M9chG1Fhdzlh1ie7069nzAC5m6EIzA",
      "X-Auth-Type": "API-Key",
      "X-Reference-ID": "xxxx",
    },
    body: JSON.stringify({  rcNumber, chassis_number,engine_number , consent: "Y" }),
  });

  if (!res.ok) {
   return    ress.status(500).json({ message:  "Gridline API Down" });
      console.log(res)
    const resggg = await fetch(
      "https://stoplight.io/mocks/gridlines/gridlines-api-docs/133154724/rc-api/echallan/fetch",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": "test-credential-396015679557935104",

          "X-Auth-Type": "API-Key",
          "X-Reference-ID": "",
        },
        body: JSON.stringify({  rcNumber, chassis_number,engine_number , consent: "Y" }),
      }
    );

      responsiveAPI = await resggg.json();
   
  }else{
      responsiveAPI = await res.json();
  }

  console.log(responsiveAPI)

    // 3. DB me save karo
    rcData = new challan({
     rcNumber, chassis_number,engine_number ,
      data: responsiveAPI,
    });
    await rcData.save();

    return ress.json(responsiveAPI);

  } catch (error) {
    console.error("Error fetching RC details:", error.message);
    ress.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const express = require("express");
const { start } = require("repl");

const app = express();
app.use(express.json());

const halls = [
  {
    id: 1,
    roomName: "Deluxe",
    aminities: "Double bed, double sofas",
    noOfSeats: 5,
    price: 100,
    roomNum: 101,
    isBooked: false,
    customerDetails: {},
  },
  {
    id: 2,
    roomName: "Rolex",
    aminities: "Triple bed, double sofas",
    noOfSeats: 3,
    price: 500,
    roomNum: 201,
    isBooked: true,
    customerDetails: {
      customerName: "Sam",
      date: "Aug 12",
      startTime: "12am",
      endTime: "5pm",
      boookingDate: "Aug 10",
      bookingId: "Aadhar Card",
      bookingStatus: "Active",
    },
  },
  {
    id: 3,
    roomName: "Royal",
    aminities: "Four bed, double sofas",
    noOfSeats: 4,
    price: 250,
    roomNum: 301,
    isBooked: false,
    customerDetails: {},
  },
];

const customers = [
  {
    id: 1,
    customerName: "Sam",
    roomName: "suite",
    date: "Aug 12",
    startTime: "12am",
    endTime: "5pm",
    roomNum: 201,
  },
];

app.get("/", (req, res) => {
  res.send("Am working fine");
});

app.get("/halldetails", (req, res) => {
  res.send(halls);
});

//1.Creating A hall
app.post("/halldetails/add", (req, res) => {
  const newRoom = {
    id: halls.length + 1,
    roomName: req.body.roomName,
    aminities: req.body.aminities,
    noOfSeats: req.body.noOfSeats,
    roomNum: req.body.roomNum,
    price: req.body.price,
    isBooked: false,
  };
  halls.push(newRoom);
  res.send(halls);
});

//2.Booking a Room

app.post("/booking", (req, res) => {
  let dated = new Date();
  const filterRooms = halls.filter((hall) => !hall.isBooked);
  console.log(filterRooms);
  const newCust = {
    id: customers.length + 1,
    dater: `June ${dated.getDate()}`,
    startTime: `${dated.getHours()} hrs`,
    endTime: `${+dated.getHours() + 5} hrs`,
  };
  filterRooms[0].customerDetails = newCust;
  customers.push(newCust);
  filterRooms[0].isBooked = true;
  res.send(filterRooms[0]);
});

//3.List all rooms with roomName,booked status,customername,date,starttime,endtime

app.get("/bookedrooms", (req, res) => {
  let filterHalls = halls.filter((hall) => hall.isBooked);
  res.send(filterHalls);
});

//4.List all Customers with roomName,customername,date,starttime,endtime

app.get("/customers", (req, res) => {
  const customerList = customers.map((customer) => {
    // Find the room associated with the customer
    const associatedRoom = halls.find(
      (room) => room.roomNum === customer.roomNum
    );

    return {
      roomName: associatedRoom.roomName,
      customerName: customer.customerName,
      date: customer.date,
      startTime: customer.startTime,
      endTime: customer.endTime,
    };
  });

  res.send(customerList);
});

//5.List how many times a Customers with roomName,customername,date,starttime,endtime,bookingDate,bookingStatus,bookingId

app.get("/customerDetails", (req, res) => {
  let customerFilter = halls.filter((hall) =>
    hall.includes(
      hall.customerDetails.customerName,

      hall.customerDetails.date,
      hall.customerDetails.startTime,
      hall.customerDetails.endTime,
      hall.customerDetails.bookingId,
      hall.customerDetails.bookingStatus,
      hall.customerDetails.boookingDate
    )
  );
  res.send(customerFilter);
});

app.listen(9000, () => console.log("am working fine"));

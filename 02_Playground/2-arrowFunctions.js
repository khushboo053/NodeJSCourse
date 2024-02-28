// const square = function(x) {
//     return x * x;
// }

// const square = (x) => {
//     return x*x;
// }

// const square = (x) => x*x;

// console.log(square(3));

// Arrow functions does not allow "this"

const event1 = {
  name: "Bday event",
  printGuestList: () => {
    console.log("Welcome guest " + this.name);
  },
};

const event2 = {
  name: "Bday event",
  guestList: ["Andrew", "Emily", "Blue"],
  printGuestList() {
    console.log("Guest List for " + this.name);

    this.guestList.forEach((guest) => {
      console.log(`${guest} is attending ${this.name}`);
    });
  },
};

event1.printGuestList(); // undefined
event2.printGuestList();

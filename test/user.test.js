const User = require("../classes/User");

const newUser = new User(
  "Louafi",
  "Razine",
  new Date("09/07/2010"),
  "louafi.style@gmail.com",
  "Jkkkkkkddd12"
);

test("test new user", () => {
  expect(newUser.isValid()).toBe(true);
});

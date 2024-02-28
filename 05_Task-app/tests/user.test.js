const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../src/models/user");
const { userOneId, userOne, setUpDatabase } = require("./fixtures/db");

const app = require("../src/app");

beforeEach(setUpDatabase);

// toBe()- Uses === operator

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Khushboo",
      email: "khushboomakhija053@gmail.com",
      password: "123456789",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  // expect(response.body.user.name).toBe("Andrew");

  expect(response.body).toMatchObject({
    user: {
      name: "Khushboo",
      email: "khushboomakhija053@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("123456789");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypass",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticate user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/philly.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Emily",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Emily");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "India",
    })
    .expect(400);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Emily");
});

test("Should not signup user with invalid name/email/password", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "",
      email: "khush.com",
      password: "123",
    })
    .expect(400);

  // Assert that the database not changed
  const user = await User.findOne({ email: "khush.com" });
  expect(user).toBeNull();

  // Assertions abt the response

  // Assertions about the response
  expect(response.text).toContain("error");
});

test("Should not update user if unauthenticated", async () => {
  await request(app).patch("/users/me").send().expect(401);
});

test("Should not update user with invalid name/email/password", async () => {
  await request(app).patch('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send({
    name: '',
    email: 'khush.com',
    password: '123'
  }).expect(400)
});
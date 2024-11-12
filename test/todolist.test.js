const TodoList = require("../classes/todolist");
const User = require("../classes/user");
const EmailSenderService = require("../classes/emailSenderService");

const newUser = new User(
  "Louafi",
  "Razine",
  new Date("09/07/2010"),
  "louafi.razine@gmail.com",
  "Jkkkkkkddd12"
);

jest.mock("../classes/emailSenderService");

test("test new user", () => {
  expect(newUser.isValid()).toBe(true);
});

describe("TodoList invalid user", () => {
  const invalidUser = new User(
    "Louafi",
    "Razine",
    new Date("09/07/2010"),
    "louafi.razine@gmail.com",
    "Jkk12" // invalid password
  );

  let todoList;
  let emailSenderService;

  beforeEach(() => {
    emailSenderService = new EmailSenderService();
    todoList = new TodoList(invalidUser, emailSenderService);
  });

  test("todolist add with invalid user", () => {
    expect(() => {
      todoList.add({
        name: `Item1`,
        content: "Contenu",
        createdAt: new Date(Date.now()),
      });
    }).toThrow("L'utilisateur n'est pas valide.");
  });
});

describe("TodoList with email sending on the 8th", () => {
  let emailSenderService;
  let todoList;

  beforeEach(() => {
    emailSenderService = new EmailSenderService();

    emailSenderService.sendEmail = jest.fn(() => {
      return true;
    });

    todoList = new TodoList(newUser, emailSenderService);
    todoList.save = jest.fn().mockReturnValue(true);
  });

  test("email sent when the 8th item is added", () => {
    const items = Array.from({ length: 8 }, (_, i) => ({
      name: `Item${i + 1}`,
      content: "Contenu",
      createdAt: new Date(Date.now() + i * 31 * 60 * 1000),
    }));

    items.slice(0, 7).forEach((item) => todoList.add(item));

    expect(todoList.emailSenderService.sendEmail).not.toHaveBeenCalled();

    todoList.add({
      name: `Item${10}`,
      content: "Contenu",
      createdAt: new Date(Date.now() + 10 * 31 * 60 * 1000),
    });
    todoList.add({
      name: `Item${11}`,
      content: "Contenu",
      createdAt: new Date(Date.now() + 12 * 31 * 60 * 1000),
    });

    todoList.save();

    expect(todoList.emailSenderService.sendEmail).toHaveBeenCalledWith(
      newUser,
      "Votre ToDoList est presque remplie !"
    );
  });

  test("email not send before the 8th item", () => {
    const items = Array.from({ length: 7 }, (_, i) => ({
      name: `Item${i + 1}`,
      content: "Contenu",
      createdAt: new Date(Date.now() + i * 31 * 60 * 1000),
    }));

    items.forEach((item) => todoList.save(item));

    expect(emailSenderService.sendEmail).not.toHaveBeenCalled();
  });
});

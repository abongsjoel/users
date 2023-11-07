import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./index";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  //Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - Make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted (Not the best implementation)", () => {
  // NOT THE BEST IMPLEMENTATION
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };

  render(<UserForm onUserAdd={callback} />);

  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  user.click(nameInput);
  user.keyboard("mas");

  user.click(emailInput);
  user.keyboard("mas@magaret.com");

  const button = screen.getByRole("button");
  user.click(button);

  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "mas", email: "mas@magaret.com" });
});

test("it calls onUserAdd when the form is submitted (using mock function)", () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  user.click(nameInput);
  user.keyboard("mas");

  user.click(emailInput);
  user.keyboard("mas@magaret.com");

  const button = screen.getByRole("button");
  user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "mas", email: "mas@magaret.com" });
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("mas");

  user.click(emailInput);
  user.keyboard("mas@magaret.com");

  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});

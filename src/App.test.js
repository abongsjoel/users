import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can receive a new user and show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("mas");

  await user.click(emailInput);
  await user.keyboard("mag@magaret.com");

  await user.click(button);

  const name = screen.getByRole("cell", { name: "mas" });
  const email = screen.getByRole("cell", { name: "mag@magaret.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

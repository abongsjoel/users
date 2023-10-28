import { render, screen, within } from "@testing-library/react";
import UserList from "./index";

test("render one row per user", () => {
  const users = [
    { name: "Mascot", email: "mas@mas.com" },
    { name: "Faith", email: "faith@mas.com" },
  ];
  render(<UserList users={users} />);

  //   screen.logTestingPlaygroundURL();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

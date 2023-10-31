import { render, screen, within } from "@testing-library/react";
import UserList from "./index";

const renderComponent = () => {
  const users = [
    { name: "Mascot", email: "mas@mas.com" },
    { name: "Faith", email: "faith@mas.com" },
  ];
  render(<UserList users={users} />);

  return { users };
};

test("render one row per user", () => {
  renderComponent();

  //   screen.logTestingPlaygroundURL();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  expect(rows).toHaveLength(2);
});

test("render one row per user 2", () => {
  const users = [
    { name: "Mascot", email: "mas@mas.com" },
    { name: "Faith", email: "faith@mas.com" },
  ];

  const { container } = render(<UserList users={users} />);

  // eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});

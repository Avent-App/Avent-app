import React from "react";
import { ReactDOM } from "react";
import { MemoryRouter } from "react-router";
// import { render } from "testing-library/react";
import { mount } from "../../../backend/app";
import App from "./App";
import Landing from "./Landing";

jest.mock("firebase/app");

describe("Avent app frontend testing", () => {
  // test("renders learn react link"),
  //   () => {
  //     const { getByText } = render(<App />);
  //     const linkElement = getByText();
  //     expect(linkElement).toBeInTheDocument();
  //   };
  // test("Invalid path should redirect to 404 page", () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={["/random"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find(<Landing />).toHaveLength(0));
  //   expect(wrapper.find(<NotFound />).toHaveLength(1));
  // });

  test("invalid path should redirect to 404 page", () => {
    const wrapper = shallow(<Routes />);
  });
});

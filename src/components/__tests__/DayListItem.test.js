import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

// Describe block: DayListItem component
describe("DayListItem", () => {
  // Test case: Rendering without crashing
  it("renders without crashing", () => {
    render(<DayListItem />);
  });

  // Test case: Rendering 'no spots remaining' when there are 0 spots
  it("renders 'no spots remaining' when there are 0 spots", () => {
    // Render the DayListItem component with the name "Monday" and 0 spots
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    // Expect the text "no spots remaining" to be present in the rendered content
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  // Test case: Rendering '1 spot remaining' when there is 1 spot
  it("renders '1 spot remaining' when there is 1 spot", () => {
    // Render the DayListItem component with the name "Monday" and 1 spot
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    // Expect the text "1 spot remaining" to be present in the rendered content
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  // Test case: Rendering '2 spots remaining' when there are 2 spots
  it("renders '2 spots remaining' when there are 2 spots", () => {
    // Render the DayListItem component with the name "Monday" and 2 spots
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    // Expect the text "2 spots remaining" to be present in the rendered content
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });
});
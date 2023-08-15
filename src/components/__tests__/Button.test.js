import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

// Describe block: Test button component
describe("Test button component", () => {
  // Test case: Rendering without crashing
  it("renders without crashing", () => {
    render(<Button />);
  });

  // Test case: Rendering the `children` prop as text
  it("renders its `children` prop as text", () => {
    // Render the Button component with the "Default" text
    const { getByText } = render(<Button>Default</Button>);
    // Expect the text "Default" to be present in the rendered content
    expect(getByText("Default")).toBeInTheDocument();
  });

  // Test case: Rendering a default button style
  it("renders a default button style", () => {
    // Render the Button component with the "Default" text
    const { getByText } = render(<Button>Default</Button>);
    // Expect the rendered content with the text "Default" to have the class "button"
    expect(getByText("Default")).toHaveClass("button");
  });

  // Test case: Rendering a confirm button style
  it("renders a confirm button", () => {
    // Render the Button component with the "Confirm" text and the `confirm` prop
    const { getByText } = render(<Button confirm>Confirm</Button>);
    // Expect the rendered content with the text "Confirm" to have the class "button--confirm"
    expect(getByText("Confirm")).toHaveClass("button--confirm");
  });

  // Test case: Rendering a danger button style
  it("renders a danger button", () => {
    // Render the Button component with the "Danger" text and the `danger` prop
    const { getByText } = render(<Button danger>Danger</Button>);
    // Expect the rendered content with the text "Danger" to have the class "button--danger"
    expect(getByText("Danger")).toHaveClass("button--danger");
  });

  // Test case: Rendering a clickable button and testing the onClick functionality
  it("renders a clickable button", () => {
    // Create a mock function to be used as an onClick handler
    const handleClick = jest.fn();
    // Render the Button component with the "Clickable" text and the onClick handler
    const { getByText } = render(
      <Button onClick={handleClick}>Clickable</Button>
    );

    // Get the button element with the text "Clickable"
    const button = getByText("Clickable");

    // Simulate a click on the button
    fireEvent.click(button);

    // Expect the onClick handler to have been called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test case: Rendering a disabled button and testing the onClick functionality
  it("renders a disabled button", () => {
    // Create a mock function to be used as an onClick handler
    const handleClick = jest.fn();
    // Render the Button component with the "Disabled" text, the onClick handler, and the `disabled` prop
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    // Get the button element with the text "Disabled"
    const button = getByText("Disabled");

    // Simulate a click on the button
    fireEvent.click(button);

    // Expect the onClick handler not to have been called
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

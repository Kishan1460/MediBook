import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import Accordion from "../components/Accordion";

const items = [
  { question: "What is the first question?", answer: "This is answer one." },
  { question: "What is the second question?", answer: "This is answer two." },
];

describe("Accordion", () => {
  it("renders all questions", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("What is the first question?")).toBeInTheDocument();
    expect(screen.getByText("What is the second question?")).toBeInTheDocument();
  });

  it("expands the first item by default", () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByRole("button", { name: /first question/i });
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles a panel open and closed when clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const secondButton = screen.getByRole("button", { name: /second question/i });
    expect(secondButton).toHaveAttribute("aria-expanded", "false");

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the previously open item when a new one opens (only one open at a time)", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const firstButton = screen.getByRole("button", { name: /first question/i });
    const secondButton = screen.getByRole("button", { name: /second question/i });

    await user.click(secondButton);

    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
  });
});

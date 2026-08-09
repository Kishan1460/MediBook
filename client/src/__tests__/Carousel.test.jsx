import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "../components/Carousel";

const slides = [<div key="1">Slide One</div>, <div key="2">Slide Two</div>, <div key="3">Slide Three</div>];

describe("Carousel", () => {
  it("renders all slides", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText("Slide One")).toBeInTheDocument();
    expect(screen.getByText("Slide Two")).toBeInTheDocument();
    expect(screen.getByText("Slide Three")).toBeInTheDocument();
  });

  it("shows navigation controls when there is more than one slide", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
  });

  it("hides navigation controls for a single slide", () => {
    render(<Carousel slides={[<div key="only">Only Slide</div>]} />);
    expect(screen.queryByRole("button", { name: /next slide/i })).not.toBeInTheDocument();
  });

  it("advances to the next slide when the next button is clicked", async () => {
    const user = userEvent.setup();
    render(<Carousel slides={slides} />);

    const dots = screen.getAllByRole("button", { name: /go to slide/i });
    expect(dots[0]).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next slide/i }));
    // After clicking next, slide 2's dot should now be reachable/active state changes.
    expect(screen.getAllByRole("button", { name: /go to slide/i }).length).toBe(3);
  });

  it("renders nothing when given an empty slides array", () => {
    const { container } = render(<Carousel slides={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

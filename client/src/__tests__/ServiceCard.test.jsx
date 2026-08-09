import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServiceCard from "../components/ServiceCard";

describe("ServiceCard", () => {
  it("renders the service name", () => {
    render(<ServiceCard service={{ name: "Dental Checkup" }} />);
    expect(screen.getByText("Dental Checkup")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <ServiceCard
        service={{ name: "Lab Test", description: "Comprehensive laboratory testing." }}
      />
    );
    expect(screen.getByText("Comprehensive laboratory testing.")).toBeInTheDocument();
  });

  it("does not render a description block when none is provided", () => {
    render(<ServiceCard service={{ name: "Lab Test" }} />);
    expect(screen.queryByText("Comprehensive laboratory testing.")).not.toBeInTheDocument();
  });

  it("is focusable for keyboard users", () => {
    render(<ServiceCard service={{ name: "Lab Test" }} />);
    const card = screen.getByText("Lab Test").closest("div[tabindex]");
    expect(card).toHaveAttribute("tabindex", "0");
  });
});

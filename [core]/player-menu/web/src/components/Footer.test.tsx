import { it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { Footer } from "./Footer";

it("should render footer", () => {
  render(<Footer />);

  screen.getByText("Poids 11.4 / 30.0kg");
});

import type { Meta, StoryObj } from "@storybook/react";
import { PreviewCard, generatePalette, hexToHsl } from "./App";

const meta: Meta<typeof PreviewCard> = {
  title: "Components/PreviewCard",
  component: PreviewCard,
};

export default meta;

type Story = StoryObj<typeof PreviewCard>;

export const Default: Story = {
  args: {
    palette: generatePalette(hexToHsl("#C16952")),
  },
};

export const PreviewCardBlue: Story = {
  args: {
    palette: generatePalette(hexToHsl("#3B82F6")),
  },
};

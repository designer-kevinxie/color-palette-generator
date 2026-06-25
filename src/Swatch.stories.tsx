import type { Meta, StoryObj } from "@storybook/react";
import { Swatch } from "./App";

const meta: Meta<typeof Swatch> = {
  title: "Components/Swatch",
  component: Swatch,
};

export default meta;

type Story = StoryObj<typeof Swatch>;

export const LightSwatch: Story = {
  args: {
    role: "background",
    color: { h: 30, s: 20, l: 95 }, // 一个浅色 HSL → 黑字
    isCopied: false,
    onCopy: () => {},
  },
};

export const DarkSwatch: Story = {
  args: {
    role: "background",
    color: { h: 30, s: 20, l: 15 }, // 一个浅色 HSL → 黑字
    isCopied: false,
    onCopy: () => {},
  },
};

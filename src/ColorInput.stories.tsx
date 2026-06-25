import type { Meta, StoryObj } from "@storybook/react";
import { ColorInput } from "./App";

const meta: Meta<typeof ColorInput> = {
  title: "Components/ColorInput",
  component: ColorInput,
};

type Story = StoryObj<typeof ColorInput>;

export const Default: Story = {
  args: {
    value: "#C16953",
    onChange: () => {},
  },
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./components/ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
};

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    value: "#C16953",
    onChange: () => {},
  },
};

export default meta;

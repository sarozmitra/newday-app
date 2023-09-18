import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    tags: ['autodocs'],
  },
  // tags: ['autodocs'], // uncomment it for showing the doc
  argTypes: { onClose: { action: 'closed modal' } },
  
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DefaultModal: Story = {
  args: {
    isOpen: true,
    size:'small',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

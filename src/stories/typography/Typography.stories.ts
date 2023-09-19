import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    tags: ['autodocs'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant:'h1',
    children:'Heading 1'
  }
};

export const Heading2: Story = {
  args: {
    variant:'h2',
    children:'Heading 2'
  }
};

export const Heading3: Story = {
  args: {
    variant:'h3',
    children:'Heading 3'
  }
};

export const Paragraph: Story = {
  args: {
    variant:'p',
    children:'Paragraph'
  }
};

export const Span: Story = {
  args: {
    className:'bodySmall',
    variant:'span',
    children:'Span',
  }
};

export const BodyTextSmall: Story = {
  args: {
    className:'bodySmall',
    children:'Body text small',
  }
};


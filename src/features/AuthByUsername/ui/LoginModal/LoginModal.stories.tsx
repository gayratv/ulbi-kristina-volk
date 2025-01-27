import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { ThemeEnum } from 'app/providers/ThemeProvider';
import { LoginModal } from './LoginModal';

export default {
  title: 'features/LoginModal',
  component: LoginModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const LightLoginModal = Template.bind({});
LightLoginModal.args = {
};

export const DarkLoginModal = Template.bind({});
DarkLoginModal.args = {
};
DarkLoginModal.decorators = [ThemeDecorator(ThemeEnum.DARK)];

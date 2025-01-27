import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { ThemeEnum } from 'app/providers/ThemeProvider';
import { NavBar } from './NavBar';

export default {
  title: 'widgets/NavBar',
  component: NavBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Light = Template.bind({});
Light.args = {

};
Light.decorators = [ThemeDecorator(ThemeEnum.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {

};
Dark.decorators = [ThemeDecorator(ThemeEnum.DARK)];

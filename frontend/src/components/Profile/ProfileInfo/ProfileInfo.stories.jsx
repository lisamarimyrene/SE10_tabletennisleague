import React from 'react';
import ProfileInfo from './ProfileInfo';
import './ProfileInfo.css';

export default {
  component: ProfileInfo,
  title: 'Profile info',
  tags: ['autodocs'],
};




export function Default(args) {
return<ProfileInfo {...args} />;
}

Default.args = {
props: "Props",
hello : "helol"
}






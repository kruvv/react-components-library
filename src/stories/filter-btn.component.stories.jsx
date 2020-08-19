import React from 'react'
import CSFilterBtn from '../components/cs-filter-btn/cs-filter-btn.component';

import './../pages/csearch/csearch-page.styles.scss'


export default {
    title: 'Components/Button',
    component: CSFilterBtn,
};

const Template = (args) => <CSFilterBtn {...args} />;

export const Checked = Template.bind({});
Checked.args = {
    item: {  name: "Кнопка", checked: true  },
};
export const UnChecked = Template.bind({});
UnChecked.args = {
    item: {  name: "Кнопка", checked: false  },
};

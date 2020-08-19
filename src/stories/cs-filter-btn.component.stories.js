import React from 'react'
import CSFilterBtn from '../components/cs-filter-btn/cs-filter-btn.component'


export default {
    title: 'Components/CSFilterBtn',
    component: CSFilterBtn,
};

const Template = (args) => <CSFilterBtn {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    item: [
        {  name: "Листа", checked: true  }
    ],
    handlerAction: () => {}
}

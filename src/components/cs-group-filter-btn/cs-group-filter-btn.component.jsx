import React, { Fragment } from 'react';
import CSFilterBtn from '../cs-filter-btn/cs-filter-btn.component';

const CSGroupFilterBtn = ({optionsGroupBtn, handlerAction}) => {
    return (
        <Fragment>
            {optionsGroupBtn.map((item, index) => {
                return (
                    <CSFilterBtn
                        key={index}
                        item={item}
                        index={index}
                        handlerAction={handlerAction}
                    />
                )
            })}
        </Fragment>
    );
};



export default CSGroupFilterBtn;

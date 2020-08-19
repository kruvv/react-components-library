import React  from 'react';
import { block } from 'bem-cn';



const CSFilterBtn = ({item, handlerAction}) => {
    const mod = item.checked ? 'active' : null
    const sp = block('csearch-page');
    const i = block('icon');
    return (

        <button
            className={sp("filter-btn", {mod}).toString()}
            type="button"
            onClick={(e) =>{handlerAction(item.name)}}
            value={item.name}
        >
        <div className={sp("filter-btn-icon").toString()} value={item.name}>
            { item.checked ?
            /*
            <svg fill="#6b4621" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22 22" width="22"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> :
            <svg  fill="#cfbead" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22 22" width="22"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
            */
                <div className={i({checked: true}).toString()}></div>:
                <div className={i({unchecked: true}).toString()}></div>

            }
        </div>
        <div className={sp("filter-btn-text").toString()} value={item.name}>{item.name}</div>

        </button>

    )

}

export default CSFilterBtn;

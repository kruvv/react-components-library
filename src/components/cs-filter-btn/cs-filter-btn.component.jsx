import React  from 'react';
import { block } from 'bem-cn';
import PropTypes from 'prop-types';



const CSFilterBtn = ({item, handlerAction}) => {
    const mod = item.checked ? 'active' : null
    const sp = block('csearch-page');
    const i = block('icon');
    return (

        <button
            className={sp("filter-btn", {mod})}
            type="button"
            onClick={(e) =>{handlerAction(item.name)}}
            value={item.name}
        >
        <div className={sp("filter-btn-icon")} value={item.name}>
            { item.checked
                ? <div className={i({checked: true})}></div>
                : <div className={i({unchecked: true})}></div>
            }
        </div>
        <div className={sp("filter-btn-text")} value={item.name}>{item.name}</div>

        </button>

    )

}

CSFilterBtn.propTypes = {
    /**
     * Is this the principal call to action on the page?
     */
    primary: PropTypes.bool,
    /**
     * What background color to use
     */
    backgroundColor: PropTypes.string,
    /**
     * How large should the button be?
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Button contents
     */
    name: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
  };

  CSFilterBtn.defaultProps = {
    backgroundColor: null,
    primary: false,
    size: 'medium',
    onClick: undefined,
  };

export default CSFilterBtn;

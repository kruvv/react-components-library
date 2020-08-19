import React, { useState } from 'react';
import { block } from 'bem-cn';
import PropTypes from 'prop-types';

/**
 * This component displays the search form
 *
 * @param {string} placeholder
 * @param {string} nameClearBtn
 * @param {string} nameSubmitBtn
 * @param {@function} handlerSubmit
 */
const CSearchForm = ({
    placeholder,
    nameClearBtn,
    nameSubmitBtn,
    handlerSubmit,
}) => {

    const [searchText, setSearchText] = useState("");
    let [mod, setMod] = useState("disabled");
    const fc = block('flex-container');
    const sp = block('csearch-page');

    /**
     * This function handle press button sending search form.
     *
     * @function searchButtonOnClick
     */
    const searchButtonOnClick = () => {
        if(mod === '') handlerSubmit(searchText);
	}

    /**
     *This function handle press key Enter in search form.
     *
     * @function textFieldOnKeyPress
     * @param {event} e - event on press key
     */
	const textFieldOnKeyPress = (e) => {
		if (e.key === "Enter" && mod === '') {
            handlerSubmit(searchText);
		}
    }

    const handleChange = (event) => {
        const text = event.target.value;
        text.length < 3 ? setMod('disabled') : setMod('');
        setSearchText(text);
    }

    const handleClearBtn = () => {
        setMod('disabled');
        setSearchText("");
    }

    return (
        <div className={fc('flex-item').mix(fc({horizontal: true}),sp('search-text-field')).toString()}>
            <div className={fc('flex-item').mix(fc({horizontal: true}), sp('search-frame')).toString()}>
                <input
                    className={sp("search-string").mix(fc('flex-item')).toString()}
                    placeholder={placeholder}
                    value={searchText}
                    pattern=".{3,}"
                    required
                    title="Запрос должен содержать не менее трех символов"
                    autoFocus
                    type="text"
                    onKeyPress={textFieldOnKeyPress}
                    onChange={handleChange}
                />
                <input
                    className={sp("search-clear-button").mix(fc('flex-item', {auto: true})).toString()}
                    type="button"
                    value={nameClearBtn}
                    onClick={handleClearBtn}
                />
            </div>
            <input
                className={sp("search-button", {mod}).mix(fc('flex-item', {fixed: true})).toString()}
                type="button"
                value={nameSubmitBtn}
                onClick={searchButtonOnClick}
            />
        </div>
    );

}

CSearchForm.propTypes = {
    placeholder: PropTypes.string,
    nameClearBtn: PropTypes.string,
    nameSubmitBtn: PropTypes.string,
    handlerSubmit: PropTypes.func.isRequired,
};

CSearchForm.defaultProps = {
    placeholder: "",
    nameClearBtn: "x",
    nameSubmitBtn: "Найти",
    handlerSubmit: () => {},
};

export default CSearchForm;

import React from 'react';
import Parser from 'html-react-parser';


/**
 * This component of the SL card field with highlighting of the found text.
 *
 * @param {string} part_word - value for RegExp.
 * @param {string} search_string - line in which to find matches.
 * @param {string} name_field - comment field name.
 */
const HighlitedText = ({ part_word, search_string, name_field }) => {

    const value = part_word.trim().replace(/[._*+?^${}()|[\]\\]/g, '\\$&');
    const val_reg_exp = new RegExp(value, "ig");


    const search_string_input = search_string !== null ? search_string : '';
    let search_string_result = searchMatch(search_string_input, val_reg_exp);


    /**
     * This function of finding the position of the match of the entered word with the input string.
     *
     * @function searchMatch
     * @param {string} item - input string.
     * @param {string} target - value RegExp.
     * @return {string} - if target founded, returns the marked line.
     */
    function searchMatch(item, target) {
        let result = item.replace(target, `<mark>$&</mark>`);

        return ( <div>{Parser(result)}</div>);
    }

    return (
            <div>
            {name_field? <div className="higlited-text__name-field">{name_field}</div>:null}
                <div className="highlited-text__search-string-result">{search_string_result}</div>
            </div>
    );
}

export default HighlitedText;

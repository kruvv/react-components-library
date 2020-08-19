import React, {Fragment} from 'react';
import { block } from 'bem-cn';
import HighlitedText from '../highlited-text/highlited-text.component';

/**
 * This component displays the found match in cards.
 *
 * @param {*} param
 */
const CSListCard = ({
    rl_id,
    rl_name_short,
    rl_number_text,
    rl_comment_one,
    rl_comment_two,
    rl_comment_three,
    part_word,
    operations,
    isComment_main,
    isComment_rlo,
    isComment_rlo_t,
    isSearchName
}) => {

    const fc = block('flex-container');
    const sp = block('csearch-page');

    /**
     * This function checks to show data.
     *
     * @function isShowData
     * @param {boolean} flagCheckBox - filter control element state.
     * @param {string} stringText - string in which matches are searched.
     * @param {string} partWord - value for RegExp.
     */
    const isShowData = (flagCheckBox, stringText, partWord) => {
        return (
            isCheckFlag(flagCheckBox) && stringText !== null && stringText.toUpperCase().includes(partWord.toUpperCase())
        )
    }

    /**
     *  This function returns the boolean state of the control.
     *
     * @function isCheckFlag
     * @param {string | number} flag - state filter button
     */
    const isCheckFlag = (flag) => {
        return flag === 1 ? true : false;
    }

    return (
            <div className={sp("card")} onDoubleClick={()=>{window.open(`/assembler/rlcontent/${rl_id}`, "_blank")}}>
                <div className={sp("card-header").mix(fc({horizontal: true}))}>
                    <div className={sp("card-list-number").mix(fc("flex-item", {fixed: true}))}>
                        <HighlitedText
                            search_string={rl_number_text}
                            part_word={part_word}
                        />
                    </div>
                    <div className={sp("card-list-name").mix(fc("flex-item"))}>
                        {isCheckFlag(isSearchName)
                            ?   <HighlitedText
                                    search_string={rl_name_short}
                                    part_word={part_word}
                                />
                            :   <HighlitedText
                                    search_string={rl_name_short}
                                    part_word=''
                                />
                        }
                    </div>
                </div>


                { isShowData(isComment_main, rl_comment_one, part_word)
                    ?   <Fragment>
                            <div className={sp("comment-caption")}>Комментарий №1</div>
                            <div className={sp("comment")}>
                            <HighlitedText
                                search_string={rl_comment_one}
                                part_word={part_word}
                            />
                            </div>
                        </Fragment>
                    :   null
                }
                { isShowData(isComment_main, rl_comment_two, part_word)
                    ?   <Fragment>
                            <div className={sp("comment-caption")}>Комментарий №2</div>
                            <div className={sp("comment")}>
                            <HighlitedText
                                search_string={rl_comment_two}
                                part_word={part_word}
                            />
                            </div>
                        </Fragment>
                    :   null
                }
                { isShowData(isComment_main, rl_comment_three, part_word)
                    ?   <Fragment>
                            <div className={sp("comment-caption")}>Комментарий №3</div>
                            <div className={sp("comment")}>
                            <HighlitedText
                                search_string={rl_comment_three}
                                part_word={part_word}
                            />
                            </div>
                        </Fragment>
                    :   null
                }


                {operations.map((item, index) => {
                    const {rlo_comment, rlo_comment_t, rlo_number} = item;
                    const showOperation =
                       (rlo_comment_t !== null && rlo_comment_t.toUpperCase().includes(part_word.toUpperCase())) ||
                       (rlo_comment !== null && rlo_comment.toUpperCase().includes(part_word.toUpperCase()));

                    if(!showOperation) return null;

                    if(isCheckFlag(isComment_rlo) || isCheckFlag(isComment_rlo_t)) {
                    return(
                        <div className={sp("group-comments")} key={index}>
                            <div className={sp("operation-number")}>Операция №{rlo_number}</div>

                                { isShowData(isComment_rlo, rlo_comment, part_word)
                                    ?   <Fragment>
                                            <div className={sp("operation-comment-caption")}>Комментарий оператора</div>
                                            <div className={sp("operation-comment")}>
                                                <HighlitedText
                                                    search_string={rlo_comment}
                                                    part_word={part_word}
                                                />
                                            </div>
                                        </Fragment>
                                    :   null
                                }
                                { isShowData(isComment_rlo_t, rlo_comment_t, part_word)
                                    ?<Fragment>
                                        <div className={sp("operation-comment-caption")}>Комментарий технолога</div>
                                        <div className={sp("operation-comment")}>
                                            <HighlitedText
                                                search_string={rlo_comment_t}
                                                part_word={part_word}
                                            />
                                        </div>
                                        </Fragment>
                                    :   null
                                }
                        </div>
                    )}
                    return null;
            })
          }
            </div>

    );
};

export default CSListCard;

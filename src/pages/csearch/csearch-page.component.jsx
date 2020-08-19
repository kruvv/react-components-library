import React, { Component, Fragment } from 'react';
import CSGroupFilterBtn from '../../components/cs-group-filter-btn/cs-group-filter-btn.component';
import CSearchForm from '../../components/csearch-form/csearch-form.component';
import CSListCard from "../../components/cs-list-card/cs-list-card.component";
import ProgressBar from "../../components/progressbar/progress-bar.component";

import './csearch-page.styles.scss';

import { block } from 'bem-cn';
import ThemeSwitch from '../../components/theme-switch/theme-switch.component';

const BASE_URL = "/assembler";
const PATH = "/quicksearch/content";
const FILTER = "filter=";
const SEARCH_RL_NUMBER = "search_rl_number=";
const SEARCH_NAME = "search_name=";
const SEARCH_COMMENTS = "search_comments=";
const SEARCH_SLI = "search_sli=";
const SEARCH_SLII = "search_slii=";
const SEARCH_ESL = "search_esl=";
const SEARCH_RLO_C = "search_rlo_com=";
const SEARCH_RLO_C_T = "search_rlo_com_t=";

const DOCUMENT_TITLE = "Поиск сопроводительного листа по содержимому";
const PLACEHOLDER = "Введите текст для поиска";
const NAME_CLEAR_BUTTON = "x";
const NAME_SUBMIT_BUTTON = "Найти";
const PAGE_SIZE = 30;

class CSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultData: [],
            filterGroupBtn: [
                {nameGroup: "Тип листа",
                 paramFilterBtn:
                    [
                        { name: "СЛИ", checked: true },
                        { name: "СЛИИ", checked: true },
                        { name: "ЭСЛ", checked: true },
                    ]
				},
                {nameGroup: "Лист",
                 paramFilterBtn:
                    [
                        { name: "Номер", checked: true },
                        { name: "Название", checked: true },
                    ]
                },

                {nameGroup: "Комментарии",
                 paramFilterBtn:
                    [
                        { name: "Листа", checked: true },
                        { name: "Оператора", checked: true },
                        { name: "Технолога", checked: true },
                    ]
                }
            ],
            search_rl_number: "",
            search_name: "",
            search_sli: "",
            search_slii: "",
            search_esl: "",
            search_comments: "",
            search_rlo_com: "",
            search_rlo_com_t: "",
            part_word: "",
            match_word: "",
			loading: false,
			firstRun: true,
			containerWidth: 0,
			displayedItemsCount: 0
        };
        this.handlerOnClickBtn = this.handlerOnClickBtn.bind(this);
		this.handlerSubmitBtn = this.handlerSubmitBtn.bind(this);
		this.formatURL= this.formatURL.bind(this);
		this.checkedBoxNum = this.checkedBoxNum.bind(this);
		this.containerRef = React.createRef();
    }



    /**
	 * This function queries the data source.
	 *
	 * @function handlerOnClickBtn
	 * @param  {URL} url - source data.
	 * @return {Array} - array data.
	 */
    handlerOnClickBtn(nameBtn, index) {
			// console.log(nameBtn, index);
       const groupBtn = this.state.filterGroupBtn[index].paramFilterBtn;

       groupBtn.map((item) => {
            if(nameBtn !== item.name) return null;
            if(nameBtn === item.name && item.checked) {
                item.checked = false;
                const filterGroupBtn = [...this.state.filterGroupBtn];
                filterGroupBtn[index].paramFilterBtn.checked = item;
                this.setState({ filterGroupBtn });
            } else {
                item.checked = true;
                const filterGroupBtn = [...this.state.filterGroupBtn];
                filterGroupBtn[index].paramFilterBtn.checked = item;
                this.setState({ filterGroupBtn });
			}
			return null;
        })
    }

    /**
	 * This function generates a query string depending on the position of the checkboxes and the search query.
	 *
	 * @function formatURL
	 * @return {string} - url with params.
	 * @example GET http://localhost:8080/assembler/quicksearch/content?filter=11&search_rl_number=0&search_name=1&search_comments=1&search_sli=1&search_slii=1&search_esl=1&search_rlo_com=1&search_rlo_com_t=1
	 */
	formatURL = (text) => {
		let paramsObject = {};

		this.state.filterGroupBtn.map((item) => {
            if(item.paramFilterBtn) {
                item.paramFilterBtn.map((box) => {
                    if ("Номер" === box.name) {
						paramsObject.search_rl_number = this.checkedBoxNum(box.checked);
										}
                    if ("Название" === box.name) {
						paramsObject.search_name = this.checkedBoxNum(box.checked);
                    }
                    if ("Листа" === box.name) {
						paramsObject.search_comments = this.checkedBoxNum(box.checked);
                    }
                    if ("СЛИ" === box.name) {
						paramsObject.search_sli = this.checkedBoxNum(box.checked);
                    }
                    if ("СЛИИ" === box.name) {
						paramsObject.search_slii = this.checkedBoxNum(box.checked);
                    }
                    if ("ЭСЛ" === box.name) {
						paramsObject.search_esl = this.checkedBoxNum(box.checked);
                    }
                    if ("Оператора" === box.name) {
						paramsObject.search_rlo_com = this.checkedBoxNum(box.checked);
                    }
                    if ("Технолога" === box.name) {
						paramsObject.search_rlo_com_t = this.checkedBoxNum(box.checked);
					}
					return null;
                })
			}
			return null;
		});

		let url =
		`${BASE_URL}${PATH}?` +
		`${FILTER}${text}&` +
		`${SEARCH_RL_NUMBER}${paramsObject.search_rl_number}&` +
		`${SEARCH_NAME}${paramsObject.search_name}&` +
		`${SEARCH_COMMENTS}${paramsObject.search_comments}&` +
		`${SEARCH_SLI}${paramsObject.search_sli}&` +
		`${SEARCH_SLII}${paramsObject.search_slii}&` +
		`${SEARCH_ESL}${paramsObject.search_esl}&`+
		`${SEARCH_RLO_C}${paramsObject.search_rlo_com}&`+
		`${SEARCH_RLO_C_T}${paramsObject.search_rlo_com_t}`;

		return (
			{url: url, paramsObject:paramsObject}
		);
	};

	/**
	 * This function return number to enable a search query.
	 *
	 * @function checkedBoxNum
	 * @param {boolean} item - state checkbox.
	 * @return {number} - number to set in URL parameter.
	 */
	checkedBoxNum = (item) => {
		return item === true ? 1 : 0;
    };

    /**
	 * This function queries the data source.
	 *
	 * @function handlerClickButton
	 * @param  {URL} url - source data.
	 * @return {Array} - array data.
	 */
	handlerSubmitBtn = (searchText) => {

		this.setState({ loading: true }, () => {

		const urlData = this.formatURL(searchText);
			// console.log("URL: ", urlData);
		fetch(urlData.url)
			.then((response) => response.json())
			.then((json) => {
				let resultData = [];
				resultData = json;
				if(resultData[0] !== null) {
					this.setState({ resultData, loading: false, firstRun: false,  part_word: searchText,
						displayedItemsCount: resultData.length > PAGE_SIZE ? PAGE_SIZE : resultData.length,
						...urlData.paramsObject
					});
				} else {
					this.setState({ resultData: [], loading: false, firstRun: false , displayedItemsCount:0});
				}
			})
			.catch((error)=>{
				this.setState({  loading: false});
				console.log(error);
			});

		})

	};

	handleScroll = e => {

		let element = e.target;
		// console.log("scroll", element.scrollHeight - element.scrollTop , element.clientHeight);
		if (element.scrollHeight - element.scrollTop - 100 < element.clientHeight) {
			// console.log("end");
			this.setState({displayedItemsCount: this.state.displayedItemsCount+PAGE_SIZE });
		}
	};

	componentDidUpdate(prevProps, prevState) {
		const progressWidth = this.containerRef.current.offsetWidth - 5;
		if (prevState.containerWidth !== progressWidth) {
			this.setState({containerWidth: progressWidth});
		}
	};

    render() {

        const fc = block('flex-container');
        const sp = block('csearch-page');
		const {loading, firstRun, resultData, displayedItemsCount} = this.state;

        return (
            <div className={sp.mix(fc("flex-item")).mix(fc({vertical: true}))}>
				<div className={sp("header").mix(fc("flex-item",{fixed: true}), fc({horizontal: true}))}>
					<div className={fc("flex-item")}></div>
					<div className={sp("header-container").mix( fc("flex-item"), fc({horizontal: true}))}>

						<h2 className={sp("title").mix(fc("flex-item", {fixed: true}))}>
								{DOCUMENT_TITLE}
						</h2>
						<CSearchForm
							placeholder={PLACEHOLDER}
							nameClearBtn={NAME_CLEAR_BUTTON}
							nameSubmitBtn={NAME_SUBMIT_BUTTON}
							handlerSubmit={this.handlerSubmitBtn}
						/>
					</div>
					<div className={sp('theme-switch').mix(fc("flex-item"))}><ThemeSwitch /></div>
				</div>
				<div className={fc("flex-item", {fixed: true}).mix( fc({horizontal: true}))}>
					<div className={fc("flex-item")}></div>
					<div className={sp("filter").mix(fc({horizontal: false}))}>
						{this.state.filterGroupBtn.map((item, index) => {
								return (
									<div key={index + item.nameGroup} className={sp("group-filter-btn").mix(fc({horizontal: true}))}>
										<h4  className={sp("group-name")}>{item.nameGroup}</h4>
										<CSGroupFilterBtn
											optionsGroupBtn={item.paramFilterBtn}
											handlerAction={(event) => {
													this.handlerOnClickBtn((event), index)
											}}
										/>
									</div>
								)
							})
						}
					</div>
					<div className={fc("flex-item")}></div>
				</div>
				<div className={sp("result-outer").mix( fc("flex-item"),fc({horizontal: true}))} >

					<div className={fc("flex-item")}></div>
					<div className={!firstRun || (firstRun && loading)
							?	sp("result").mix( fc({vertical: true}))
							:	sp("result", {hidden: true}).mix( fc({vertical: true}))
							}
							ref={this.containerRef} >
							{!firstRun
								?  	<h4 className={sp("result-amount").mix(fc("flex-item", {fixed: true}))}>
										Результаты поиска ({resultData.length})
									</h4>
								: null
							}
							<div className={sp('search-result').mix(fc("flex-item", {scrollable: true}))} onScroll={this.handleScroll}>
								<ProgressBar visible={loading} width={this.state.containerWidth.toString() + "px"} />
									{ resultData.length!==0
										?	<Fragment>
												{resultData.slice(0, displayedItemsCount).map((item) => {
														return (
															<CSListCard
																key={item.id}
																{...item}
																part_word={this.state.part_word}
																isComment_main={this.state.search_comments}
																isComment_rlo={this.state.search_rlo_com}
																isComment_rlo_t={this.state.search_rlo_com_t}
																isSearchName={this.state.search_name}
															/>
														)
													})
												}
											</Fragment>
										: null
									}
									{/*resultData.length!==100 ? <div> Отобразить следующие 100 записей </div>: null*/}
							</div>
						</div>
					<div className={fc("flex-item")}></div>
				</div>
            </div>
        );
    }
}

export default CSearchPage;

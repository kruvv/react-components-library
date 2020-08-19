import React from "react";
import "./data-grid.styles.scss";
import DataGridRow from "./data-grid.row.component";
import DataGridHeader from "./data-grid.header.component";
import ProgressBar from "../progressbar/progress-bar.component";
import block from "bem-cn";


class DataGrid extends React.Component {
	static defaultProps = {
		url: undefined,
		data: [],
	};
	constructor(props) {
		super();
		this.containerRef = React.createRef();
		const defaultRowProps = {
			visible: true,
			width: "auto",
			type: "text",
		};

		this.state = {
			url: props.url,
			schema: props.schema.map((item) =>
				Object.assign({}, defaultRowProps, item)
			),
			data: props.data,
			loading: props.loading,
			error: undefined,
			containerWidth: 300
		};
	}

	componentDidMount() {
		
		if (this.state.url !== undefined) {
			this.setState({ loading: true });
			fetch(this.state.url)
				.then((response) => response.json())
				.then((items) => {
					console.log(items);
					this.setState({ data: items, loading: false, error: undefined });
				})
				.catch((error) => {
					console.error(error);
					this.setState({ data: [], loading: false, error: error });
				});
		} else this.setState({ data: [], loading: false, error: undefined });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.data !== this.props.data) {
			this.setState({data: this.props.data});
		}
		if (prevState.containerWidth !== this.containerRef.current.offsetWidth) {
			this.setState({containerWidth: this.containerRef.current.offsetWidth});
		}

	}

	render() {
		const dg = block("data-grid");
		const fc = block('flex-container');


		const columns = this.state.schema.filter((item) => {
			return item.visible === true;
		});
		const {loading} = this.props;
		const { data } = this.state;
		const progressWidth ="calc(100vw - " + (window.innerWidth - this.state.containerWidth + 2) + "px)";
		// console.log("loading" ,loading, data.length, progressWidth);
		return (

		<div className={ dg("inner")}  ref={this.containerRef } >
				<ProgressBar visible={loading} width={progressWidth}></ProgressBar>
				<table className={ dg("table", {root: true, stickyHeader: true})}>
					{data.length > 0 ? <DataGridHeader columns={columns} /> : null}
					<tbody className={dg("table-body", {root: true})}>
						{data.map((row, i) => {
							return (
								<DataGridRow
									row={row}
									columns={columns}
									key={row.id}
									showMenu={this.props.showMenu}
								></DataGridRow>
							);
						})}
					</tbody>
				</table>
				</div>
				
			
		);
	}
}

export default DataGrid;

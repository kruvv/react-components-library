import React from "react";
import block from "bem-cn";

class DataGridHeader extends React.Component {
	
	render() {
		const dg = block("data-grid");
		const { columns } = this.props;
		return (
			<thead className={dg("table-head", {root: true}) }>
		<tr className={dg("table-row", {root: true}) }>
					{columns.map((col, i) => {
						const tdInlineStyle = {
							width: col.width
						};
						return <th 
						className={dg("table-cell", {root: true, head: true, alignLeft:true, sizeSmall:true, stickyHeader:true })}
						style={tdInlineStyle} key={col.key}>{col.header}</th>;
					})}
				</tr>
			</thead>
		);
	}
}
export default DataGridHeader;

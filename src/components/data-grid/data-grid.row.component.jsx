import React from "react";
import block from "bem-cn";

class DataGridRow extends React.Component {
	constructor() {
			super();
			this.state={
				mouseX: null,
				mouseY: null,
			}
		}
	
	
		handleClick = event => {
			if(this.props.showMenu) {
				event.preventDefault();
				// alert ((event.clientX - 2),
				// ( event.clientY - 4));
				// this.setState({
				//   mouseX: event.clientX - 2,
				//   mouseY: event.clientY - 4,
				// });
				this.props.showMenu(event.clientX - 30, event.clientY - 20);
			}
		};
	
		render() {
			const dg = block("data-grid");
			const { row, columns } = this.props;

			return (
	
				<tr className={dg("table-row", {root:true })}
					onContextMenu={this.handleClick}
					>
					{columns.map((col, i) => {
	
						return (
							<td
								className={dg("table-cell", 
									{root: true, body: true, mainRowCell: true, alignLeft: true, textOverflow:col.type === "large-text" })
								}
								
								title={row[col.key]}
							>
								{col.type === "icon" ? (
									<span className="icon-span">
										<i className="far fa-clock" />
									</span>
								) : (
	
									col.type === "large-text" ? 
									(row[col.key])
									:
									(row[col.key])
								)}
							</td>
						);
					})}
				</tr>
			);
		}
	}
	
export default DataGridRow;

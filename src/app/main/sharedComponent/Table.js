import React from 'react';
import MaterialTable from 'material-table';
import ReactToPrint from 'react-to-print';
// import alertDialog from './AlertDialog';
import { REP_STATES, FLAT_UI } from '../../static';
import { withTranslation, Translation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			setOpen: false,
		};
		this.tableRef = React.createRef();
	}
	handleClickOpen = () => {
		this.setState({
			setOpen: true,
		});
	};

	handleClose = () => {
		this.setState({
			setOpen: false,
		});
	};

	// getStateColor(etat) {
	// 	switch (etat) {
	// 		case REP_STATES.NON_DEPOSED:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.DEPOSED_BY_CLIENT:
	// 			return FLAT_UI.alizarin;
	// 			break;
	// 		case REP_STATES.UNDER_DIAGNOSIS:
	// 			return FLAT_UI.alizarin;
	// 			break;
	// 		case REP_STATES.READY_TO_TRANSFER:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.DIAGNOSIS_ENDED:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.REPARATION_REJECTED:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.UNDER_REPARATION:
	// 			return FLAT_UI.alizarin;
	// 			break;
	// 		case REP_STATES.READY_TO_DELIVER:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.READY_TO_PICKUP:
	// 			return FLAT_UI.clouds;
	// 			break;
	// 		case REP_STATES.PICKEDUP_BY_CLIENT:
	// 			return FLAT_UI.clouds;
	// 			break;
	// 		case REP_STATES.PICKEDUP_BY_DELIVERY:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.REPAIRED:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		case REP_STATES.UNREPAIRED:
	// 			return FLAT_UI.clouds;
	// 			break;
	// 		case REP_STATES.TRANSFER_TO_SPECIALIST:
	// 			return FLAT_UI.alizarin;
	// 			break;
	// 		case REP_STATES.REQUEST_PIECE:
	// 			return FLAT_UI.sunFlower;
	// 			break;
	// 		default:
	// 			return FLAT_UI.clouds;
	// 	}
	// }
	render() {
		const props = this.props;
		let actions = [
			(rowData) =>
				props.title != 'Suivi Plannings'
					? {
							icon: 'edit',
							tooltip: 'edit User',
							hidden: rowData.length >= 2,
							onClick: (event, rowData) => {
								props.history.push(props.routeEdit + '/' + rowData[0]._id);
							},
					  }
					: '',
			props.title != 'Suivi Plannings'
				? {
						tooltip: 'Remove All Selected elements',
						icon: 'delete',
						onClick: (evt, oldData) =>
							new Promise((resolve) => {
								swal({
									title: this.props.t('stock.sure'),
									text: this.props.t('stock.warnning'),

									icon: 'warning',
									buttons: {
										cancel: {
											text: this.props.t('stock.cancel'),
											value: false,
											visible: true,
											className: '',
											closeModal: true,
										},
										confirm: {
											text: this.props.t('stock.confirm'),
											value: true,
											visible: true,
											className: '',
											closeModal: true,
										},
									},
									dangerMode: true,
								}).then((willDelete) => {
									if (willDelete) {
										oldData.forEach((element) => {
											props.delete(element._id);
										});
									} else {
										swal(this.props.t('stock.cancelOperation'));
									}
								});
							}),
				  }
				: '',
			props.sales &&
				((rowData) => ({
					icon: 'more',
					tooltip: 'show more',
					hidden: rowData.length >= 2,
					onClick: (event, rowData) => {
						props.history.push(props.showMore + '/' + rowData[0]._id);
					},
				})),
			// {
			//   icon: "print",
			//   tooltip: "print",
			//   isFreeAction: true,
			//   onClick: (event, data) => {

			//     return <ReactToPrint content={props.data} />;
			//   },
			// },
		];
		if (props.actions) {
			if (props.rewriteAction) {
				actions = props.actions;
			} else {
				actions = actions.concat(props.actions);
			}
		}

		return (
			<>
				<MaterialTable
					title={props.title}
					columns={props.columns}
					data={props.data}
					style={props.style ? props.style : {}}
					options={{
						search: false,
						pageSize: props.pageSize ? props.pageSize : 10,
						pageSizeOptions: [5, 10, 20, 50, 100, 200, 500],
						exportCsv: this.props.exportCsv ? this.props.exportCsv : undefined,
						selection: props.countryButtonSelect ? false : true,
						filtering: true,
						paging: true,
						exportButton:
							this.props.exportButton !== undefined
								? this.props.exportButton
								: true,
						columnsButton: true,
						grouping: false,
						// rowStyle: props.rowStyle
						// 	? props.rowStyle
						// 	: (rowData) => {
						// 			return {
						// 				backgroundColor: this.getStateColor(rowData.etatLivraison),
						// 			};
						// 	  },
					}}
					actions={props.countryButtonSelect ? '' : actions}
				/>
			</>
		);
	}
}

export default withTranslation()(withRouter(Table));

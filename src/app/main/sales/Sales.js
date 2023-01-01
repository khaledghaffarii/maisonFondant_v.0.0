import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import env from '../../static';
import SalesTable from './SalesTable';
import { FuseChipSelect } from '@fuse';
import Request from '../../utils/Request';

const styles = (theme) => ({
	layoutRoot: {},
});
class Sales extends Component {
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
			recipeYear: '',
			recipeMonth: '',
			recipeQuarter: '',
		};
	}
	getInitialState() {
		return { selectValue: 'Radish' };
	}

	handleChange = (e) => {
		this.setState({ selectValue: e.target.value });
	};
	async componentDidMount() {
		let urlYear = env.outputs.year;
		let urlMonth = env.outputs.month;

		try {
			const result = await this.request.getAll(urlYear);
			const response = await this.request.getAll(urlMonth);

			result.data.forEach((element) => {
				this.setState({ recipeYear: element['Total Recipe'] });
			});
			response.data.forEach((element) => {
				this.setState({ recipeMonth: element['totalPurchase'] });
			});
		} catch (error) {
			console.log(
				'🚀 ~ file: Sales.js:36 ~ Sales ~ componentDidMount ~ error',
				error
			);
		}
	}
	render() {
		var message = 'You selected ' + this.state.selectValue;
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignContent: 'space-between',
							width: 1000,
						}}>
						<div style={{ marginTop: 45 }}>
							<select
								value={this.state.selectValue}
								style={{
									paddingTop: 10,
									paddingRight: 20,
									paddingLeft: 20,
									paddingBottom: 10,
									borderRadius: 20,
								}}
								onChange={this.handleChange}>
								<option value='year'>Year</option>
								<option value='month'>Month</option>
							</select>
						</div>
						<div
							style={{
								position: 'absolute',
								right: 300,
								marginTop: 20,
								display: 'flex',
								flexDirection: 'row',
							}}>
							<p
								style={{
									fontFamily: 'serif',
									fontSize: 25,
								}}>
								Recipe :
							</p>
							<p
								style={{
									fontFamily: 'cursive',
									fontSize: 25,
									marginLeft: 10,
								}}>
								{' '}
								{this.state.selectValue == 'year'
									? this.state.recipeYear + ' DT'
									: this.state.recipeMonth + ' DT'}
							</p>
						</div>
					</div>
				}
				content={
					<div className='p-24'>
						<SalesTable />
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(Sales))
);

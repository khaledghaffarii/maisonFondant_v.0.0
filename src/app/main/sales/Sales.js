import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import env from '../../static';
import SalesTable from './SalesTable';
import { FuseChipSelect } from '@fuse';
import Request from '../../utils/Request';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './picker.css';
const styles = (theme) => ({
	layoutRoot: {},
});
const months = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 },
];
class Sales extends Component {
	request = new Request();
	constructor(props) {
		super(props);
		this.state = {
			selectValue: 'year',
			recipeYear: 0,
			recipeMonth: '',
			recipeQuarter: '',
			yearSection: new Date().getFullYear(),
			selectedMonth: 1,
			startDate: new Date(),
			currentYear: new Date().getFullYear(),
			twoYearsFromNow: new Date().getFullYear() - 2,
			oneYearsFromNow: new Date().getFullYear() - 1,
			selectedYear: new Date().getFullYear(),
			recipeDays: '',
			showRecipe: false,
		};
	}
	handleChangeDate = (date) => {
		this.setState({
			startDate: date,
		});
	};
	handleChangeSelctedYear = async (event) => {
		try {
			this.setState({ selectedYear: event.target.value });

			const result = await this.request.getAll(
				`https://api.gesteasyapp.com/outputs/yearly_recipe?year=${event.target.value}`
			);

			if (result.data.length > 0) {
				result.data.forEach((element) => {
					this.setState({ recipeYear: element['Total Recipe'] });
				});
			} else {
				this.setState({ recipeYear: 0 });
			}
			const response = await this.request.getAll(
				`https://api.gesteasyapp.com/outputs/monthly_recipe?year=${this.state.selectedYear}&month=${this.state.selectedMonth}`
			);

			if (response.data.length > 0) {
				response.data.forEach((element) => {
					this.setState({ recipeMonth: element['totalPurchase'] });
				});
			} else {
				this.setState({ recipeMonth: 0 });
			}
		} catch (error) {
			console.log(
				'🚀 ~ file: Sales.js:72 ~ Sales ~ handleChangeSelctedYear= ~ error',
				error
			);
		}
	};
	getInitialState() {
		return { selectValue: 'Radish' };
	}
	handleChangeMonth = async (event) => {
		this.setState({
			selectedMonth: event.target.value,
		});
		const response = await this.request.getAll(
			`https://api.gesteasyapp.com/outputs/monthly_recipe?year=${this.state.selectedYear}&month=${event.target.value}`
		);
		console.log(
			'🚀 ~ file: Sales.js:89 ~ Sales ~ handleChangeMonth= ~ response',
			response
		);
		console.log(
			'🚀 ~ file: Sales.js:89 ~ Sales ~ handleChangeMonth= ~ this.state.selectedYear',
			this.state.selectedYear
		);
		if (response.data.length > 0) {
			response.data.forEach((element) => {
				this.setState({ recipeMonth: element['totalPurchase'] });
			});
		} else {
			this.setState({ recipeMonth: 0 });
		}
	};
	handelClickRecipi = () => {
		this.setState({
			showRecipe: true,
		});
	};
	handleChange = (e) => {
		this.setState({ selectValue: e.target.value });
	};
	handleChangeYearSection = (e) => {
		this.setState({ yearSection: e.target.value });
	};
	async componentDidMount() {
		try {
			const result = await this.request.getAll(
				`https://api.gesteasyapp.com/outputs/yearly_recipe?year=${this.state.selectedYear}`
			);

			if (result.data.length > 0) {
				result.data.forEach((element) => {
					this.setState({ recipeYear: element['Total Recipe'] });
				});
			} else {
				this.setState({ recipeYear: 0 });
			}
			const response = await this.request.getAll(
				`https://api.gesteasyapp.com/outputs/monthly_recipe?year=${this.state.selectedYear}&month=${this.state.selectedMonth}`
			);
			console.log(
				'🚀 ~ file: Sales.js:124 ~ Sales ~ componentDidMount ~ this.state.selectedYear',
				this.state.selectedYear
			);

			response.data.forEach((element) => {
				this.setState({ recipeMonth: element['totalPurchase'] });
			});
			// const query = await this.request.getAll(
			// 	`http://34.198.216.160:8000/outputs/daily_recipe?date=${formattedDate}`
			// );
			// query.data.forEach((element) => {
			// 	console.log(
			// 		'🚀 ~ file: Sales.js:104 ~ Sales ~ query.data.forEach ~ element',
			// 		element
			// 	);
			// 	//this.setState({ recipeDays: element['totalPurchase'] });
			// });
		} catch (error) {
			console.log(
				'🚀 ~ file: Sales.js:36 ~ Sales ~ componentDidMount ~ error',
				error
			);
		}
	}
	render() {
		const { currentYear, twoYearsFromNow, selectedYear, oneYearsFromNow } =
			this.state;
		const years = [currentYear, twoYearsFromNow, oneYearsFromNow];
		var message = 'You selected ' + this.state.selectValue;
		const { classes } = this.props;
		const formattedNumberMonth = this.state.recipeMonth.toLocaleString(
			'fr-TN',
			{
				style: 'currency',
				currency: 'TND',
			}
		);
		const formattedNumberYear = this.state.recipeYear.toLocaleString('fr-TN', {
			style: 'currency',
			currency: 'TND',
		});
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
							width: '100%',
						}}>
						{!this.state.showRecipe ? (
							<button
								style={{
									backgroundColor: '#9b5700',
									color: 'white',
									height: 38,
									width: 150,
									marginTop: 50,
									padding: 10,
									borderRadius: '10px',
									borderColor: '#9b5700',
								}}
								onClick={this.handelClickRecipi}>
								Show Total Rcipe
							</button>
						) : (
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
										<option value='day'>Day</option>
									</select>
									{this.state.selectValue == 'year' ||
									this.state.selectValue == 'month' ? (
										<select
											style={{
												paddingTop: 10,
												paddingRight: 20,
												paddingLeft: 20,
												paddingBottom: 10,
												borderRadius: 20,
												marginLeft: 20,
											}}
											value={selectedYear}
											onChange={this.handleChangeSelctedYear}>
											{years.map((year, index) => (
												<option value={year} key={index}>
													{year}
												</option>
											))}
										</select>
									) : (
										''
									)}
									{this.state.selectValue == 'month' ? (
										<select
											style={{
												paddingTop: 10,
												paddingRight: 20,
												paddingLeft: 20,
												paddingBottom: 10,
												borderRadius: 20,
												marginLeft: 20,
											}}
											defaultInputValue={1}
											value={this.state.selectedMonth}
											onChange={(event) => this.handleChangeMonth(event)}>
											{months.map((month) => (
												<option value={month.value}>{month.label}</option>
											))}
										</select>
									) : (
										''
									)}
									{this.state.selectValue == 'day' ? (
										<DatePicker
											className='date-picker'
											selected={this.state.startDate}
											onChange={this.handleChangeDate}
											dateFormat='dd/MM/yyyy'
										/>
									) : (
										''
									)}
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
											fontFamily: 'serif',
											fontSize: 25,
											marginLeft: 10,
										}}>
										{' '}
										{this.state.selectValue == 'year'
											? this.state.recipeYear
											: this.state.recipeMonth}{' '}
										DT
									</p>
								</div>
							</div>
						)}

						<TableHeader
							addRoute='/newSales'
							buttonText={this.props.t('Add Sales')}
						/>
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
// import React, { useState, useEffect } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';
// import { FusePageCarded } from '@fuse';
// import TableHeader from '../sharedComponent/TableHeader';
// import { withRouter } from 'react-router-dom';
// import { withTranslation } from 'react-i18next';
// import env from '../../static';
// import SalesTable from './SalesTable';
// import { FuseChipSelect } from '@fuse';
// import Request from '../../utils/Request';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './picker.css';
import { Alert } from '@material-ui/lab/Alert';

// const styles = (theme) => ({
// 	layoutRoot: {},
// });

// const months = [
// 	{ label: 'January', value: 1 },
// 	{ label: 'February', value: 2 },
// 	{ label: 'March', value: 3 },
// 	{ label: 'April', value: 4 },
// 	{ label: 'May', value: 5 },
// 	{ label: 'June', value: 6 },
// 	{ label: 'July', value: 7 },
// 	{ label: 'August', value: 8 },
// 	{ label: 'September', value: 9 },
// 	{ label: 'October', value: 10 },
// 	{ label: 'November', value: 11 },
// 	{ label: 'December', value: 12 },
// ];

// const Sales = ({ classes, t, history }) => {
// 	const request = new Request();

// 	const [selectValue, setSelectValue] = useState('year');
// 	const [recipeYear, setRecipeYear] = useState('');
// 	const [recipeMonth, setRecipeMonth] = useState('');
// 	const [recipeQuarter, setRecipeQuarter] = useState('');
// 	const [yearSection, setYearSection] = useState(new Date().getFullYear());
// 	const [selectedMonth, setSelectedMonth] = useState(1);
// 	const [startDate, setStartDate] = useState(new Date());
// 	const [currentYear] = useState(new Date().getFullYear());
// 	const [twoYearsFromNow] = useState(new Date().getFullYear() - 2);
// 	const [oneYearsFromNow] = useState(new Date().getFullYear() - 1);
// 	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// 	const [recipeDays, setRecipeDays] = useState('');
// 	const [showRecipe, setShowRecipe] = useState(false);

// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const result = await request.getAll(
// 					`https://api.gesteasyapp.com/outputs/yearly_recipe?year=${selectedYear}`
// 				);
// 				console.log(
// 					'🚀 ~ file: Sales.js:84 ~ Sales ~ componentDidUpdate ~ this.state.selectedYear',
// 					selectedYear
// 				);
// 				result.data.forEach((element) => {
// 					setRecipeYear(element['Total Recipe']);
// 				});
// 				const response = await request.getAll(
// 					`https://api.gesteasyapp.com/outputs/monthly_recipe?year=${selectedYear}&month=${selectedMonth}`
// 				);
// 				response.data.forEach((el) => {
// 					setRecipeMonth(el['Total Recipe']);
// 				});
// 				const res = await request.getAll(
// 					`https://api.gesteasyapp.com/outputs/quarterly_recipe?year=${selectedYear}`
// 				);
// 				res.data.forEach((el) => {
// 					setRecipeQuarter(el['Total Recipe']);
// 				});
// 			} catch (error) {
// 				console.log(
// 					'🚀 ~ file: Sales.js:85 ~ Sales ~ componentDidUpdate ~ error',
// 					error
// 				);
// 			}
// 		})();
// 	}, [selectedYear, selectedMonth, request]);

// 	const handleChangeDate = (date) => {
// 		setStartDate(date);
// 	};

// 	const handleChangeSelctedYear = (event) => {
// 		setSelectedYear(event.target.value);
// 	};

// 	const getInitialState = () => {
// 		return { selectValue: 'Radish' };
// 	};

// 	const handleChangeMonth = (event) => {
// 		setSelectedMonth(event.target.value);
// 	};

// 	const handelClickRecipi = () => {
// 		setShowRecipe(true);
// 	};

// 	const handleChange = (e) => {
// 		setSelectValue(e.target.value);
// 	};

// 	const handleChangeYearSection = (e) => {
// 		setYearSection(e.target.value);
// 	};

// 	return (
// 		<div className={classes.layoutRoot}>
// 			<FusePageCarded
// 				header={
// 					<TableHeader
// 						t={t}
// 						selectValue={selectValue}
// 						years={[currentYear, oneYearsFromNow, twoYearsFromNow, yearSection]}
// 						months={months}
// 						selectedMonth={selectedMonth}
// 						selectedYear={selectedYear}
// 						handleChangeYearSection={handleChangeYearSection}
// 						handleChangeMonth={handleChangeMonth}
// 						handleChangeSelctedYear={handleChangeSelctedYear}
// 						handleChange={handleChange}
// 					/>
// 				}
// 				content={
// 					<SalesTable
// 						t={t}
// 						selectValue={selectValue}
// 						startDate={startDate}
// 						handleChangeDate={handleChangeDate}
// 						recipeYear={recipeYear}
// 						recipeMonth={recipeMonth}
// 						recipeQuarter={recipeQuarter}
// 						recipeDays={recipeDays}
// 						showRecipe={showRecipe}
// 					/>
// 				}
// 				innerScroll
// 			/>
// 		</div>
// 	);
// };

// export default withTranslation('translation')(
// 	withStyles(styles, { withTheme: true })(withRouter(Sales))
// );

import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { FuseChipSelect } from '@fuse';
import BuildIcon from '@material-ui/icons/Build';
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';
import PersonIcon from '@material-ui/icons/Person';
import Store from '@material-ui/icons/Store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './picker.css';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
//import dashboardStyle from '../../../../assets/jss/material-dashboard-react/views/dashboardStyle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Typography from '../../../components/Typography/Muted';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import Container from '@material-ui/core/Container';
import Table from '../../../components/Table/Table.jsx';

import Card from '../../../components/Card/Card.jsx';
import CardHeader from '../../../components/Card/CardHeader.jsx';
import CardIcon from '../../../components/Card/CardIcon.jsx';
import CardBody from '../../../components/Card/CardBody.jsx';
import CardFooter from '../../../components/Card/CardFooter.jsx';
import Request from '../../utils/Request';
import { REP_STATES, REP_LABELS } from '../../static';
import { statisticChart } from '../../../variables/charts';
import { statisticChartFr } from '../../../variables/charts';
import { withTranslation, Translation } from 'react-i18next';
import env from '../../static';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		width: 200,
	},
}));
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
class recipe extends React.Component {
	request = new Request();

	constructor(props) {
		super(props);
		let i = 0;
		// const suggestionsEtat = Object.keys(REP_STATES).map((key) => {
		// 	i++;
		// 	return {
		// 		key: i,
		// 		value: REP_STATES[key],
		// 		label: REP_LABELS[key],
		// 	};
		// });
		this.state = {
			selectValue: 'year',
			recipeYear: 0,
			recipeMonth: '',
			recipeQuarter: '',
			yearSection: new Date().getFullYear(),
			selectedMonth: 1,
			startDates: new Date(),
			currentYear: new Date().getFullYear(),
			twoYearsFromNow: new Date().getFullYear() - 2,
			oneYearsFromNow: new Date().getFullYear() - 1,
			selectedYear: new Date().getFullYear(),
			recipeDays: '',
			showRecipe: false,
			nbrRep: {},
			nbrTotalFb: {},
			nbrTotal: {},
			nbrCltChatbot: {},
			nbrCategories: {},
			nbrBoutiques: {},
			nbrB2B: {},
			tRepairers: {
				labels: [],
				data: [],
			},
			tRepCat: {
				labels: [],
				data: [],
			},
			tBoutique: {
				labels: [],
				data: [],
			},

			startDate: {
				year: '2017',
				month: '10',
				day: '3',
			},
			endDate: {
				y: new Date().getFullYear(),
				m: new Date().getMonth() + 1,
				d: new Date().getDate(),
			},
			etat: this.props.etat,
			_id: this.props._id,
			//suggestionsEtat,
			selectedState: 'Réparé',
		};

		this.handleChangedStartDate = this.handleChangedStartDate.bind(this);
		this.handleChangedEndDate = this.handleChangedEndDate.bind(this);
		this.handleChangedData = this.handleChangedData.bind(this);
		this.handleChangedEtat = this.handleChangedEtat.bind(this);
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
	handleChangedEtat(e) {
		this.setState({
			...this.state,
			selectedState: e.value,
		});
	}

	handleChangedStartDate(e) {
		this.setState({
			...this.state,
			startDate: {
				year: new Date(e.target.value).getFullYear(),
				month: new Date(e.target.value).getMonth() + 1,
				day: new Date(e.target.value).getDate(),
			},
		});
	}
	handleChangedEndDate(e) {
		this.setState({
			...this.state,
			endDate: {
				y: new Date(e.target.value).getFullYear(),
				m: new Date(e.target.value).getMonth() + 1,
				d: new Date(e.target.value).getDate(),
			},
		});
	}

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
	async handleChangedData(e) {
		e.preventDefault();
		try {
			//const url = 'http://localhost:5000/team-api/v1/statistiques';
			const url = env.baseUrl + 'statistiques';

			const data = {
				year: new Date().getFullYear(),
			};
			const dataInt = {
				selectedState: this.state.selectedState,
				startDate: this.state.startDate,
				endDate: this.state.endDate,
			};

			/* get data for global statistique */
			const res0 = await this.request.getCltStat(url, data);
			statisticChart.data.series = [res0.data.CltFB];

			/* get data for boutiques statistique */
			const res1 = await this.request.getStatBoutiques(url, dataInt);
			const tab0 = [];
			const tab1 = [];
			for (var i = 0; i < res1.data.length; i++) {
				tab0[i] = res1.data[i].name;
				tab1[i] = res1.data[i].total;
			}
			this.setState({ tBoutique: { labels: tab0, data: [tab1] } });

			/* get data for count facebook members  */
			const res2 = await this.request.getTotalCltFB(url, dataInt);
			this.setState({ nbrTotalFb: { nbr: res2.data } });

			/* get data for total reparations */

			const res3 = await this.request.getTotal(url, dataInt);
			this.setState({ nbrTotal: { nbr: res3.data } });

			/* get data for chatbot client*/
			const res4 = await this.request.getCltChatbot(url, dataInt);
			this.setState({ nbrCltChatbot: { nbr: res4.data } });

			const res5 = await this.request.getTotalBoutiques(url, dataInt);
			this.setState({ nbrBoutiques: { nbr: res5.data } });

			/* get data for reparation by categories*/
			const res7 = await this.request.getStatRepCat(url, dataInt);
			const tabrepcap0 = [];
			const tabrepcap1 = [];
			for (var i = 0; i < res7.data.length; i++) {
				tabrepcap0[i] = res7.data[i].name;
				tabrepcap1[i] = res7.data[i].total;
			}
			this.setState({ tRepCat: { labels: tabrepcap0, data: [tabrepcap1] } });

			/* get data for Repairers*/
			const res8 = await this.request.getStatReparateurs(url, dataInt);

			const tabRepa0 = [];
			const tabRepa1 = [];
			for (var i = 0; i < res8.data.length; i++) {
				tabRepa0[i] = res8.data[i].fname.concat(' ', res8.data[i].lname);
				tabRepa1[i] = res8.data[i].total;
			}

			this.setState({ tRepairers: { labels: tabRepa0, data: [tabRepa1] } });
		} catch (e) {
			alert(e);
		}
	}

	render() {
		const { currentYear, twoYearsFromNow, selectedYear, oneYearsFromNow } =
			this.state;
		const years = [currentYear, twoYearsFromNow, oneYearsFromNow];
		const props = this.props;
		const { classes } = this.props;
		return (
			<Container fixed>
				<div className='w-full'>
					<br />
					<br />

					<GridContainer align='center'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignContent: 'space-between',
								width: '100%',
								margin: 20,
							}}>
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
											backgroundColor: '#fff',
											paddingRight: 60,
											paddingLeft: 40,
											paddingBottom: 10,
											borderRadius: 8,
											marginLeft: 40,
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
												backgroundColor: '#fff',
												paddingRight: 60,
												paddingLeft: 40,
												paddingBottom: 10,
												borderRadius: 8,
												marginLeft: 40,
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
												backgroundColor: '#fff',
												paddingRight: 60,
												paddingLeft: 40,
												paddingBottom: 10,
												borderRadius: 8,
												marginLeft: 40,
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
											selected={this.state.startDates}
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
										right: 30,
										display: 'flex',
										flexDirection: 'row',
										marginBottom: 20,
										width: '30%',
									}}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											border: '1px solid ',
											borderColor: '#ccc',
											width: '100%',
											padding: 10,
											alignSelf: 'center',
										}}>
										<p
											style={{
												fontSize: 25,
											}}>
											Total Recipe :
										</p>

										<p
											style={{
												fontFamily: 'serif',
												fontSize: 25,
												marginLeft: 70,
												color: 'red',
											}}>
											{' '}
											{this.state.selectValue == 'year'
												? this.state.recipeYear
												: this.state.recipeMonth}{' '}
											DT
										</p>
									</div>
								</div>
							</div>
						</div>
					</GridContainer>
					<div style={{ marginTop: 50 }}>
						<GridContainer>
							<GridItem xs={12} sm={6} md={4}>
								<Card>
									<CardHeader color='warning' stats icon>
										<CardIcon color='warning'>
											<CakeRoundedIcon />
										</CardIcon>
										<h1 className={classes.cardTitle}>
											{this.state.nbrTotal.nbr}
										</h1>
									</CardHeader>
									<CardFooter stats>
										<div style={{ fontSize: 20 }}>
											<Translation>
												{(t) => <div>{t(' Final Product : 12')}</div>}
											</Translation>
										</div>
									</CardFooter>
								</Card>
							</GridItem>

							<GridItem xs={12} sm={6} md={4}>
								<Card>
									<CardHeader color='info' stats icon>
										<CardIcon color='info'>
											<PersonIcon />
										</CardIcon>
									</CardHeader>
									<CardFooter stats>
										<div style={{ fontSize: 20 }}>
											<Translation>
												{(t) => <div>{t(' Customer : 2')}</div>}
											</Translation>
										</div>
									</CardFooter>
								</Card>
							</GridItem>

							<GridItem xs={12} sm={6} md={4}>
								<Card>
									<CardHeader color='primary' stats icon>
										<CardIcon color='primary'>
											<Store />
										</CardIcon>
										<p className={classes.cardCategory}></p>
										<h1 className={classes.cardTitle}>
											{this.state.nbrBoutiques.nbr}
										</h1>
									</CardHeader>
									<CardFooter stats>
										<div style={{ fontSize: 20 }}>
											<Translation>
												{(t) => <div>{t(' Sales : 2')}</div>}
											</Translation>
										</div>
									</CardFooter>
								</Card>
							</GridItem>
						</GridContainer>
					</div>

					<GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<Card chart>
								<CardHeader color='warning'>
									{props.i18n.language === 'en' ? (
										<ChartistGraph
											className='ct-chart'
											data={statisticChart.data}
											type='Bar'
											options={statisticChart.options}
											responsiveOptions={statisticChart.responsiveOptions}
											listener={statisticChart.animation}
										/>
									) : (
										<ChartistGraph
											className='ct-chart'
											data={statisticChartFr.data}
											type='Bar'
											options={statisticChartFr.options}
											responsiveOptions={statisticChartFr.responsiveOptions}
											listener={statisticChartFr.animation}
										/>
									)}
								</CardHeader>
								<CardBody>
									<h4 className={classes.cardTitle}>
										<Translation>
											{(t) => <div>{t('widger2.statistic')}</div>}
										</Translation>
									</h4>
									<p className={classes.cardCategory}>
										<Translation>
											{(t) => <div>{t('widger2.lastCompany')}</div>}
										</Translation>
									</p>
								</CardBody>
								<CardFooter chart>
									<div className={classes.stats}>
										<AccessTime />
										<Translation>
											{(t) => <div>{t('widger2.statisticRealTime')}</div>}
										</Translation>
									</div>
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<Card>
								<CardHeader color='warning'>
									<h4 className={classes.cardTitleWhite}>
										<Translation>
											{(t) => <div>{t('widger2.shopStatistic')}</div>}
										</Translation>
									</h4>
								</CardHeader>
								<CardBody>
									<Table
										tableHeaderColor='warning'
										tableHead={this.state.tBoutique.labels}
										tableData={this.state.tBoutique.data}
									/>
								</CardBody>
							</Card>
							<Card>
								<CardHeader color='success'>
									<h4 className={classes.cardTitleWhite}>
										<Translation>
											{(t) => <div>{t('Sales Statistics')}</div>}
										</Translation>
									</h4>
								</CardHeader>
								<CardBody>
									<Table
										tableHeaderColor='success'
										tableHead={this.state.tRepairers.labels}
										tableData={this.state.tRepairers.data}
									/>
								</CardBody>
							</Card>
							<Card>
								<CardHeader color='primary'>
									<h4 className={classes.cardTitleWhite}>
										<Translation>
											{(t) => <div>{t('widger2.categoryStatistic')}</div>}
										</Translation>
									</h4>
								</CardHeader>
								<CardBody>
									<Table
										tableHeaderColor='primary'
										tableHead={this.state.tRepCat.labels}
										tableData={this.state.tRepCat.data}
									/>
								</CardBody>
							</Card>
						</GridItem>
					</GridContainer>
				</div>
			</Container>
		);
	}
}

recipe.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(useStyles)(recipe));

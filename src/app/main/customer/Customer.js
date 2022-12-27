import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import CustomerTable from './CustomerTable';

const styles = (theme) => ({
	layoutRoot: {},
});
class Customer extends Component {
	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<TableHeader
						textHeader={this.props.t('Customer')}
						addRoute='/newCastomer'
						buttonText={this.props.t('Add Customer')}
					/>
				}
				content={
					<div className='p-24'>
						<CustomerTable />
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(Customer))
);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import SalesTable from './SalesTable';

const styles = (theme) => ({
	layoutRoot: {},
});
class Sales extends Component {
	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<TableHeader
					//textHeader={this.props.t('Output Sales')}
					//addRoute='/newSales'
					//buttonText={this.props.t('Add Output').toLowerCase()}
					/>
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

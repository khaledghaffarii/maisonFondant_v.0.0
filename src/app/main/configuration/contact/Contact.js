import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';

import { withTranslation } from 'react-i18next';
import ContactTable from './ContactTable';

const styles = (theme) => ({
	layoutRoot: {},
});
class Contact extends Component {
	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={<TableHeader textHeader={this.props.t('contact.title')} />}
				content={
					<div className='p-24'>
						<ContactTable />
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(Contact))
);

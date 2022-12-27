import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ProductTable from '../product/ProductTable';

const styles = (theme) => ({
	layoutRoot: {},
});
class Product extends Component {
	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<TableHeader
						textHeader={this.props.t('Product')}
						addRoute='/newProduct'
						buttonText={this.props.t('Add Product')}
					/>
				}
				content={
					<div className='p-24'>
						<ProductTable />
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(Product))
);

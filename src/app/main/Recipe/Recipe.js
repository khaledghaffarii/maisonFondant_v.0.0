import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import TableHeader from '../sharedComponent/TableHeader';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import RecipeTable from './RecipeTable';

const styles = (theme) => ({
	layoutRoot: {},
});
class Recipe extends Component {
	render() {
		const { classes } = this.props;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot,
				}}
				header={
					<TableHeader
						textHeader={this.props.t('Recipe')}
						addRoute='/newRecipe'
						buttonText={this.props.t('Add Recipe')}
					/>
				}
				content={
					<div className='p-24'>
						<RecipeTable />
					</div>
				}
			/>
		);
	}
}
export default withTranslation()(
	withStyles(styles, { withTheme: true })(withRouter(Recipe))
);

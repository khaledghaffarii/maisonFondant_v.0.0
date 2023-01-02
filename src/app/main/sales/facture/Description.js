import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { withTranslation, Translation, useTranslation } from 'react-i18next';
const styles = StyleSheet.create({
	containerDis: {
		flexDirection: 'row',
		alignItems: 'stretch',
		margin: 20,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#112131',
		borderStyle: 'solid',
		marginTop: 50,
	},
	detailColumnDis: {
		flexDirection: 'column',
		borderRightWidth: 1,
		borderColor: '#112131',
		borderStyle: 'solid',
		flexGrow: 9,
	},
	nameDis: {
		fontSize: 24,
	},
	titleDis: {
		fontSize: 14,
		justifySelf: 'flex-end',
		marginTop: 10,
		margin: 'auto',
		borderBottomWidth: 1,
		borderColor: '#112131',
		borderStyle: 'solid',
		padding: '5px',
	},
	subtitleDis: {
		fontSize: 12,
		justifySelf: 'flex-end',
		marginTop: 10,
		margin: 'auto',
		padding: '5px',
	},
});

class Description extends React.Component {
	render() {
		return (
			<View>
				<View style={styles.containerDis}>
					<View style={styles.detailColumnDis}>
						<Text style={styles.titleDis}>Product</Text>
						{this.props.product.map((element) => (
							<Text key={element.product_id} style={styles.subtitleDis}>
								{element.nameDis}
							</Text>
						))}
					</View>
					<View style={styles.detailColumnDis}>
						<Text style={styles.titleDis}>{this.props.t('stock.price')}</Text>
						{this.props.product.map((element) => (
							<Text key={element.product_id} style={styles.subtitleDis}>
								{element.price}
							</Text>
						))}
					</View>
					<View style={styles.detailColumnDis}>
						<Text style={styles.titleDis}>
							{' '}
							{this.props.t('stock.quantity')}
						</Text>
						{this.props.product.map((element) => (
							<Text key={element.product_id} style={styles.subtitleDis}>
								{element.quantity}
							</Text>
						))}
					</View>
				</View>

				<Text style={styles.titleDis}>
					{this.props.t('print.balance')}: {this.props.montant_ttc} DT
				</Text>
			</View>
		);
	}
}

export default withTranslation()(Description);

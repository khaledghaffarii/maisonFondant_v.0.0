import React from 'react';

import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import Description from './Description';
import { withTranslation, Translation, useTranslation } from 'react-i18next';
const Body = (props) => {
	const { t } = useTranslation();
	return (
		<View>
			<View style={styles.container1}>
				<View style={styles.detailColumn1}>
					<Text style={styles.sender}>Maison Fondant</Text>
					<Text style={styles.sender}>{t('print.address')}</Text>
					<Text style={styles.sender}>27887889 / 99959797</Text>
					<Text style={styles.sender}>contact@maisonFondant.tn</Text>
				</View>
				<View style={styles.detailColumn2}>
					<Image
						class='logo-icon'
						style={{ width: '45%' }}
						src='assets/logo1.png'
						alt='logo'
					/>
				</View>
			</View>
			<View style={styles.container2}>
				<Text style={styles.sender}>{props.fname}</Text>
				<Text style={styles.sender}>{props.adress}</Text>
				<Text style={styles.sender}>{props.phone}</Text>
				<Text style={styles.sender}>{props.email}</Text>
			</View>

			{/* <Description
        tva={props.tva}
        montant_ht={props.montant_ht}
        timber={props.timber}
        montant_ttc={props.montant_ttc}
        devisList={props.devisList}
      /> */}
		</View>
	);
};
const styles = StyleSheet.create({
	container1: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#112131',
		borderBottomStyle: 'solid',
		alignItems: 'stretch',
		marginLeft: 20,
		marginRight: 20,
		padding: '10px',
	},
	container2: {
		flexDirection: 'column',
		borderBottomWidth: 1,
		borderBottomColor: '#112131',
		borderBottomStyle: 'solid',
		alignItems: 'stretch',
		marginLeft: 20,
		marginRight: 20,
		padding: '10px',
	},
	detailColumn1: {
		flexDirection: 'column',
	},
	detailColumn2: {
		marginLeft: '40px',
		width: '340px',
	},
	title: {
		fontSize: 14,
		marginTop: '30px',
	},
	sender: {
		fontSize: 12,
		justifySelf: 'flex-end',
	},
	detail: {
		fontSize: 12,
		marginBottom: '5px',
	},
});
export default withTranslation()(Body);

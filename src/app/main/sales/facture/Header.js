import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { withTranslation, Translation, useTranslation } from 'react-i18next';
const Header = (props) => {
	const styles = StyleSheet.create({
		containerH: {
			flexDirection: 'row',
			borderBottomWidth: 2,
			borderBottomColor: '#112131',
			borderBottomStyle: 'solid',
			alignItems: 'stretch',
			margin: 20,
			height: 60,
		},
		detailColumnH: {
			flexDirection: 'column',
			flexGrow: 9,
			textTransform: 'uppercase',
		},
		nameH: {
			fontSize: 24,
		},
		subtitleH: {
			fontSize: 12,
			justifySelf: 'flex-end',
			marginTop: 10,
		},
	});
	const { t } = useTranslation();
	return (
		<View style={styles.containerH}>
			<View style={styles.detailColumnH}>
				<Text style={styles.nameH}>
					{t('devis.quotes')}: {props.numero}
				</Text>
				<Text style={styles.subtitleH}>
					{t('print.quotationDate')}: {new Date().toLocaleString()}
				</Text>
			</View>
		</View>
	);
};

export default withTranslation()(Header);

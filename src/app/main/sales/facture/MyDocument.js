import React from 'react';
import { Page, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

import Header from './Header';
import Body from './Body';

const styles = StyleSheet.create({
	pageDoc: {
		flexDirection: 'column',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	title: {
		margin: 10,
		textAlign: 'center',
	},
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

function MyDocument(props) {
	return (
		<PDFViewer width='100%' height='800px'>
			<Document>
				<Page size='A4' style={styles.pageDoc}>
					<Header numero={props.numero} />

					<View>
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

						<View>
							<View style={styles.containerDis}>
								<View style={styles.detailColumnDis}>
									<Text style={styles.titleDis}>Product</Text>
									{props.product.map((element) => (
										<Text key={element.product_id} style={styles.subtitleDis}>
											{element.name}
										</Text>
									))}
								</View>
								<View style={styles.detailColumnDis}>
									<Text style={styles.titleDis}>{props.t('stock.price')}</Text>
									{props.product.map((element) => (
										<Text key={element.product_id} style={styles.subtitleDis}>
											{element.price}
										</Text>
									))}
								</View>
								<View style={styles.detailColumnDis}>
									<Text style={styles.titleDis}>
										{' '}
										{props.t('stock.quantity')}
									</Text>
									{props.product.map((element) => (
										<Text key={element.product_id} style={styles.subtitleDis}>
											{element.quantity}
										</Text>
									))}
								</View>
							</View>

							<Text style={styles.titleDis}>
								{this.props.t('Total')}: {props.montant_ttc} DT
							</Text>
						</View>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
}

export default MyDocument;

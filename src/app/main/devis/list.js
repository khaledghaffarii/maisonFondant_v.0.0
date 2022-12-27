import React, { useState, useEffect } from 'react';

import Add from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { TextFieldFormsy } from '@fuse';
import { FuseChipSelect } from '@fuse';
import env from '../../static';
import Request from '../../utils/Request';
import { withTranslation, Translation } from 'react-i18next';
const List = (props) => {
	const request = new Request();
	const [listInput, setListInput] = useState([
		{ Piece: '', Quantite: '', Remise: '', prix: '', tva: '' },
	]);
	const [valuePiece, setValuePiece] = useState([]);

	let test = true;
	const update = async () => {
		if (props.id) {
			const url = env.devis.info;
			const devis = await request.getById(url, props.id);
			let lis = await Promise.all(
				devis.data.listPieces.map(async (item) => {
					return {
						id: item._id,
						Piece: {
							key: item.piece?._id,
							value: { id: item.piece?._id, prix: item.piece?.prix },
							label: `${item.piece?.displayName}`,
						},
						Quantite: item.quantite,
						Remise: item.remise,
						prix: item.piece?.prix,
						tva: item.piece?.tva,
					};
				})
			);
			setListInput(lis);
			props.handleChipChangeList(lis);
		}
	};
	useEffect(() => {
		update();
	}, []);
	const handleRemoveItem = (idx) => {
		// assigning the list to temp variable
		const temp = [...listInput];

		// removing the element using splice
		idx = listInput.length - 1;
		temp.splice(idx, 1);

		// updating the list
		setListInput(temp);
		props.handleChipChangeList(temp);
	};

	return (
		<>
			{console.log(props.value.quantity)}
			{listInput.map((data, key) => (
				<fieldset>
					<legend>
						{
							<Translation>
								{(t) => <div>{t('devis.listDetails')}</div>}
							</Translation>
						}{' '}
					</legend>
					<FuseChipSelect
						className='w-full my-16'
						value={data.Piece}
						onChange={async (e) => {
							let l = {};
							await setListInput(
								(l = listInput.map((item, k) => {
									const condition = k == key; // Implement logic
									// l={...item, Quantite: condition ? e.target.value : item.Remise };
									return {
										...item,
										Piece: condition
											? {
													key: e.value.id,
													value: { id: e.value.id, prix: e.value.prix },
													label: `${e.label}`,
											  }
											: item.Piece,
										prix: condition ? e.value.prix : item.prix,
									};
								}))
							);

							props.handleChipChangeList(l);
							props.handleChipChangeValid(l);
						}}
						placeholder='Select'
						textFieldProps={{
							label: (
								<Translation>
									{(t) => <div>{t('devis.pieceDetails')}</div>}
								</Translation>
							),
							InputLabelProps: {
								shrink: true,
							},
							variant: 'outlined',
						}}
						options={props.suggestionsList}
						required
						//isMulti
					/>
					<TextFieldFormsy
						className='w-full my-16'
						value={data.tva}
						label={
							<Translation>
								{(t) => <div>{t('devis.tvaDetails')}</div>}
							</Translation>
						}
						name='tva'
						type='number'
						onChange={async (e) => {
							let l = {};
							await setListInput(
								(l = listInput.map((item, k) => {
									const condition = k == key; // Implement logic
									// l={...item, Quantite: condition ? e.target.value : item.Remise };
									return {
										...item,
										tva: condition ? e.target.value : item.tva,
									};
								}))
							);
							props.handleChipChangeList(l);
							props.handleChipChangeValid(l);
						}}
						margin='normal'
						variant='outlined'
						required
					/>
					<TextFieldFormsy
						className='w-full my-16'
						value={props.listProduit.length > 0 ? data.Quantite : null}
						label={
							<Translation>
								{(t) => <div>{t('devis.quantityDetails')}</div>}
							</Translation>
						}
						type='number'
						name='aa'
						onChange={async (e) => {
							let l = {};
							await setListInput(
								(l = listInput.map((item, k) => {
									const condition = k == key; // Implement logic
									// l={...item, Quantite: condition ? e.target.value : item.Remise };
									return {
										...item,
										Quantite: condition ? e.target.value : item.Quantite,
									};
								}))
							);
							props.handleChipChangeList(l);
							props.handleChipChangeValid(l);
						}}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
						variant='outlined'
						requiredfinalFormValidation
					/>{' '}
					<TextFieldFormsy
						className='w-full my-16'
						value={props.listProduit.length > 0 ? data.Remise : null}
						label={
							<Translation>
								{(t) => <div>{t('devis.reductionDetails')}</div>}
							</Translation>
						}
						type='number'
						name='Remise'
						onChange={async (e) => {
							let l = {};
							await setListInput(
								(l = listInput.map((item, k) => {
									const condition = k == key; // Implement logic
									//l={...item, Remise: condition ? e.target.value : item.Remise };
									return {
										...item,
										Remise: condition ? e.target.value : item.Remise,
									};
								}))
							);

							props.handleChipChangeList(l);
							props.handleChipChangeValid(l);
						}}
						InputLabelProps={{
							shrink: true,
						}}
						margin='normal'
						variant='outlined'
						requiredfinalFormValidation
					/>
				</fieldset>
			))}
			{props.listProduit.length != undefined
				? props.listProduit.map((d) => {
						<p>d:{d.Remise}</p>;
				  })
				: ''}{' '}
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<DeleteForever onClick={() => handleRemoveItem()} />
				<Add
					onClick={() =>
						setListInput((prevArray) => [
							...prevArray,
							{ Piece: '', Quantite: '', Remise: '', prix: '', tva: '' },
						])
					}
				/>
			</div>
		</>
	);
};
export default withTranslation()(List);

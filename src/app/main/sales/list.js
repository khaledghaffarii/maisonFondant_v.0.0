import React, { useState, useEffect } from 'react';

import Add from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { TextFieldFormsy } from '@fuse';
import { FuseChipSelect } from '@fuse';
import env from '../../static';
import Request from '../../utils/Request';
import { withTranslation, Translation } from 'react-i18next';
import AppContext from 'app/AppContext';
import { useContext } from 'react';
const List = (props) => {
	const request = new Request();
	const [listInput, setListInput] = useState([
		{ name: '', quantity: '', price: '' },
	]);

	const [index, setIndex] = useState(-1);
	const contextData = useContext(AppContext);
	const clonListFunction = () => {
		console.log('🚀 ~ file: list.js:20 ~ useEffect ~ index', index);
		if (index != -1) {
			let clonList = contextData.finalList.list;

			clonList[index] = {
				//name: props.value.name,
				quantity: props.value.quantity,
				price: props.value.price,
			};
			contextData.finalList.setFinalList(clonList);
			console.log('🚀 ~ file: list.js:16 ~ List ~ list', clonList);
		}
	};

	useEffect(() => {
		clonListFunction();

		console.log(props);
	}, [props.value]);
	const deleteFn = (index) => {
		let remove = contextData.finalList.list;
		if (remove[index]) remove.splice(index, 1);
		contextData.finalList.setFinalList(remove);
	};
	const updateFn = (index, e) => {
		let price = e.target.value;
		let updateProduct = contextData.finalList.list;
		if (updateProduct[index]) updateProduct[index].price = price;
		contextData.finalList.setFinalList(updateProduct);
	};

	const handleRemoveItem = (idx) => {
		const temp = [...listInput];
		idx = listInput.length - 1;
		temp.splice(idx, 1);
		setListInput(temp);
		deleteFn(idx);
		//props.handleChipChangeList(temp);
	};

	return (
		<>
			{listInput.map((data, key) => (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}>
					<fieldset
						style={{
							flexDirection: 'row',
							borderColor: '#fff9',
							borderRadius: 20,
							marginBottom: 20,
						}}>
						<legend style={{ textAlign: 'center', margin: 5 }}> Product</legend>
						<div
							style={{
								flexDirection: 'row',
								display: 'flex',
							}}>
							<div style={{ width: 400 }}>
								<FuseChipSelect
									className='  mx-16'
									value={props.value.name}
									// onChange={async (e) => {
									// 	let l = {};
									// 	await setListInput(
									// 		(l = listInput.map((item, k) => {
									// 			const condition = k == key; // Implement logic
									// 			// l={...item, Quantite: condition ? e.target.value : item.Remise };
									// 			return {
									// 				...item,
									// 				name: condition ? e.value.name : item.name,
									// 			};
									// 		}))
									// 	);

									// 	props.handleChipChangeList(l);
									// 	props.handleChipChangeValid(l);
									// }}

									onChange={(e) => {
										props.valueKey(key, e);
										setIndex(key);
										//updateFnLiist(key, e);
										//props.handleChipChangeList
									}}
									placeholder='Select Product'
									textFieldProps={{
										label: 'Product',
										InputLabelProps: {
											shrink: true,
										},
										variant: 'outlined',
									}}
									options={props.suggestionsList}
								/>
							</div>
							<div style={{ width: 200 }}>
								<TextFieldFormsy
									className=' mx-16'
									value={
										contextData.finalList.list[key] &&
										contextData.finalList.list[key].quantity
									}
									label='Qte'
									type='number'
									name='quantity'
									placeholder='Quantity'
									// onChange={async (e) => {
									// 	let l = {};
									// 	await setListInput(
									// 		(l = listInput.map((item, k) => {
									// 			const condition = k == key; // Implement logic
									// 			// l={...item, Quantite: condition ? e.target.value : item.Remise };
									// 			return {
									// 				...item,
									// 				quantite: condition ? e.target.value : item.quantite,
									// 			};
									// 		}))
									// 	);
									// 	props.handleChipChangeList(l);
									// 	props.handleChipChangeValid(l);
									// }}
									onChange={props.handelChange}
									InputLabelProps={{
										shrink: true,
									}}
									margin='normal'
									variant='outlined'
									requiredfinalFormValidation
								/>
							</div>
							<div style={{ width: 200 }}>
								<TextFieldFormsy
									className=' mx-16'
									value={
										contextData.finalList.list[key] &&
										contextData.finalList.list[key].price
									}
									label='Unit price'
									type='number'
									name='price'
									placeholder='Price'
									// onChange={async (e) => {
									// 	let l = {};
									// 	await setListInput(
									// 		(l = listInput.map((item, k) => {
									// 			const condition = k == key; // Implement logic
									// 			//l={...item, Remise: condition ? e.target.value : item.Remise };
									// 			return {
									// 				...item,
									// 				price: condition ? e.target.value : item.price,
									// 			};
									// 		}))
									// 	);

									// 	props.handleChipChangeList(l);
									// 	props.handleChipChangeValid(l);
									// }}
									onChange={(e) => {
										props.handelChange;
										updateFn(key, e);
									}}
									InputLabelProps={{
										shrink: true,
									}}
									margin='normal'
									variant='outlined'
									requiredfinalFormValidation
								/>
							</div>
							{/* <div style={{ width: 200 }}>
										<TextFieldFormsy
									className=' mx-16'
									value={props.value.price}
									label='SubTotal'
									type='number'
									name='price'
									placeholder='Price'
									onChange={props.handleChange}
									InputLabelProps={{
										shrink: true,
									}}
									margin='normal'
									variant='outlined'
									requiredfinalFormValidation
								/>
							</div> */}
						</div>
					</fieldset>
					<DeleteForever onClick={() => handleRemoveItem()} />
				</div>
			))}
			{parseInt(props.listProduit).length != undefined
				? props.listProduit.map((d) => {
						<p>d:{d.price}</p>;
				  })
				: ''}{' '}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div
					style={{
						flexDirection: 'row',
						display: 'flex',
						alignItems: 'center',
						margin: 10,
					}}>
					<p>Add product</p>
					<Add
						onClick={(index) =>
							setListInput((prevArray) => [
								...prevArray,
								{ name: '', quantity: '', price: '' },
							])
						}
					/>
				</div>
			</div>
		</>
	);
};
export default withTranslation()(List);

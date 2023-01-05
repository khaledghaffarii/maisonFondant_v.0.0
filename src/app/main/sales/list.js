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
		{ product_id: '', name: '', quantity: '', price: '' },
	]);
	const [selected, setSelected] = useState(null);
	const [listInput2, setListInput2] = useState([
		{ product_id: '', name: '', quantity: '', price: '' },
	]);
	const [totalPrice, setTotalPrice] = useState([]);

	const [index, setIndex] = useState(-1);
	const contextData = useContext(AppContext);
	const clonListFunction = async () => {
		//console.log('🚀 ~ file: list.js:20 ~ useEffect ~ index', index);
		if (index != -1) {
			let clonList = listInput;
			clonList[index] = {
				product_id: props.value.key,
				name: props.value.label,
				quantity: props.value.quantity,
				price: props.value.price,
				//subtTotal: props.value.price * props.value.quantity,
			};
			contextData.finalList.setFinalList(clonList);
			setListInput(clonList);
		}
	};
	const clonListFunctionGlobal = async (params, data) => {
		//console.log('🚀 ~ file: list.js:20 ~ useEffect ~ index', index);

		let clonList = listInput;
		clonList[params] = {
			product_id: data.key,
			name: data.label,
			quantity: data.quantity == 0 ? '' + data.quantity : data.quantity,
			price: data.price,
			//subtTotal: props.value.price * props.value.quantity,
		};
		setListInput(clonList);
		contextData.finalList.setFinalList(clonList);
	};
	const clonListFunctionGlobal2 = async (params, data) => {
		let clonList = listInput2;

		clonList[params] = {
			product_id: data.key,
			name: data.label,
			quantity: data.quantity == 0 ? '' + data.quantity : data.quantity,
			price: data.price,
		};
		setListInput2(clonList);
	};
	const sommePriceTotal = () => {
		let clonList = [...listInput];
		let totalPriceTable = [];
		clonList.map((element) => {
			totalPriceTable.push(element.quantity * element.price);
		});
		const initialValue = 0;
		const sumWithInitial = totalPriceTable.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			initialValue
		);
		setTotalPrice(sumWithInitial);
		contextData.totalPrice.setTotalPrice(sumWithInitial);
	};
	useEffect(() => {
		clonListFunction();
		if (props.update) {
			for (let i = 0; i < props.value.length; i++) {
				// setListInput((prevArray) => [
				// 	...prevArray,
				// 	{
				// 		product_id: props.value[i]._id,
				// 		name: props.value[i].name,
				// 		quantity: '',
				// 		price: '',
				// 	},
				// ]);
				clonListFunctionGlobal(i, props.value[i]);
			}
			// for (let i = 0; i < props.value.length; i++) {
			// 	clonListFunctionGlobal(i, props.value[i]);
			// }
		}
		console.log(
			'🚀 ~ file: list.js:159 ~ useeffect ~ props.suggestionsList',
			props.suggestionsList
		);
		sommePriceTotal();

		//console.log(props);
	}, [props.value]);
	const handleRemove = (option) => {
		alert('hello');
		// const index = listInput.indexOf(option);
		// console.log('🚀 ~ file: list.js:117 ~ handleRemove ~ index', index);
		// if (index !== -1) {
		// 	const newListInput = [...listInput];
		// 	newListInput.splice(index, 1);
		// 	setListInput(newListInput);
		// 	setSelected(null);
		// }
	};
	const deleteFn = (index) => {
		let remove = listInput;

		if (remove[index]) {
			remove.splice(index, 1);
			setListInput(remove);
			contextData.finalList.setFinalList(remove);
		}
	};
	const updateFn = (index, e) => {
		let price = e.target.value;
		let updateProduct = listInput;
		if (updateProduct[index]) updateProduct[index].price = price;
		setListInput(updateProduct);
		contextData.finalList.setFinalList(updateProduct);
	};
	const updateFnQuantity = (index, e, data) => {
		let initialQuantity = listInput2[index].quantity;
		let quantity = e.target.value;
		let updateProduct = [...listInput];

		if (Number(quantity) > Number(initialQuantity)) {
			if (updateProduct[index]) updateProduct[index].quantity = initialQuantity;
			setListInput(updateProduct);
			contextData.finalList.setFinalList(updateProduct);
		} else {
			if (updateProduct[index]) updateProduct[index].quantity = quantity;
			//e.preventDefault();
			setListInput(updateProduct);
			contextData.finalList.setFinalList(updateProduct);
		}
	};
	const changeListProduct = (e) => {
		let listProduct = props.suggestionsList;
		let listFinale = listProduct.filter(
			(listProducts) => listProducts.key !== e.key
		);
		props.listProduct(listFinale);
	};

	const handleRemoveItem = (index) => {
		let remove = [...listInput];

		if (remove[index]) {
			let listDeleteProductUpdate = [...props.suggestionsList];

			listDeleteProductUpdate.push({
				key: remove[index].product_id,
				value: remove[index].product_id,
				label: remove[index].name,
			});

			props.listProduct(listDeleteProductUpdate);
			console.log(
				'🚀 ~ file: list.js:164 ~ handleRemoveItem ~ listDeleteProductUpdate',
				listDeleteProductUpdate
			);
			remove.splice(index, 1);
			setListInput(remove);
			contextData.finalList.setFinalList(remove);
			//let clonList = [...remove];
			let totalPriceTable = [];
			remove.map((element) => {
				totalPriceTable.push(element.quantity * element.price);
			});

			//totalPriceTable.splice(1, 1);
			const initialValue = 0;
			const sumWithInitial = totalPriceTable.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				initialValue
			);

			contextData.totalPrice.setTotalPrice(sumWithInitial);
		}

		//props.handleChipChangeList(temp);
	};

	return (
		<>
			{listInput.map((data, key) => (
				<div
					key={key}
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
									value={
										props.update
											? {
													key: data._id,
													value: data._id,
													label: data.name,
													quantity: data.quantity,
													price: data.price,
											  }
											: props.value.product_id
									}
									onClick={() => handleRemove(option)}
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
										clonListFunctionGlobal2(key, e);
										changeListProduct(e);

										//removeSelected();

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
									required
								/>
							</div>
							<div style={{ width: 200 }}>
								<TextFieldFormsy
									className=' mx-16'
									value={data.quantity}
									label='Qte'
									type='text'
									name='quantity'
									placeholder='Quantity'
									//max={data.quantity}
									onChange={(event) => {
										//event.preventDefault();
										updateFnQuantity(key, event, data.quantity);
										sommePriceTotal();
									}}
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
									value={data.price}
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
										sommePriceTotal();
									}}
									InputLabelProps={{
										shrink: true,
									}}
									style={{
										height: 'auto',
										margin: 0,
										overflow: 'visible',
										padding: 0,
										position: 'static',
										width: 'auto',
									}}
									margin='normal'
									variant='outlined'
									requiredfinalFormValidation
								/>
							</div>
							{/* <div style={{ width: 200 }}>
								<TextFieldFormsy
									className=' mx-16'
									value={
										contextData.finalList.list[key] &&
										contextData.finalList.list[key].subtTotal
									}
									label='SubTotal'
									type='number'
									name='subTotal'
									placeholder='Price'
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
							</div> */}
						</div>
					</fieldset>
					<DeleteForever onClick={() => handleRemoveItem(key)} />
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
								{ product_id: '', name: '', quantity: '', price: '' },
							])
						}
					/>
				</div>
			</div>
		</>
	);
};
export default withTranslation()(List);

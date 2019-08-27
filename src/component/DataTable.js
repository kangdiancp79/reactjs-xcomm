import React, { useState, useEffect } from 'react';
import axios from 'axios';
import springbootUrl from '../config/apiURL';

import MaterialTable from 'material-table';

export default function CarTable() {
	const [ state, setState ] = useState({
		columns: [
			{ title: 'Brand', field: 'brand' },
			{ title: 'Model', field: 'model' },
			{ title: 'Color', field: 'color' },
			{
				title: 'RegisterNumber',
				field: 'registerNumber'
			},
			{ title: 'Description', field: 'description' },
			{ title: 'Year', field: 'year' },
			{ title: 'Price', field: 'price' }
		],
		data: []
	});

	useEffect(() => {
		fetchCars();
	}, []);

	const fetchCars = async () => {
		const result = await axios.get(`${springbootUrl}/cars`);
		const data = result.data;
		setState({ ...state, data });
	};

	return (
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
				title="Car Data Table"
				columns={state.columns}
				data={state.data}
				editable={{
					onRowAdd: (newData) =>
						axios
							.post('${springbootUrl}/cars/', {
								newData
							})
							.then(function(response) {
								console.log(response);
								const data = [ ...state.data ];
								data.push(newData);
								setState({ ...state, data });
							})
							.catch(function(error) {
								console.log(error);
							}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								const data = [ ...state.data ];
								data[data.indexOf(oldData)] = newData;
								setState({ ...state, data });
							}, 600);
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								const data = [ ...state.data ];
								data.splice(data.indexOf(oldData), 1);
								setState({ ...state, data });
							}, 600);
						})
				}}
			/>
		</div>
	);
}

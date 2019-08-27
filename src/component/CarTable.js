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
		console.log(data);
		setState({ ...state, data });
	};

	return (
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
				title="List Of Cars"
				columns={state.columns}
				data={state.data}
				editable={{
					onRowAdd: (newData) =>
						axios.post(`${springbootUrl}/cars`, newData).then((res) => {
							console.log(res);
							console.log(res.data);
							const data = [ ...state.data ];
							data.push(newData);
							setState({ ...state, data });
						}),
					onRowUpdate: (newData, oldData) =>
						axios
							.put(`${springbootUrl}/cars/${newData.id}`, 
								newData
							)
							.then(function(response) {
								console.log(response);
								const data = [ ...state.data ];
								data[data.indexOf(oldData)] = newData;
								setState({ ...state, data });
							})
							.catch(function(error) {
								console.log(error);
							}),
					onRowDelete: (oldData) =>
						axios
							.delete(`${springbootUrl}/cars/${oldData.id}`)
							.then(function(response) {
								console.log(response);
								const data = [ ...state.data ];
								data.splice(data.indexOf(oldData), 1);
								setState({ ...state, data });
							})
							.catch(function(error) {
								console.log(error);
							})
				}}
			/>
		</div>
	);
}

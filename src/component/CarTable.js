import React, { useState, useEffect } from 'react';
import axios from 'axios';
import springbootUrl from '../config/apiURL';

/* import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn'; */

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
				title="List Of Car"
				columns={state.columns}
				data={state.data}
				editable={{
					onRowAdd: (newData) =>
						
						new Promise((resolve) => {
							console.log('onRowAdd : ');
							console.log(newData);
							setTimeout(() => {
								resolve();
								const data = [ ...state.data ];
								data.push(newData);
								setState({ ...state, data });
							}, 600);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve) => {
							console.log('onRowUpdate : ');
							console.log(newData);
							console.log(oldData);
							setTimeout(() => {
								resolve();
								const data = [ ...state.data ];
								data[data.indexOf(oldData)] = newData;
								setState({ ...state, data });
							}, 600);
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve) => {
							console.log('onRowDelete : ');
							console.log(oldData);
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

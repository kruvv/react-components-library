import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import CSearchPage from "./pages/csearch/csearch-page.component";



const App = () =>{
	return (
				<Switch>
					<Route exact path="/assembler/react/csearch" component={CSearchPage} />
				</Switch>
	);
}


export default App;

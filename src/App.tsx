import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PersonalData from './components/PersonalData.tsx';
import AddressAndWork from './components/AddressAndWork.tsx';
import LoanParameters from './components/LoanParameters.tsx';
import "./App.css"

interface IFormData {
	firstName?: string;
	lastName?: string;
	gender?: string;
	workPlace?: string;
	address?: string;
	loanAmount?: string;
	loanTerm?: string;
}

const App: React.FC = () => {
	const [formData, setFormData] = useState<IFormData>({});
	const handleNext = useCallback((data: IFormData) => {
		setFormData((prevData) => ({ ...prevData, ...data }));
		console.log(data);
	}, [setFormData])

	return (

		<div className="App">
			<Router>
				<Routes>
					<Route path="/form" element={<PersonalData onSubmit={handleNext} formData={formData}/>} />
					<Route path="/form2" element={<AddressAndWork onSubmit={handleNext} formData={formData}/>} />
					<Route path="/form3" element={<LoanParameters onSubmit={handleNext} formData={formData} />} 
					/>
				</Routes>
				
			</Router>
			
		</div>

	);
}

export default App;

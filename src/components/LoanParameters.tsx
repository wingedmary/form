import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal.tsx';

interface LoanParametersData {
	loanAmount: string;
	loanTerm: string;
}

interface LoanParametersProps {
	onSubmit: (data: LoanParametersData) => void;
	formData: (data) => void;
	firstName: string | undefined;
	lastName: string | undefined;
}
  
const LoanParameters: React.FC<LoanParametersProps> = ({onSubmit, formData}) => {
	const [data, setData] = useState(
		{
			loanAmount: '200',
			loanTerm: '10'
		}
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data.loanAmount || !data.loanTerm) {
			setErrorMessage('Нужно заполнить все поля!');
			return;
		}
		setErrorMessage(null);
		onSubmit(data);

		try {
			const response = await axios.post('https://dummyjson.com/products/add', { 
				title: `${formData.firstName} ${formData.lastName}`,
			})

			console.log('Данные отправлены', response) ;
			setIsModalOpen(true)
		} catch (error) {
			console.error('Ошибка:', error);
		}
	}


	const handleBack = () => {
		navigate('/form2');
	  };

	return (

		<form className='form' onSubmit={handleSubmit}>
			<label className='form-field'>
				Сумма займа:
				<input 
					className='inner' 
					type="range" 
					min="200" 
					max="1000" 
					step="100" 
					value={data.loanAmount} 
					onChange={(e)=>setData({...data, loanAmount: e.target.value})} 
				/>
				<span>{data.loanAmount || 200}</span>
			</label>

			<label className='form-field'>
				Срок займа:
				<input 
					className='inner' 
					type="range" 
					min="10" 
					max="30" 
					step="1" 
					value={data.loanTerm} 
					onChange={(e)=>setData({...data, loanTerm: e.target.value})}
				/>
				<span>{data.loanTerm || 10}</span>
			</label>

			{errorMessage && <div className='warning-message'>{errorMessage}</div>}

			<div className='form-button-block'>
				<button className='form-button' type="button" onClick={handleBack}>Назад</button>
				<button className='form-button' type="submit">Подать заявку</button>
			</div>

			{isModalOpen && (
				<Modal 
					lastName={formData.lastName} 
					firstName={formData.firstName} 
					loanAmount={data.loanAmount}
					loanTerm={data.loanTerm}
					setIsModalOpen={setIsModalOpen}
				/>
			)}

		</form>
	);
}

export default LoanParameters;

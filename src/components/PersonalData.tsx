import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

interface IPersonalData {
	phone: string;
	firstName: string;
	lastName: string;
	gender: string;
}

interface IPersonalDataProps {
	formData: IPersonalData;
	onSubmit: (data) => void;
}  


const PersonalData: React.FC<IPersonalDataProps> = ({onSubmit, formData}) => {
	const [data, setData] = useState<IPersonalData>(
		{
			phone: formData.phone,
			firstName: formData.firstName,
			lastName: formData.lastName,
			gender: formData.gender,

		}
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data.phone || !data.firstName || !data.lastName||  !data.gender) {
			setErrorMessage('Нужно заполнить все поля!');
			return;
		}
		setErrorMessage(null);
		onSubmit(data);
		navigate('/form2');
	}
	
	return (
		<form className='form' onSubmit={handleSubmit}>
			<label className='form-field'>
				Телефон:
				<input 
					className='inner' 
					type='tel'
					pattern='[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{2}'
					placeholder='8 123 456 78'
					value={data.phone} 
					onChange={(e)=>setData({...data, phone: e.target.value})}
				/>
			</label>

			<label className='form-field'>
				Имя:
				<input 
					className='inner' 
					type='text'
					value={data.firstName} 
					onChange={(e)=>setData({...data, firstName : e.target.value})}
				/>
			</label>

			<label className='form-field'>
				Фамилия:
				<input 
					className='inner'
					type='text' 
					value={data.lastName} 
					onChange={(e)=>setData({...data, lastName : e.target.value})}
				/>
			</label>

			<label className='form-field'>
				Пол:
				<select 
					className='inner' 
					value={data.gender} 
					onChange={(e)=>setData({...data, gender : e.target.value})}
				>
					<option value="">Выберите пол</option>
					<option value='Мужской'>Мужской</option>
					<option value='Женский'>Женский</option>
				</select>
			</label>

			{errorMessage && <div className='warning-message'>{errorMessage}</div>}

			<button className='form-button' type='submit'>Далее</button>
		</form>
		

	);
}

export default PersonalData;

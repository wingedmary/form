import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IAddressAndWorkData {
	workPlace: string;
	address: string;
}

interface IAddressAndWorkProps {
	formData: IAddressAndWorkData;
	onSubmit: (data) => void;
  }

const AddressAndWork: React.FC<IAddressAndWorkProps> = ({ onSubmit, formData}) => {
	const [data, setData] = useState<IAddressAndWorkData>(
		{
			workPlace: formData.workPlace,
			address: formData.address
		}
	);
	const [workPlaces, setWorkPlaces] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [url] = useState('https://dummyjson.com/products/category-list');
	const navigate = useNavigate();

	//Вместо axios можем использовать встроенный fetch.
	//Выбрал axios ввиду удобства использования: преобразование в JSON, перехват запросов, обработка ошибок и пр.
	useEffect(()=>{
		axios.get<string[]>(url)
			.then(response => setWorkPlaces(response.data))
			.catch(error => console.error('При загрузке позникла ошибка: ', error));
	}, [url])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data.workPlace || !data.address) {
			setErrorMessage('Нужно заполнить все поля!');
			return;
		}
		setErrorMessage(null);
		onSubmit(data);
    	navigate('/form3');
	}

	const handleBack = () => {
		navigate('/form');
	  };

	return (

		<form className='form' onSubmit={handleSubmit}>
			<label className='form-field'>
				Место работы:
				<select 
					className='inner' 
					value={data.workPlace} 
					onChange={(e)=>setData({...data, workPlace: e.target.value})}
				>
					<option value="">Выберите место работы</option>
					{workPlaces.map(place => <option key={place} value={place}>{place}</option>)}
				</select>
			</label>

			<label className='form-field'>
				Адрес проживания:
				<input 
					className='inner' 
					type="text" 
					value={data.address} 
					onChange={(e)=>setData({...data, address: e.target.value})}
				/>
			</label>

			{errorMessage && <div className='warning-message'>{errorMessage}</div>}

			<div className='form-button-block'>
				<button className='form-button' type="button" onClick={handleBack}>Назад</button>
				<button className='form-button'>Далее</button>
			</div>
		</form>
	);
}

export default AddressAndWork;

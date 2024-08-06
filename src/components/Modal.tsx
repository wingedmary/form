import React from 'react';

interface ModalProps {
	loanAmount: number | string;
	loanTerm: number | string;
	firstName: string | undefined;
	lastName: string | undefined;
	setIsModalOpen: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({lastName, firstName, loanAmount, loanTerm, setIsModalOpen}) => {
	

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-close' onClick={()=>setIsModalOpen(false)}>Закрыть</div>
 				<h2>Поздравляем, {lastName} {firstName}. Вам одобрено ${loanAmount} на {loanTerm} дней.</h2>
			</div>
		</div>
	);
}

export default Modal;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectToProps {
	to: string;
}

export const RedirectTo = ({ to }: RedirectToProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(to);
	}, []);

	return null;
};

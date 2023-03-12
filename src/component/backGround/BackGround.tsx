import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = { children: ReactNode };


const BackGround = ({ children }: Props) => {
	const StyleBackGround = styled.div`
		// background: linear-gradient(#e66465, #9198e5);
		width: 100vw;
		height: 100vh;
		// z-index: -1;
	`
	return (
		<StyleBackGround>
			{children}
		</StyleBackGround>
	)
}


export default BackGround
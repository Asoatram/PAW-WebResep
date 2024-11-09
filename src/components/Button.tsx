import React, { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
};

function ButtonEdited({ children }: ButtonProps) {
    return (
        <button className="wrapper">
            {children}
        </button>
    );
}

export default ButtonEdited;

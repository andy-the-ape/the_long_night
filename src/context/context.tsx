import React, { createContext, ReactNode } from 'react';


interface ContextType {
}

export const Context = createContext<ContextType>({

});

interface ProviderProps {
    children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    );
};
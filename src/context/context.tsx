import React, { createContext, ReactNode, useState, useContext } from "react";
import { ImageSourcePropType } from "react-native";
import { Material, SwordType } from "../components/lightBringer";

// Define the shape of the context
interface ContextType {
  selectedCharactersForBattle: { id: number; name: string; imageUrl: string }[];
  setSelectedCharactersForBattle: React.Dispatch<
    React.SetStateAction<
      { id: number; name: string; imageUrl: string }[]
    >
  >;
  craftedSword: { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null;
  setCraftedSword: React.Dispatch<
    React.SetStateAction<
      { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null
    >
  >;
}

// Create the context
export const Context = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  // State for selected characters
  const [selectedCharactersForBattle, setSelectedCharactersForBattle] = useState<
    { id: number; name: string; imageUrl: string }[]
  >([]);

  // State for crafted sword
  const [craftedSword, setCraftedSword] = useState<
    { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null
  >(null);

  return (
    <Context.Provider
      value={{
        selectedCharactersForBattle,
        setSelectedCharactersForBattle,
        craftedSword,
        setCraftedSword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the context
export const useGlobalState = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalState must be used within a Provider");
  }
  return context;
};

import React, { createContext, ReactNode, useState, useContext } from "react";
import { ImageSourcePropType } from "react-native"; // Importing type for image sources
import { Material, SwordType } from "../components/lightBringer"; // Importing enums for sword materials and types

// Define the shape of the context
interface ContextType {
  selectedCharactersForBattle: { id: number; name: string; imageUrl: string }[]; // Array of selected characters with IDs, names, and images
  setSelectedCharactersForBattle: React.Dispatch<
    React.SetStateAction<
      { id: number; name: string; imageUrl: string }[]
    >
  >; // Setter for managing selected characters
  craftedSword: { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null; // Information about the crafted sword
  setCraftedSword: React.Dispatch<
    React.SetStateAction<
      { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null
    >
  >; // Setter for managing the crafted sword
}

// Create the context
export const Context = createContext<ContextType | undefined>(undefined); // Initialize the context with an undefined default value

interface ProviderProps {
  children: ReactNode; // Define children for the provider component
}

// Define the Provider component
export const Provider: React.FC<ProviderProps> = ({ children }) => {
  // State for selected characters
  const [selectedCharactersForBattle, setSelectedCharactersForBattle] = useState<
    { id: number; name: string; imageUrl: string }[]
  >([]); // Initialize with an empty array

  // State for crafted sword
  const [craftedSword, setCraftedSword] = useState<
    { material: Material; type: SwordType; imageUrl: ImageSourcePropType } | null
  >(null); // Initialize with null since no sword is crafted initially

  return (
    <Context.Provider
      value={{
        selectedCharactersForBattle, // Expose selected characters to the context consumers
        setSelectedCharactersForBattle, // Expose setter for selected characters
        craftedSword, // Expose crafted sword information
        setCraftedSword, // Expose setter for crafted sword
      }}
    >
      {children}
    </Context.Provider>
  ); // Wrap children components with the context provider
};

// Custom hook to use the context
export const useGlobalState = () => {
  const context = useContext(Context); // Access the context using useContext
  if (!context) {
    throw new Error("useGlobalState must be used within a Provider"); // Ensure the hook is used within the provider
  }
  return context; // Return the context
};

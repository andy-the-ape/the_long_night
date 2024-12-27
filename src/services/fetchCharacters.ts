export const fetchCharacters = async () => {
    try {
      const response = await fetch('https://thronesapi.com/api/v2/Characters');
      const data = await response.json();
      console.log('Successfull got:', data.length, 'characters');
      return data.map((character: any) => ({
        id: character.id,
        name: character.fullName || 'Jaqen Hghar [NO NAME]',
        title: character.title || 'Nameless Man [NO TITLE]',
        imageUrl: character.imageUrl || '',
      }));
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      return [];
    }
  };
  
  export const fetchCharacterById = async (id: number) => {
    try {
      const response = await fetch('https://thronesapi.com/api/v2/Characters/' + id);
      const data = await response.json();
  
      console.log('Character:', data);
      return data; 
    } catch (error) {
      console.error('Failed to fetch character by ID:', error);
      return null;
    }
  };
  
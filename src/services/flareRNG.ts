
interface FlareRandomResponse {
  randomNumber: number;
  isSecure: boolean;
  timestamp: number;
}

export const getFlareRandomNumber = async (min: number, max: number): Promise<number> => {
  try {
    // TODO: Replace with actual Flare API endpoint
    const response = await fetch('https://api.flare.network/v1/random');
    const data: FlareRandomResponse = await response.json();
    
    if (!data.isSecure) {
      throw new Error('Random number is not secure');
    }
    
    // Convert the large random number to our desired range (min-max)
    const range = max - min + 1;
    const scaledRandom = (data.randomNumber % range) + min;
    
    return scaledRandom;
  } catch (error) {
    console.error('Error fetching Flare random number:', error);
    // Fallback to Math.random() for development
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

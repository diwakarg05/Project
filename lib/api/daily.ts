// This is a wrapper for the Daily.co API
// In a real application, you would make these calls from a server to protect your API key

/**
 * Creates a new Daily.co room for an interview
 * 
 * @param interviewId - The unique identifier for the interview
 * @returns The room URL
 */
export async function createDailyRoom(interviewId: string): Promise<string> {
  // In a real implementation, this would be a server-side API call
  // For demo purposes, we'll mock the response
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock room URL
  return `https://yourdomain.daily.co/${interviewId}`;
}

/**
 * Creates a token for a user to join a Daily.co room
 * 
 * @param roomName - The name of the room
 * @param userName - The name of the user
 * @returns The room token
 */
export async function createDailyToken(roomName: string, userName: string): Promise<string> {
  // In a real implementation, this would be a server-side API call
  // For demo purposes, we'll mock the response
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return a mock token
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tX25hbWUiOiJ0ZXN0LXJvb20iLCJ1c2VyX25hbWUiOiJ0ZXN0LXVzZXIifQ.mock-token";
}
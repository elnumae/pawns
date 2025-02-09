import { oauth, accessContext, lichessHost } from "@/auth";

interface Challenge {
  id: string;
  url: string;
  color: "white" | "black";
  timeControl: {
    limit: number;
    increment: number;
  };
}

interface GameResult {
  winner: "white" | "black";
  status: string;
}

export async function createChallenge(timeControl: string): Promise<Challenge> {
  if (!accessContext) throw new Error("Not authenticated with Lichess");
  
  const [baseTime, increment] = timeControl.split("|").map(Number);
  
  const fetchClient = oauth.decorateFetchHTTPClient(window.fetch);
  const response = await fetchClient(`${lichessHost}/api/challenge/open`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clock: {
        limit: baseTime * 60,
        increment,
      },
      variant: "standard",
      color: "random",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }

  const challenge = await response.json();
  return {
    id: challenge.id,
    url: challenge.url,
    color: challenge.color,
    timeControl: {
      limit: baseTime,
      increment,
    },
  };
}

export async function acceptChallenge(challengeId: string): Promise<void> {
  if (!accessContext) throw new Error("Not authenticated with Lichess");

  const fetchClient = oauth.decorateFetchHTTPClient(window.fetch);
  const response = await fetchClient(`${lichessHost}/api/challenge/${challengeId}/accept`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to accept challenge");
  }
}

export async function monitorGame(gameId: string): Promise<GameResult> {
  if (!accessContext) throw new Error("Not authenticated with Lichess");

  const fetchClient = oauth.decorateFetchHTTPClient(window.fetch);
  
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(`${lichessHost}/api/board/game/stream/${gameId}`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.status === "mate" || data.status === "resign" || data.status === "timeout") {
        eventSource.close();
        resolve({
          winner: data.winner,
          status: data.status,
        });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      reject(new Error("Failed to monitor game"));
    };
  });
} 
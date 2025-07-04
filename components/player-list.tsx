interface PlayerListProps {
  players: string[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <ul className="space-y-2">
      {players.map((player) => (
        <li key={player} className="p-2 bg-orange-700 rounded text-white">
          {player}
        </li>
      ))}
    </ul>
  );
}

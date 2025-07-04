export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string;
          created_at: string;
          game_type: 'kings-cup' | 'never-have-i-ever' | 'custom-deck';
          players: string[];
          current_drinks: number;
          current_player_index: number;
          is_active: boolean;
          created_by: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          game_type: 'kings-cup' | 'never-have-i-ever' | 'custom-deck';
          players: string[];
          current_drinks?: number;
          current_player_index?: number;
          is_active?: boolean;
          created_by: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          game_type?: 'kings-cup' | 'never-have-i-ever' | 'custom-deck';
          players?: string[];
          current_drinks?: number;
          current_player_index?: number;
          is_active?: boolean;
          created_by?: string;
        };
      };
      game_history: {
        Row: {
          id: string;
          created_at: string;
          game_id: string;
          action: string;
          player: string;
          details: Record<string, unknown>;
        };
        Insert: {
          id?: string;
          created_at?: string;
          game_id: string;
          action: string;
          player: string;
          details?: Record<string, unknown>;
        };
        Update: {
          id?: string;
          created_at?: string;
          game_id?: string;
          action?: string;
          player?: string;
          details?: Record<string, unknown>;
        };
      };
    };
  };
}

export type Game = Database['public']['Tables']['games']['Row'];
export type GameHistory = Database['public']['Tables']['game_history']['Row'];

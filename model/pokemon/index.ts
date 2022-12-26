export type PokemonAbility = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type PokemonMove = {
  move: { name: string; url: string };
};

export type PokemonSprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonBaseData = {
  abilities: PokemonAbility[];
  height: number;
  id: number;
  moves: PokemonMove[];
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  weight: number;
};

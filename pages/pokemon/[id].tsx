import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface PokemonProps {
  pokemonData: any;
  pokemonSprites: string;
}

export const getServerSideProps: GetServerSideProps<PokemonProps> = async (
  context
) => {
  const pokemon = context.params?.id;
  const pokemonReq = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const pokemonRes = await pokemonReq.json();

  const spriteUrl: string = pokemonRes.sprites.front_default;

  const props: PokemonProps = {
    pokemonData: pokemonRes,
    pokemonSprites: spriteUrl,
  };

  return {
    props,
  };
};

export default function Pokemon({ pokemonData, pokemonSprites }: PokemonProps) {
  return (
    <div>
      {pokemonData.name}
      <div>
        <Image
          src={pokemonSprites}
          alt={pokemonData.name}
          width={300}
          height={300}
        ></Image>
      </div>
    </div>
  );
}

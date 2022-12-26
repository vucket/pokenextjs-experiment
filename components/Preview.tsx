import Link from "next/link";
import { Card } from "semantic-ui-react";
import { PokemonBaseData } from "../model/pokemon";

interface PreviewProps {
  data: PokemonBaseData;
}

export default function PokemonPreview({ data }: PreviewProps) {
  const pokemonName = data.name.toUpperCase();
  return (
    <>
      <Card
        image={data.sprites.front_default}
        header={pokemonName}
        meta={`ID: ${data.id}`}
        description={`Weight: ${data.weight} - Height: ${data.height}`}
        href={`/pokemon/${data.id}`}
      />
    </>
  );
}

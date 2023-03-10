import React from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { PokemonBaseData } from "../../model/pokemon";
import {
  Container,
  Header,
  Divider,
  List,
  Grid,
  Button,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { POKE_API_HOST, POKE_API_PATH_POKEMON } from "../../constants";
import { fetchHelper } from "../../client";

interface PokemonProps {
  data: PokemonBaseData;
}

export const getServerSideProps: GetServerSideProps<PokemonProps> = async (
  context
) => {
  const pokemon = context.params?.id;
  const pokemonData: PokemonBaseData = await fetchHelper(
    `${POKE_API_HOST}${POKE_API_PATH_POKEMON}${pokemon}`
  );

  const props: PokemonProps = {
    data: pokemonData,
  };

  return {
    props,
  };
};

export default function Pokemon({ data }: PokemonProps) {
  const router = useRouter();
  const pokemonName = data.name.toUpperCase();
  const pokemonTypes = data.types.map((el) => el.type.name);
  const pokemonMoves = data.moves.map((el) => el.move.name);
  const pokemonAbilities = data.abilities.map((el) => el.ability.name);

  const onGoBack = () => {
    router.push({
      pathname: "/pokemon",
      query: { search: data.id },
    });
  };

  return (
    <Container textAlign="justified">
      <Button color="blue" size="medium" onClick={onGoBack}>
        Go back to search
      </Button>
      <Header as="h1">{pokemonName}</Header>
      <Divider />
      <Header as="h2">General Info</Header>
      <ul>
        <li>{`ID: ${data.id}`}</li>
        <li>{`Height: ${data.height}`}</li>
        <li>{`Weight: ${data.weight}`}</li>
      </ul>
      <Divider />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Image
              src={data.sprites.front_default}
              alt={`${pokemonName}-front-default`}
              width={300}
              height={300}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              src={data.sprites.back_default}
              alt={`${pokemonName}-back-default`}
              width={300}
              height={300}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Header as="h2">Pokemon Types</Header>
      <List bulleted items={pokemonTypes} />
      <Divider />
      <Header as="h2">Pokemon Moves</Header>
      <List bulleted items={pokemonMoves} />
      <Divider />
      <Header as="h2">Pokemon Abilities</Header>
      <List bulleted items={pokemonAbilities} />
    </Container>
  );
}

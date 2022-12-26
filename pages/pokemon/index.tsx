import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Header,
  Divider,
  Input,
  Message,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../helpers/pages";
import PokemonPreview from "../../components/Preview";

export default function PokemonSearch() {
  const router = useRouter();

  const { search } = router.query;
  const searchQuery = (Array.isArray(search) ? search[0] : search) ?? "";

  const [searchValue, setSearchValue] = useState(searchQuery);

  const { data, error, isLoading, mutate } = useSWRImmutable(
    searchValue ? `/api/search/${searchValue}` : null,
    fetcher,
    {
      keepPreviousData: true,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
    }
  }, [searchQuery]);

  const onSearch = () => {
    if (searchValue) {
      mutate();
    }
  };

  // TODO: Add debounce for input
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.trim());
  };

  return (
    <Container textAlign="justified">
      <Header as="h1">Search Pokemons with PokeAPI</Header>
      <Divider />
      <Header as="h2">How can I use this?</Header>
      <p>Enter the name or pokeindex to search for the Pokemon</p>
      <Input
        size="large"
        placeholder="Pokemon ID or name"
        loading={false}
        action={{
          color: "blue",
          content: "Search",
          onClick: onSearch,
        }}
        onChange={onInputChange}
        value={searchValue}
      />
      <Divider />
      {(searchValue || data) && (
        <Segment>
          <Dimmer active={isLoading}>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          {error && (
            <Message
              error
              header={`No pokemon was found for input: ${searchValue}`}
              content="Please try again with a valid id or name"
            />
          )}
          {data && !error && (
            <>
              <Header as="h2">{`Results`}</Header>
              <PokemonPreview data={data} />
            </>
          )}
        </Segment>
      )}
    </Container>
  );
}

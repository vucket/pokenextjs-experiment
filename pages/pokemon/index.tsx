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

  const defaultSearchValue = searchQuery;

  const [searchValue, setSearchValue] = useState(defaultSearchValue);

  const { data, error, isLoading, mutate } = useSWRImmutable(
    searchValue ? `/api/search/${searchValue}` : null,
    fetcher,
    {
      keepPreviousData: true,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (defaultSearchValue) {
      setSearchValue(defaultSearchValue);
    }
  }, [defaultSearchValue]);

  const onSearch = () => {
    if (searchValue) {
      mutate();
    }
  };

  // TODO: Add debounce for input
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
        defaultValue={defaultSearchValue}
      />
      <Divider />
      <Segment>
        <Dimmer active={isLoading}>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        {error ? (
          <Message
            error
            header={`No pokemon was found for input: ${searchValue}`}
            content="Please try again with a valid id or name"
          />
        ) : (
          <>
            <Header as="h2">{`Results`}</Header>
            <PokemonPreview data={data} />
          </>
        )}
      </Segment>
    </Container>
  );
}

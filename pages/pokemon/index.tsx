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
import { debounce } from "lodash";

export default function PokemonSearch() {
  const router = useRouter();

  const { search } = router.query;
  const searchQuery = (Array.isArray(search) ? search[0] : search) ?? "";

  const { data, error, isLoading, mutate } = useSWRImmutable(
    searchQuery ? `/api/search/${searchQuery}` : null,
    fetcher,
    {
      keepPreviousData: true,
      shouldRetryOnError: false,
    }
  );

  const [searchValue, setSearchValue] = useState("");

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

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchValue(value);
    router.push(
      {
        pathname: "/pokemon",
        query: { search: value },
      },
      undefined,
      { shallow: true }
    );
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
          content: "Force search",
          onClick: onSearch,
        }}
        onChange={debounce(onInputChange, 500)}
        defaultValue={searchValue}
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

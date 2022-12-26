import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Container, Header, Divider, Button, Input } from "semantic-ui-react";

export default function PokemonSearch() {
  const router = useRouter();
  const { search } = router.query;
  const searchQuery = (Array.isArray(search) ? search[0] : search) ?? "";

  const defaultSearchValue = searchQuery;

  const [searchValue, setSearchValue] = useState(defaultSearchValue);

  useEffect(() => {
    if (defaultSearchValue) {
      setSearchValue(defaultSearchValue);
    }
  }, [defaultSearchValue]);

  const onSearch = () => {
    if (searchValue) {
      router.push({
        pathname: "/pokemon/[id]",
        query: { id: searchValue },
      });
    }
  };

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
      {searchQuery && (
        <>
          <Header as="h2">{`Results for ${searchQuery}`}</Header>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/pokemon/[id]",
                  query: { id: searchQuery },
                }}
              >
                {`Go to the details of ${searchQuery}`}
              </Link>
            </li>
          </ul>
        </>
      )}
    </Container>
  );
}

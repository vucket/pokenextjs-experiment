import Link from "next/link";
import { Header } from "semantic-ui-react";
import { PokemonBaseData } from "../model/pokemon";

interface PreviewProps {
  data: PokemonBaseData;
}

export default function PokemonPreview({ data }: PreviewProps) {
  return (
    <>
      <Header as="h3">{data.name.toUpperCase()}</Header>
      <ul>
        <li>
          <Link
            href={{
              pathname: "/pokemon/[id]",
              query: { id: data.id },
            }}
          >
            {`Go to the details of ${data.name}`}
          </Link>
        </li>
      </ul>
    </>
  );
}

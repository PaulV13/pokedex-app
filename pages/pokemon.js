import Link from "next/link";
import Layout from "../components/layout";

export default function pokemon({ pokeman }) {
  const { name, height, weight, abilities, base_experience, types } = pokeman;
  return (
    <Layout>
      <h1 className="title">Pokémon</h1>
      <div className="grid">
        <div className="card">
          <h1>Name: {name}</h1>
          <div className="card-info">
            <div className="card-info-izq">
              <p> Height: {height} meters</p>
              <p> Weight: {weight} kilograms</p>
              <h2>Abilities: </h2>
              <div>
                {abilities.map((ability) => (
                  <p key={ability.ability.name}>{ability.ability.name}</p>
                ))}
              </div>
              <h2>Types: </h2>
              <div>
                {types.map((type) => (
                  <p key={type.type.name}>{type.type.name}</p>
                ))}
              </div>
            </div>
          </div>
          <img src={pokeman.image} alt="" />
        </div>
      </div>
      <Link href="/">
        <a>
          <p className="btn-volver">Back to Home</p>
        </a>
      </Link>
      <style jsx>
        {`
          .title {
            margin: 30px 0 10px 0;
            color: #690505;
          }
          a {
            text-decoration: none;
            margin: 80px 0 80px 0;
          }
          .btn-volver {
            background: #0d3354;
            margin: 10px;
            padding: 10px;
            border-radius: 6px;
            color: white;
            font-family: system-ui;
            text-align: center;
            cursor: pointer;
          }
          .btn-volver:hover {
            background: #1e6cb1;
          }
          .grid {
            display: flex;
            flex-wrap: wrap;
            min-height: calc(100vh - 298px);
          }
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            color: black;
            text-decoration: none;
            border: 2px solid #000;
            border-radius: 10px;
            background-color: #f5d182;
            box-shadow: 6px 6px 8px #888888;
          }
          .card h1 {
            margin: 0 0 1rem 0;
            font-size: 24px;
          }
          .card p {
            margin: 0;
            font-size: 16px;
            line-height: 1.5;
          }
          .card img {
            margin-top: 10px;
            width: 250px;
            border-radius: 10px;
          }
          .card-info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .card-info-izq {
            display: flex;
            flex-direction: column;
          }
          .card-info-izq h2 {
            margin-bottom: 0px;
          }
        `}
      </style>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeman = await res.json();
  const paddedIndex = ("00" + id).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
  pokeman.image = image;
  return {
    props: {
      pokeman,
    },
  };
}

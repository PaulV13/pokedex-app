import Link from "next/link";
import Layout from "../components/layout";

export default function pokemon({ pokeman }) {
  const { name, height, weight, abilities, types, stats } = pokeman;
  return (
    <Layout>
      <h1 className="title">Pokémon</h1>
      <div className="card">
        <div className="card-top">
          <h1>{name}</h1>
          <p>
            <span>Height:</span> {height} meters
          </p>
          <p>
            <span>Weight: </span> {weight} kilograms
          </p>
        </div>
        <div className="card-info">
          <div className="card-info-abilities-types">
            <div>
              <h2>Abilities </h2>
              <div className="card-info-abilities">
                {abilities.map((ability) => (
                  <p key={ability.ability.name}>{ability.ability.name}</p>
                ))}
              </div>
            </div>
            <div>
              <h2>Types </h2>
              <div className="card-info-types">
                {types.map((type) => (
                  <p key={type.type.name}>{type.type.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="card-img">
            <img src={pokeman.image} alt="" />
          </div>
          <h2>Stats </h2>
          {stats.map((stat) => (
            <div className="stat" key={stat.stat.name}>
              <div className="stat-name">
                <p>{stat.stat.name}</p>
              </div>
              <div className="stat-bar">
                <div
                  style={{ width: `${stat.base_stat * 2}px` }}
                  className={`${stat.stat.name}`}
                />
              </div>
              <div className="base-stat">
                <p>{stat.base_stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/">
        <a>
          <p className="btn-volver">Back to Home</p>
        </a>
      </Link>
      <style jsx>
        {`
          .card-img {
            display: flex;
            justify-content: center;
          }
          .card-top {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card-top span {
            font-weight: bold;
            color: #000;
          }
          .card-info-abilities {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card-info-types {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card-info-abilities-types {
            display: flex;
            justify-content: space-around;
          }
          .card-info-abilities-types p {
            margin: 0;
            font-size: 16px;
            line-height: 1.5;
            color: #323169;
          }
          .stat p {
            margin: 0;
          }
          .stat-name {
            flex: 1;
          }
          .base-stat {
            justify-content: center;
            display: flex;
          }
          .stat-bar {
            color: #2b2d42;
            flex: 2;
            height: 5px;
          }
          .stat {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 5px 0px;
          }
          .hp {
            background-color: #0a2463;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .attack {
            background-color: #ea7af4;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .defense {
            background-color: #ff5400;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .special-attack {
            background-color: #ff0054;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .special-attack p {
            font-size: 14px;
          }
          .special-defense {
            background-color: #9e0059;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .special-defense p {
            font-size: 14px;
          }
          .speed {
            background-color: #390099;
            border-radius: 6px;
            padding: 2px 10px;
            height: 5px;
          }
          .title {
            margin: 30px 0 0 0;
            color: #690505;
          }
          a {
            text-decoration: none;
          }
          .btn-volver {
            background: #0d3354;
            padding: 10px;
            border-radius: 6px;
            color: white;
            font-family: system-ui;
            text-align: center;
            cursor: pointer;
            margin: 0;
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
            width: 450px;
          }
          .card-top h1 {
            margin: 0 0 1rem 0;
            font-size: 24px;
          }
          .card-top p {
            margin: 0;
            font-size: 16px;
            line-height: 1.5;
            color: #323169;
          }
          .card img {
            margin-top: 10px;
            width: 250px;
            border-radius: 10px;
          }
          .card-info h2 {
            margin: 20px 0px 5px 0;
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

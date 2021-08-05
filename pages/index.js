import { useEffect, useState, useRef } from "react";
import Layout from "../components/layout";
import Link from "next/link";
import Image from "next/image";
import { getAllPokemon } from "../services/getAllPokemon";
import { getPokemon } from "../services/getPokemon";

const defaultCurrent = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

export default function Home({ pokemones, next, previous }) {
  const [nextCurrent, setNext] = useState(next);
  const [previousCurrent, setPrev] = useState(previous);
  const [newPokemones, setNewPokemones] = useState(pokemones);
  const [index, setIndex] = useState(20);
  const [namePokemon, setNamePokemon] = useState("");
  const [newPokemon, setNewPokemon] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [namePokemon, newPokemones]);

  const handleNext = async () => {
    const res = await fetch(nextCurrent);
    const pokemonResult = await res.json();
    var i = index;
    const pokemon = pokemonResult.results.map((result) => {
      i++;
      const paddedIndex = ("00" + i).slice(-3);
      const id = i;
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
        id,
      };
    });
    setIndex(i);
    setNewPokemones(pokemon);
    setDisabled(false);
    setPrev(pokemonResult.previous);
    setNext(pokemonResult.next);
    setNewPokemon(null);
    setError(null);
    setNamePokemon("");
  };

  const handlePrev = async () => {
    if (previousCurrent === defaultCurrent) {
      setDisabled(true);
      const res = await fetch(previousCurrent);
      const pokemonResult = await res.json();
      var i = index - 40;

      const pokemon = pokemonResult.results.map((result) => {
        i++;
        const paddedIndex = ("00" + i).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        const id = i;
        return {
          ...result,
          image,
          id,
        };
      });

      setNewPokemones(pokemon);
      setPrev(pokemonResult.previous);
      setNext(pokemonResult.next);
      setIndex(i);
      setNewPokemon(null);
      setError(null);
      setNamePokemon("");
    } else {
      const res = await fetch(previousCurrent);
      const pokemonResult = await res.json();
      var i = index - 40;

      const pokemon = pokemonResult.results.map((result) => {
        i++;
        const paddedIndex = ("00" + i).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        const id = i;
        return {
          ...result,
          image,
          id,
        };
      });

      setNewPokemones(pokemon);
      setPrev(pokemonResult.previous);
      setNext(pokemonResult.next);
      setIndex(i);
    }
  };

  const handleChange = (e) => {
    setNamePokemon(e.target.value.toLowerCase());
  };

  const pokemonesFiltered = newPokemones.filter((pokemon) =>
    pokemon.name.startsWith(namePokemon)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (namePokemon === "") {
      setNewPokemones(pokemonesFiltered);
      setNewPokemon(null);
    } else {
      const pokemonRes = await getPokemon(namePokemon.toLowerCase());
      if (pokemonRes.error) {
        setError(pokemonRes.error);
      } else {
        const paddedIndex = ("00" + pokemonRes.id).slice(-2);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${paddedIndex}.png`;

        const pokemon = {
          ...pokemonRes,
          image,
        };
        setNewPokemon(pokemon);
        setNamePokemon("");
        setError(null);
      }
    }
  };

  return (
    <Layout>
      <h1 className="title">POKEDEX</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          name="namePokemon"
          value={namePokemon}
          onChange={handleChange}
          placeholder="pokemon..."
        />
        <button className="submit">
          <img
            className="form-img"
            src="/search_icon.png"
            alt="search pokemon"
            width={24}
            height={24}
          />
        </button>
      </form>
      {error ? (
        <div className="error">{error}</div>
      ) : newPokemon ? (
        <div className="pokemon-list">
          <div key={newPokemon.id} className="card">
            <Link href={`/pokemon?id=${newPokemon.id}`}>
              <a>
                <Image
                  className="card-img"
                  src={newPokemon.image}
                  alt={newPokemon.name}
                  width={84}
                  height={84}
                />
                <span>{newPokemon.id}.</span>
                {newPokemon.name}
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="pokemon-list">
          {pokemonesFiltered.map((pokeman) => (
            <div className="pokemon-item" key={pokeman.id}>
              <Link href={`/pokemon?id=${pokeman.id}`}>
                <a>
                  <Image
                    className="card-img"
                    src={pokeman.image}
                    alt={pokeman.name}
                    width={84}
                    height={84}
                  />
                  <span>{pokeman.id}.</span>
                  {pokeman.name}
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="buttons">
        <button className="btn-page" onClick={handlePrev} disabled={disabled}>
          Previous
        </button>
        <button className="btn-page" onClick={handleNext}>
          Next
        </button>
      </div>
      <style jsx>{`
        .error {
          display: flex;
          align-items: center;
          height: 400px;
          font-size: 24px;
          font-family: system-ui;
          font-weight: 700;
          min-height: calc(100vh - 311px);
        }
        .title {
          color: #690505;
          margin: 30px 0 10px 0px;
          font-family: system-ui;
        }
        .form {
          display: flex;
          align-items: center;
          border-radius: 10px;
          padding: 5px 10px;
          background: aliceblue;
          margin: 10px 0;
        }
        input {
          background: transparent;
          border: 0px;
          padding: 5px;
          border-radius: 4px;
          outline: none;
          font-size: 14px;
        }
        .form-img {
          width: 24px;
          height: 24px;
        }
        .submit {
          background: transparent;
          padding: 0;
          cursor: pointer;
          border: 0;
        }
        a {
          text-decoration: none;
          display: flex;
          align-items: center;
          color: Black;
          font-weight: Bold;
          padding: 10px 20px;
          border-radius: 6px;
          height: 100%;
        }
        span {
          margin: 10px;
        }
        .pokemon-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 311px);
        }
        .pokemon-item {
          margin: 10px;
          color: black;
          text-decoration: none;
          border: 2px solid #1d1b1b;
          border-radius: 10px;
          background-color: #f5d182;
          box-shadow: 4px 4px 15px #888888;
          height: 160px;
        }
        .card-img {
          width: 84px;
        }
        .btn-page {
          background: #0d3354;
          margin: 10px;
          padding: 10px;
          border-radius: 6px;
          color: white;
          font-family: system-ui;
          width: 100px;
          text-align: center;
          cursor: pointer;
          border: 0;
        }
        .btn-page:hover {
          background: #1e6cb1;
        }
        .btn-page:disabled {
          background: #6b859c;
        }
        .buttons {
          display: flex;
          margin: 50px 0;
        }
        .card {
          margin: 1rem;
          padding: 1.5rem;
          color: black;
          -webkit-text-decoration: none;
          text-decoration: none;
          border: 2px solid #000;
          border-radius: 10px;
          background-color: #f5d182;
          box-shadow: 6px 6px 8px #888888;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps() {
  const pokemonesRes = await getAllPokemon();
  const { next, previous } = pokemonesRes;

  const pokemones = pokemonesRes.results.map((result, index) => {
    const paddedIndex = ("00" + (index + 1)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    const id = index + 1;
    return {
      ...result,
      image,
      id,
    };
  });

  return {
    props: { pokemones, next, previous },
  };
}

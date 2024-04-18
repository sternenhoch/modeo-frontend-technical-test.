import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Début de la récupération des données...");

        if (searchTerm.length === 0) {
          setState({
            loading: false,
            error: null,
            data: [],
          });
          return;
        }
        setState({
          loading: true,
          ...state,
        });

        const response = await fetch(
          `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?offset=${offset}&q=${encodeURIComponent(
            searchTerm.trim().toLowerCase(),
          )}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const newData = result?.results?.filter(
          (records) =>
            records?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            records?.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
        );

        console.log("new data", newData);
        console.log("result:", result);
        console.log("result.results", result.results);

        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: offset === 0 ? newData : [...prevState.data, ...newData],
        }));
      } catch (error) {
        console.error(error);
        setState({
          loading: false,
          error: "error fetching data",
          data: null,
        });
      }
    };
    fetchData();
  }, [offset, searchTerm]);
  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setOffset(0);
  };
  return (
    <div className="App">
      <h1>Vélibs de Paris en Temps Réel</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder="Rechercher une station..."
        onChange={handleSearch}
      />
      {state.loading && <p>Chargement...</p>}
      {state.error && <p>Erreur: {state.error}</p>}
      {state.data && (
        <>
          <div className="cardItem">
            {state.data.map((records, index) => (
              <div className="card" key={index}>
                <div className="cardContent">
                  <div className="cardTopLeft">
                    <h3>{records.name}</h3>
                  </div>
                  <div className="cardTopRight">
                    <p className="mechanical">
                      <strong>Mécaniques:</strong> {records.mechanical}
                    </p>
                  </div>
                  <div className="cardBottomLeft">
                    <p>
                      Disponibles: {records.numbikesavailable}/
                      {records.capacity}
                    </p>
                  </div>
                  <div className="cardBottomRight">
                    <p className="electric">
                      <strong>Électriques:</strong> {records.ebike}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="cardButton" onClick={loadMore}>
            Charger plus de résultats
          </button>
        </>
      )}
    </div>
  );
}

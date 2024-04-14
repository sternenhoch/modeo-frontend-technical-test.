import {useEffect, useState} from "react";
import "./styles.css";

export default function App() {
  const[state, setState] = useState({
    loading: false, 
    error: null, 
    data :  null, 
  })


  useEffect(() => {
    const fetchData = async () => {
      try { 
        console.log("Début de la récupération des données...");
        setState({
          loading: true,
          ...state,
        })
        const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/resultss");
        const result = await response.json();
        console.log('result:', result); 
        console.log('result.results', result.results)
        const velibData = result.results.map((results) => ({
          name: results.fields.name,
          mechanical: results.fields.mechanical,
          ebike: results.fields.ebike,
          capacity: results.fields.capacity,
          numbikesavailable: results.fields.numbikesavailable,
        })) ;
        console.log('velibdata', velibData)              

        setState({
          loading: false,
          data: velibData, 
          ...state,
        })
      } catch (error) {
        console.log(error)
        setState({
          loading: false,
          error: "error fetching data",
          data :  null,
        })
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <h1>Vélibs de Paris en Temps Réel</h1>
      {state.loading && <p>Chargement...</p>}
      {state.error && <p>Erreur: {state.error}</p>}
      {state.data && (
        <ul>
          {state.data.map((results, index) => (
            <li key={index}>
              <strong>Nom:</strong> {results?.name} <br />
              <strong>Vélos Mécaniques Disponibles:</strong> {results.mechanical} <br />
              <strong>Vélos Électriques Disponibles:</strong> {results.ebike} <br />
              <strong>Capacité Totale:</strong> {results.capacity} <br />
              <strong>Vélos Disponibles:</strong> {results.numbikesavailable}
            </li>
          ))}
        </ul>
      )}</div>
  );
}

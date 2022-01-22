<script>
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";

  let movies = [];
  let pagination = {};
  let skip = 0;

  async function getMovies() {
    await fetch(`http://localhost:4000/movies`)
      .then((r) => r.json())
      .then((data) => {
        movies = data.data;
        pagination = data.pagination;
      });
  }

  async function getElements_S() {
    skip += 10
    await fetch("http://localhost:4000/movies?take=10&skip="+skip)
      .then((r) => r.json())
      .then((data) => {
        movies = data.data;
        pagination = data.pagination;
      });
  }

  async function getElements_P() {
    skip -= 10
    await fetch("http://localhost:4000/movies?take=10&skip="+skip)
      .then((r) => r.json())
      .then((data) => {
        movies = data.data;
        pagination = data.pagination;
      });
  }

  onMount(async () => {
    getMovies();
  });
</script>

<head>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
</head>
<main class="container">
  <center><nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="/movies"><i class="fas fa-film"></i>&nbsp; Movies</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <a class="navbar-brand" href="https://github.com/ElyousfiMohamed/movies" target="_blank"><i class="fab fa-github"></i>&nbsp; GitHub</a>
          <a class="navbar-brand" href="#"><i class="fab fa-youtube" target="_blank"></i>&nbsp; YouTube</a>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav></center>

  <div class="row">
  {#each movies as movie}
  <div class="card col-4 m-1" style="width: 18rem;">
    <img src="{movie.poster}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h6 class="card-title">Title : {movie.title}</h6>
      <h6 class="card-title">Year : {movie.year}</h6>
      <h6>Genres : 
        {#each movie.genres as genre}
          <span class="card-text">{genre} </span>
        {/each}</h6>
    </div>
  </div>
  {/each}
</div>
<footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50 mt-5">
  <div class="container text-center">
    <button type="button" class="btn btn-light" id="btn-p" on:click={getElements_P}><i class="fas fa-backward"></i> Page Précedente</button>
    <button type="button" class="btn btn-light" id="btn-s" on:click={getElements_S}>Page Suivante <i class="fas fa-forward"></i></button>
  </div>
</footer>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav {
    border-radius: 5px;
    width: 95%;
  }
  
  .btn {
    margin-left: 30px;
    margin-right: 30px;
  }

  footer {
    background-color: #333333 !important;
  }

  main {
    background-color: #333333;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>

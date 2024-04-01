import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber, grey } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import TopMoviePage from './pages/TopMoviePage';
import TopTalentPage from './pages/TopTalentPage';
import SearchPage from './pages/SearchPage';
import PersonInfoPage from './pages/PersonInfoPage'
import MovieInfoPage from './pages/MovieInfoPage'

import './App.css';

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: grey,
    // secondary: amber,
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(255, 255, 255, 0.5)",
    }
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={
            <>
              <NavBar selected={"/"} />
              <HomePage />
            </>} 
          />
          <Route path="/search" element={
            <>
              <NavBar selected={"/search"} />
              <SearchPage />
            </>} 
          />
          <Route path="/top-movies" element={
            <>
              <NavBar selected={"/top-movies"} />
              <TopMoviePage />
            </>} 
          />
          <Route path="/top-persons" element={
            <>
              <NavBar selected={"/top-persons"} />
              {/* <TopDirectorsPage /> */}
              <TopTalentPage />
            </>} 
          />
          <Route path="/movie/:movie_id" element={
            <>
              <NavBar/>
              <MovieInfoPage />
            </>
          } />
          <Route path="/person/:person_id" element={
            <>
              <NavBar/>
              <PersonInfoPage />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
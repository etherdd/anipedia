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
import SearchPage from './pages/SearchPage';
import TopPicksPage from './pages/TopPicksPage';
import TopDirectorsPage from './pages/TopDirectorsPage';
import AnimationInfoPage from './pages/AnimationInfoPage';
import DirectorInfoPage from './pages/DirectorsInfoPage';

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
          {/* <Route path="/top_movie" element={<TopMoviePage />} />
          <Route path="/top_person" element={<TopTalentPage />} />
          <Route path="/movie/:movie_id" element={<MovieInfoPage />} />
          <Route path="/person/:person_id" element={<PersonInfoPage />} /> */}

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
          <Route path="/toppicks" element={
            <>
              <NavBar selected={"/toppicks"} />
              <TopPicksPage />
            </>} 
          />
          <Route path="/directors" element={
            <>
              <NavBar selected={"/directors"} />
              <TopDirectorsPage />
            </>} 
          />
          <Route path="/animation/:animation_id" element={
            <>
              <NavBar selected={"/animation/:animation_id"} />
              <AnimationInfoPage />
            </>} 
          />
          <Route path="/director/:director_id" element={
            <>
              <NavBar selected={"/director/:director_id"} />
              <DirectorInfoPage />
            </>} 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
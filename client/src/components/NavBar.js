import { NavLink } from 'react-router-dom';
import logo from './logo.png';

import './NavBar.css';
// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
// function NavText({ href, text, isMain }) {
//   return (
//     <Typography
//       noWrap
//       style={{
//         marginRight: '30px',
//         fontFamily: 'monospace',
//         fontWeight: 700,
//         letterSpacing: '.3rem',
//       }}
//     >
//       <NavLink
//         to={href}
//         style={{
//           color: 'inherit',
//           textDecoration: 'none',
//         }}
//       >
//         {text}
//       </NavLink>
//     </Typography>
//   )
// }

// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar({ selected }) {
  return (
    <div className="navbar">
      <img src={logo} className="logo" alt='logo'></img>

      <ul>
        <li className={selected === '/' && 'navbar-selected-li'}><a href='/' text='HOME'>Home</a></li>
        <li className={selected === '/toppicks' && 'navbar-selected-li'}><a href='/toppicks' >Top Picks</a></li>
        <li className={selected === '/directors' && 'navbar-selected-li'}><a href='/directors' >Directors</a></li>
        <li className={selected === '/search' && 'navbar-selected-li'}><a href='/search' >Search</a></li>
      </ul>

      <div className='empty-div'></div>

      {/* <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <NavText href='/' text='AniPedia' isMain />
          <NavText href='/search' text='search' />
          <NavText href='/top_movie' text='top movies' />
          <NavText href='/top_person' text='top talents' />
        </Toolbar>
      </Container> */}

    </div>
  );
}

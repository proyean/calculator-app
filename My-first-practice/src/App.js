
import './App.css';
import Hi from './compnents/class-component';
import {Hello} from './compnents/function-component';
import Wellcome from './compnents/jsx';
import Fullname from './compnents/props';
import Subscribe from './compnents/state';
import Event_function from './compnents/function-event-handler';
import Events_binding from './compnents/events_binding';
import Event_handler from './compnents/class-event-handler';
import Conditionalrendering from './compnents/conditionalrendering';
import Lists from './compnents/Lists';
import Style from './compnents/style';
import Inlinestyle from './compnents/inlinestyle';
import './appstyle.css';
import styles from './appstyle.module.css';
import Form from './compnents/form';
import { BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import './pages/navbar.css';
import Usestate from './useState/usestatecounter';
import Usestatecounter2 from './useState/usestatecounter2';
function App() {
  return (
    <div className="App">

      <Usestatecounter2/>
      {/* <Usestate /> */}
       {/* <Router>
      <nav className='navbar'>
            <Link type='none' to={'/'}>Home</Link>
            <Link type='none' to={'/Contact'}>Contact</Link>
            <Link type='none'  to= {'/About'}>About</Link>
          </nav>
        <Routes>
          
          <Route  path='/' element={<Home/>}/>
          <Route  path='/Contact' element={<Contact/>}/>
          <Route  path='/About' element={<About/>}/>
          <Route  path='/*' element={<h1>Page Not Found</h1>}/>
        </Routes>
      </Router>
  */}
       {/* <Form /> */}
     {/* <Inlinestyle /> */}
     {/* <h1 className='Regularcss'>Regular styles</h1>
      <h1 className={styles.modulecss}>module styles</h1>  */}
      {/* <Style  heading={true}/> */}
      {/* <Lists /> */}
      {/* <Conditionalrendering/> */}
      {/* <Wellcome /> */}
      {/*<Hello /> */}
      {/*<Hi /> */}
      {/* <Fullname name="Andualem" age="18" />
      
      <Fullname name="Nigist" age="22" />
       <p>My brothers</p>  */}
      {/*  <button>Clik me</button>  */}
       {/* <Subscribe />  */}
      {/* <Event_function /> */}
      {/* <Events_binding /> */}
      {/* <Event_handler/> */}
    </div>
  );
}

export default App;

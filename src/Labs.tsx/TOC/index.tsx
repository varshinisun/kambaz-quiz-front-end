import { Link } from 'react-router-dom'; // For React Router

export default function TOC() {
     return (
          <div>
       <ul>

        <h2>Varshini Sundaresan CS 4550 Online</h2>
         <li><Link to="/Labs">Labs</Link></li>
         <li><Link to="/Labs/Lab1">Lab 1</Link></li>
         <li><Link to="/Labs/Lab2">Lab 2</Link></li>
         <li><Link to="/Labs/Lab3">Lab 3</Link></li>
         <li><Link to="/Labs/Lab4">Lab 4</Link></li>
         <li><Link to="/Labs/Lab5">Lab 5</Link></li>
         <li><Link to="/Kambaz">Kambaz</Link></li>
         <h4>Github link</h4>
        Please <a href="https://github.com/varshinisun/kambaz-react-web-app" id="wd-github"> click here </a> 
        to get VARSHINISUN GITHUB LINK



       </ul>
       </ div>
     );
   }
   
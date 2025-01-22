import { createRoot } from 'react-dom/client' 
import './index.css'

const root = createRoot(document.getElementById("root")!)

root.render(
  <main>
    <img src="src/assets/react.svg" width="40px" alt="react logo"/>
    <h1>Fun facts about React!</h1>
    <ul>
      <li>Was first released in 2013</li>
      <li>Was originally cretated by Jordan Walke</li>
      <li>Has well over 200k stars on GitHub</li>
      <li>Is maintained by Meta</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
    </ul>
  </main>
)

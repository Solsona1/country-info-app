import { Link } from 'react-router-dom';
import './header.scss'

function Header() {
  return(
    <nav>
      <Link className="title" to={'/'}>
        <h3>Country Info App</h3>
      </Link>
    </nav>
  )
}

export default Header;
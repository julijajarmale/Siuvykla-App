import { Link, NavLink } from "react-router-dom";

function Nav() {

    return (
        <>
            <div className="container header">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav">
                            <NavLink to="/admin/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#f34091'
                                    } : null
                            }>Admin</NavLink>
                            <NavLink to="/admin/products" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#f6fc4d'
                                    } : null
                            }>Products</NavLink>
                            <NavLink to="/admin/cats" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#f34091'
                                    } : null
                            }>Categories</NavLink>
                            <NavLink to="/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#f6fc4d'
                                    } : null
                            }>Main Page</NavLink>
                            <Link to="/logout">Logout</Link>
                              
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;
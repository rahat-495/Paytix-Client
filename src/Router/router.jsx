
import {createBrowserRouter} from 'react-router-dom' ;
import Root from '../Layout/Root';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import Home from '../Pages/Home/Home';

const router = createBrowserRouter([
    {
        path : '/' ,
        element : <Root/>,
        children : [
            {
                path : '/' ,
                element : <Home/> ,
            },
            {
                path : '/login' ,
                element : <Login/> ,
            },
            {
                path : '/signUp' ,
                element : <SignUp/> ,
            },
        ]
    }
])

export default router;


import {createBrowserRouter} from 'react-router-dom' ;
import Root from '../Layout/Root';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import SendMoney from '../Pages/SendMoney/SendMoney';
import CashOut from '../Pages/CashOut/CashOut';
import Profile from '../Pages/Profile/Profile';
import CashIn from '../Pages/CashIn/CashIn';
import Transaction from '../Pages/TransactionHistory/Transaction';
import InRequests from '../Pages/InRequests/InRequests';
import OutRequests from '../Pages/OutRequests/OutRequests';
import Users from '../Pages/Users/Users';

const router = createBrowserRouter([
    {
        path : '/' ,
        element : <Root/>,
        children : [
            {
                path : '/' ,
                element : <Login/> ,
            },
            {
                path : '/signUp' ,
                element : <SignUp/> ,
            },
            {
                path : '/profile' ,
                element : <Profile/> ,
            },
            {
                path : '/sendMoney' ,
                element : <SendMoney/> ,
            },
            {
                path : '/cashOut' ,
                element : <CashOut/> ,
            },
            {
                path : '/cashIn' ,
                element : <CashIn/> ,
            },
            {
                path : '/transactions' ,
                element : <Transaction/> ,
            },
            {
                path : '/inRequests' ,
                element : <InRequests/> ,
            },
            {
                path : '/outRequests' ,
                element : <OutRequests/> ,
            },
            {
                path : '/users' ,
                element : <Users/> ,
            },
        ]
    }
])

export default router;

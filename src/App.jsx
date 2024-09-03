import Body from './components/Body'
import Inbox from './components/Inbox'
import Mail from './components/Mail'
import SendMail from './components/SendMail'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from './firebase';
import { setAuthUser } from './redux/appSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body/>,
    children: [
      {
        path: "/",
        element: <Inbox/>
      },
      {
        path: "/mail/:id",
        element: <Mail/>
      }
    ]
  }
])

function App() {
  const { authUser } = useSelector(store => store.appSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuthUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }));
      }
    })
  }, [])
  

  return (
    <div className='bg-[#f6f8fc] h-screen w-screen overflow-hidden'>
       {
        !authUser ? (
          <Login />
        ) : (
          <>
            <Navbar />
            <RouterProvider router={router} />
            <div className='absolute w-[30%] bottom-0 right-20 z-10'>
              <SendMail />
            </div>
          </>
        )
      }
    </div>
  )
}

export default App

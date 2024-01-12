
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <main className='m-0 p-0 ' >
        <Outlet />
      </main>
    </>
  )
}

export default App;
import { Outlet, Link } from "react-router-dom"




const App = () => {
  return (
    <>
      <div className="w-full h-[60px] bg-stone-600 flex justify-around items-center shadow-md rounded-b-md fixed top-0">
        <ul className="flex justify-center items-center gap-4">
          <Link className="text-xl text-white hover:text-purple-400 font-semibold" to={'/home'}>Home</Link>
          <Link className="text-xl text-white hover:text-purple-400 font-semibold" to={'/card-detail'}></Link>
          <Link className="text-xl text-white hover:text-purple-400 font-semibold" to={'/news'}></Link>
        </ul>

      </div>


      <div className="mx-auto min-h-max">
        <Outlet />
      </div>
    </>
  )
}

export default App

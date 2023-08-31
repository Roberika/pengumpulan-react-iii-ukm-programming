import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="w-auto">
            <h1 className="text-center text-4xl">Ini Home</h1>
            <br />
            <div className="grid grid-flow-col gap-1 justify-center">
                {[
                    ['Prodi', '/prodi',],
                ].map(([btn_title, btn_link], index) => (
                    <button className="btn-neutral" key={index}
                        onClick={() => navigate(btn_link)}>{btn_title}</button>
                ))}
            </div>
        </div>
    )
}

export default Home
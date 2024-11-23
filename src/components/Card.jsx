
import { useNavigate } from "react-router-dom";


const Card = (props) => {
    const { name, image, id, frameType, descri, type, race, attribute, atk, def, level } = props;
    const navigate = useNavigate();
    const getInforCard = () => {
        navigate(`/card-detail/${id}`, {
            state: { name, image, frameType, descri, type, race, attribute, atk, def, level }
        });
    };

    return (
        <div className="h-full w-[300px] object-cover border-2 border-stone-600 p-4 rounded-md">
            <div className="w-full h-[30px] inline-block border-2 border-slate-700 my-2 bg-slate-900">
                <h4 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold text-center">
                    {name}
                </h4>
            </div>
            <div className="shadow-md">
                <img
                    onClick={getInforCard}
                    className="rounded-md cursor-pointer"
                    src={image}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Card;

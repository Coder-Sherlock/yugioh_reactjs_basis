import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CardDetail = () => {
    const location = useLocation();
    const { name, image, frameType, descri, type, race, attribute, level, atk, def } = location.state || {};

    // State cho phần search và filter
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");
    const [relatedCards, setRelatedCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchCards = async () => {
        setLoading(true);
        try {
            let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";

            if (filterType === "name") {
                url += `fname=${searchTerm}`;
            } else if (filterType === "attribute") {
                url += `attribute=${searchTerm}`;
            } else if (filterType === "atk") {
                url += `atk=${searchTerm}`;
            } else if (filterType === "def") {
                url += `def=${searchTerm}`;
            }

            const response = await axios.get(url);
            setRelatedCards(response.data.data.slice(0, 50));
        } catch (error) {
            console.error("Error searching cards:", error);
            setRelatedCards([]);
        }
        setLoading(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        searchCards();
    };

    return (
        <div className="min-h-screen w-full bg-stone-600 flex flex-row">
            <div className="w-1/2 pt-16 px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-5 items-start mb-8">

                        <div className="w-[270px] flex-shrink-0">
                            <img
                                className="h-[400px] w-full object-cover rounded-lg shadow-lg"
                                src={image}
                                alt={name || "Card image"}
                            />
                        </div>

                        {/* Thông tin bên phải ảnh */}
                        <div className="flex-grow grid grid-cols-2 gap-4 bg-stone-700 p-4 rounded-lg">
                            <div className="text-white ">
                                <h5 className="font-medium ">Name:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{name}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Type:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{frameType}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Type:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{type}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Race:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{race}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Attribute:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{attribute}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Level:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{level}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Atk:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{atk}</p>
                            </div>
                            <div className="text-white">
                                <h5 className="font-medium">Def:</h5>
                                <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">{def}</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[270px] h-[200px] bg-gradient-to-br from-slate-700 to-blue-700 
                                  rounded-lg shadow-lg overflow-y-auto
                                  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
                                  hover:scrollbar-thumb-gray-600">
                        <div className="p-4">
                            <p className="text-white text-sm">{descri}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-1/2 pt-16 px-8">
                <div className="bg-stone-700 p-4 rounded-lg mb-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-4">
                            <select
                                className="bg-stone-600 text-white rounded-lg px-3 py-2 w-1/3"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="name">Name</option>
                                <option value="attribute">Attribute</option>
                                <option value="atk">ATK</option>
                                <option value="def">DEF</option>
                            </select>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search cards..."
                                className="bg-stone-600 text-white rounded-lg px-3 py-2 flex-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>
                </div>

                {/* Hiển thị kết quả */}
                <div className="bg-stone-700 p-4 rounded-lg overflow-y-auto h-[600px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                    {relatedCards.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {relatedCards.map((card) => (
                                <div key={card.id} className="bg-stone-800 p-3 rounded-lg">
                                    <img
                                        src={card.card_images[0].image_url}
                                        alt={card.name}
                                        className="w-full h-[430px] object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="text-white font-medium text-sm mb-1">{card.name}</h3>
                                    <div className="text-gray-300 text-xs">
                                        <p>ATK: {card.atk} / DEF: {card.def}</p>
                                        <p>Attribute: {card.attribute}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center">
                            {loading ? "Searching..." : "No cards found"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
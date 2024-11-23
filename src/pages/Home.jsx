import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import AdminDetail from "../components/AdminDetail";
import { RefreshCw, Loader2 } from "lucide-react";



const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        async function getCard() {
            try {
                const res = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
                setData(res.data.data);
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        }
        getCard();
    }, []);

    const handleLoading = () => {
        if (loading) return;
        setLoading(true);

        setTimeout(() => {
            setPage((i) => i + 1);
            setLoading(false);
        }, 1000);
    };

    const filteredCards = data
        .filter(value =>
            value.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, page * 20);




    const handleRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);


        setSearchTerm("");

        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-stone-800 flex flex-col">
            {/* Header search */}
            <div className="sticky top-0 z-50 bg-stone-800/80 backdrop-blur-sm shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search Yu-Gi-Oh! Cards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 bg-stone-700 text-white rounded-full 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                                       transition-all duration-300"
                        />
                        {/* <ul className="flex justify-center items-center gap-4">
                            <Link className="text-xl text-white hover:text-purple-400 font-semibold" to={'/home'}>Home</Link>
                        </ul> */}

                        <button
                            onClick={handleRefresh}
                            className={`bg-stone-700 text-white p-2 rounded-full hover:bg-stone-600 transition-colors ${isRefreshing ? "animate-spin" : ""
                                }`}
                        >
                            <RefreshCw size={20} />
                        </button>



                    </div>
                </div>
            </div>


            <div className="flex-1 overflow-y-auto 
                            scrollbar-thin scrollbar-thumb-gray-700 
                            scrollbar-track-transparent 
                            hover:scrollbar-thumb-gray-600 p-4">
                <div className="container mx-auto">
                    {filteredCards.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCards.map((value) => (
                                <Card
                                    key={value.id}
                                    id={value.id}
                                    name={value.name}
                                    image={value.card_images[0].image_url}
                                    frameType={value.frameType}
                                    descri={value.desc}
                                    type={value.type}
                                    race={value.race}
                                    attribute={value.attribute || "Not Value"}
                                    level={value.level || "Not Value"}
                                    atk={value.atk || "Not Value"}
                                    def={value.def || "Not Value"}
                                    className="transform transition-all duration-300 
                                               hover:scale-105 hover:z-10 
                                               hover:shadow-2xl"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full text-white">
                            No cards found
                        </div>
                    )}
                </div>
            </div>


            <div className="bg-stone-800 py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleLoading}
                        disabled={loading}
                        className="flex items-center justify-center 
                                   w-[150px] h-[50px] 
                                   bg-blue-600 text-white 
                                   rounded-full font-semibold 
                                   hover:bg-blue-700 
                                   transition-colors duration-300
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More Cards"
                        )}
                    </button>
                    <span className="text-white">
                        Showing {filteredCards.length} of {data.length} cards
                    </span>
                </div>
                <AdminDetail />
            </div>
        </div>
    );
};

export default Home;
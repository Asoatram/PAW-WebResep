'use client'


function FoodCard() {

    return (
        <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-4">
            <div className="flex justify-center">
                <div className="bg-gray-200 rounded-md p-4">
                    <img
                        src="https://via.placeholder.com/100" // Replace this with the actual image URL
                        alt="Ayam Goreng"
                        className="h-24 w-24 object-cover rounded-md"
                    />
                </div>
            </div>
            <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">Ayam</h2>
                <p className="text-gray-500 text-sm">Wailah Cik Enak Ayamnya, Dibuat dengan keangatan!</p>
                <p className="text-gray-700 font-medium mt-2">Mas Rusdi</p>
                <div className="flex justify-center items-center mt-3">
                    <span className="text-lg font-bold">4.7</span>
                    <span className="text-yellow-500 ml-1">★</span>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;

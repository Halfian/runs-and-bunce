import { useState } from 'react';

export default function GearWishlist() {
    const [gear, setGear] = useState([
        { name: "Running Shoes", bought: false },
        { name: "Energy Gel", bought: false },
        { name: "Running Bag/Pack", bought: false },
    ]);

    const toggleBought = (index) => {
        const updated = [...gear];
        updated[index].bought = !updated[index].bought;
        setGear(updated);
    };

    const addItem = () => {
        const newItem = prompt("Enter new gear item:");
        if (newItem) {
            setGear([...gear, { name: newItem, bought: false }]);
        }
    };

    return (
        <div className="bg-dark-bg border border-neon-blue rounded-lg p-6">
            <h2 className="text-2xl font-bold text-neon-pink mb-4">Gear WishList</h2>

            <ul className="space-y-2 text-neon-blue">
                {gear.map((item, i) => (
                    <li
                        key={i}
                        className="flex justify-between items-center border-b border-neon-blue pb-1"
                    >
                        <span
                            className={`${
                                item.bought ? "line-through text-neon-pink" : ""
                            }`}
                        >
                            {item.name}
                        </span>
                        <button 
                        onClick={() => toggleBought(i)}
                        className="px-2 py-1 border border-neon-pink rounded hover:bg-neon-pink hover:text-dark-bg transition"
                        >
                            {item.bought ? "Bought" : "Need"}
                        </button>
                    </li>
                ))}
            </ul>

            <button 
                onClick={addItem}
                className="mt-4 px-3 py-2 border border-neon-blue rounded hover:bg-neon-blue hover:text-dark-bg transition"
            >
                + Add Item
            </button>
        </div>
    )
}
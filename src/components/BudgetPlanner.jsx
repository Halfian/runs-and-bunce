import { useState, useEffect } from 'react';

export default function BudgetPlanner() {
    const [budget, setBudget] = useState({
        flights: 0,
        hotel: 0,
        food: 0,
        shoes: 0,
    });
    const [newItem, setNewItem] = useState("");
    const [newValue, setNewValue] = useState("");

    // Load saved budget
    useEffect(() => {
        const saved = localStorage.getItem("budgetPlanner");
        if (saved) setBudget(JSON.parse(saved));
    }, []);

    // save budget whenever it changes
    useEffect(() => {
        localStorage.setItem("budgetPlanner", JSON.stringify(budget));
    }, [budget]);

    const handleChange = (key, value) => {
        setBudget((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
    };

    const handleAddItem = () => {
        if (!newItem.trim()) return;
        setBudget((prev) => ({
            ...prev,
            [newItem.toLowerCase()]: parseFloat(newValue) || 0,
        }));
        setNewItem("");
        setNewValue("");
    };

    const total = Object.values(budget).reduce((sum, val) => sum + val, 0);

    return (
        <div className="bg-dark-bg border border-neon-blue rounded-lg p-6">
            <h2 className="text-2xl font-bold text-neon-pink mb-4">Trip & Gear Budget</h2>

            <table className="w-full text-neon-blue border-collapse mb-4">
                <tbody>
                    {Object.keys(budget).map((key) => (
                        <tr key={key} className="border-b border-neon-blue">
                            <td className="capitalize p-2">{key}</td>
                            <td className="p-2">
                                <input 
                                    type="text"
                                    value={budget[key].toLocaleString("id-ID")}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, "");
                                        handleChange(key, raw);
                                    }}
                                    className="w-full bg-dark-bg border border-neon-pink rounded px-2 text-neon-blue focus:outline-none focus:border-neon-blue"
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="p-2 font-bold text-neon-pink">Total</td>
                        <td className="p-2 font-bold">Rp {total.toLocaleString("id-ID")}</td>
                    </tr>
                </tbody>
            </table>

            {/* Add new budget item */}
            <div className="flex gap-2 items-center">
                <input 
                    type="text"
                    placeholder="New item (e.g. race fee)"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 bg-dark-bg border border-neon-pink rounded px-2 text-neon-blue focus:outline-none focus:border-neon-blue" 
                />
                <input 
                    type="number"
                    placeholder="Amount"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-24 bg-dark-bg border border-neon-pink rounded px-2 text-neon-blue focus:outline-none focus:border-neon-blue" 
                />
                <button
                    onClick={handleAddItem}
                    className="bg-neon-blue text-dark-bg px-3 py-2 rounded hover:bg-neon-pink transition"
                >
                    Add
                </button>
            </div>
            <button
                onClick={() => {
                    setBudget({ flight: 0, hotel: 0, food: 0, gear: 0});
                    localStorage.removeItem("budgetPlanner")
                }}
                className="mt-4 bg-neon-pink text-dark-bg px-3 py-2 rounded hover:bg-neon-blue transition"
            >
                Reset Budget
            </button>
        </div>
    );
}

// Next update: Add pie chart showing spending, save budget data in localstorage, add Wishlist link to gear items for quick planning
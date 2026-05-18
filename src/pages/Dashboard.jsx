import Countdown from '../components/Countdown';
import TodayStats from '../components/TodayStats';
import WeeklyCharts from '../components/WeeklyCharts';
import TrainingPlan from '../components/TrainingPlan';
import BudgetPlanner from '../components/BudgetPlanner';
import GearWishlist from '../components/GearWishlist';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-dark-bg text-neon-blue p-6">
            <header className="sticky top-0 z-50 relative flex justify-center items-center mb-6 bg-dark-bg/70 backdrop-blur-md border-b border-neon-pink p-2">
                <h1 className="text-3xl font-bold">Runs-and-Bunce</h1>
                <a href="/settings" className="absolute right-4 drop-shadow-[0_0_12px_#FF00FF] hover:drop-shadow-[0_0_12px_#FF00FF] hover:shadow-[0_0_24px_#FF00FF] transition duration-300">⚙️</a>
            </header>

            <section className="grid md:grid-cols-2 gap-6">
                <TodayStats />
                <Countdown />
            </section>

            <section className="grid md:grid-cols-2 gap-6 mt-6">
                <WeeklyCharts />
                <TrainingPlan />
            </section>

            <section className="grid md:grid-cols-2 gap-6 mt-6">
                <BudgetPlanner />
                <GearWishlist />
            </section>
        </div>
    )
}
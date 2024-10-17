import DataChart from "./_components/chart/data-chart";

export default function Analytics() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-2xl">Analytics</h1>

            <DataChart />
        </div>
    );
}
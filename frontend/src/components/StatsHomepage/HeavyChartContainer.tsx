import { HeavyStats, PlatformCount } from "@/lib/definition";
import React from "react";
import { Cell, ResponsiveContainer, Tooltip, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

// Color palette from your CSS variables
const colors = {
    deepteal: ["#2D4A45", "#4D7C73", "#6BA097", "#9BC3BB", "#CDE1DD"],
    ocean: ["#4A7A85", "#5D9DA4", "#7DB6BC", "#A7CED3", "#D1E6EA"],
    sage: ["#7A9B8E", "#85A492", "#99B7A8", "#BBCFC5", "#DDE7E2"],
    cream: ["#F4E8C1", "#F7D78C", "#FAE6B4", "#FDF0D1", "#FEF7E8"],
    pearl: ["#F9F7F4", "#FBFAF8", "#FDFDFC", "#FFFFFF"],
};

const StatCard = ({ title, value, subtitle }: { title: string; value: number | string; subtitle?: string }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-deepteal-500">{title}</h3>
            <div className="text-4xl font-bold mb-2 text-ocean-500">{value.toLocaleString()}</div>
            {subtitle && <p className="text-sm text-sage-500">{subtitle}</p>}
        </div>
    </div>
);

const BarChartComponent = ({
    data,
    title,
    colorPalette,
}: {
    data: PlatformCount[];
    title: string;
    colorPalette: string[];
}) => {
    data = data.sort((a, b) => b.count - a.count);
    const total = data.reduce((sum, item) => sum + item.count, 0);

    const chartData = data.map((item) => ({
        ...item,
        value: item.count,
        name: item.platform_type,
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            const percentage = ((data.value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-deepteal-500">{data.payload.platform_type}</p>
                    <p className="text-ocean-500">
                        Count: <span className="font-bold">{data.value.toLocaleString()}</span>
                    </p>
                    <p className="text-sage-500">{percentage}% of total</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center mb-4 text-deepteal-500">{title}</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="platform_type"
                            tick={{ fill: "#2D4A45", fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis
                            scale="log"
                            domain={["auto", "auto"]}
                            tick={{ fill: "#2D4A45", fontSize: 8 }}
                            label={{ value: "Count (log scale)", angle: -90, position: "insideLeft", fill: "#2D4A45" }}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm text-sage-500">
                    Total: <span className="font-bold text-ocean-500">{total.toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
};

export default function HeavyStatsSection({ stats }: { stats: HeavyStats }) {
    return (
        <section className="py-16 px-4 bg-pearl-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-deepteal-500">Platform Statistics</h2>
                    <p className="text-lg max-w-2xl mx-auto text-sage-500">
                        Comprehensive overview of deposits and frames across all platforms
                    </p>
                </div>

                {/* Main Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard title="Total Sessions" value={stats.nb_deposits} subtitle="Across all platforms" />
                    <StatCard title="Total Images" value={stats.nb_frames} subtitle="" />
                    <StatCard
                        title="Q1 Images"
                        value={stats.nb_frames_q1_asv.toFixed(1) + ` %`}
                        subtitle="Number of images with centimeter accuracy"
                    />
                </div>

                {/* Donut Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BarChartComponent
                        data={stats.frames_by_platform}
                        title="Images by Platform"
                        colorPalette={colors.deepteal}
                    />

                    <BarChartComponent
                        data={stats.deposit_by_platform}
                        title="Deposits by Platform"
                        colorPalette={colors.ocean}
                    />
                </div>
            </div>
        </section>
    );
}

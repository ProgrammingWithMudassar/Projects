"use client";
import LinesChart from "@/components/Vendor/Dashboard/LinesChart";
import Lines from '@/json/Lines.json'


const GlobalView = () => {
    return (
        <section className="w-full h-full">
            <LinesChart data={Lines} />
        </section>
    )
}

export default GlobalView

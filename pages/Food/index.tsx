"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import NutritionTable from "../../app/components/NutritionTable/NutritionTable";
// import '../Food/food.css'

interface ResponseData {
    [key: string]: string | number
}

interface LogData {
    prompt: string;
    response: ResponseData;
}

interface Data {
    success: boolean;
    data: LogData[];
}

const Food = () => {
    const [data, setData] = useState<LogData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const userNum = user.id;

            try {
                const response = await fetch(`/api/dashboard/getDashboard?userId=${userNum}`);
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const result: Data = await response.json();
                setData(result.data);

            } catch (error) {
                setError((error as Error).message || "An error occurred");
            }
        };
        fetchData();
    }, [user]);

    let userLog = data;
    console.log("FOOD DATA: ", userLog);

    return (
        <>
            {userLog.length > 0 ? (
                userLog.map((log, index) => (
                    <div className="logContainer" key={index}>
                        <div className="logPrompt" >{log.prompt}</div>
                        <NutritionTable response={log.response} />
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}

export default Food;

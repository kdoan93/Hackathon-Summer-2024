import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Data = {
    calories: number;
}

const userCalories = () => {
    const [data, setData] = useState<Data[]>([])
    const [error, setError] = useState<string | null>(null);

    const { user } = useUser()

    useEffect(() => {
        const fetchData = async () => {
          if (!user) return;

          try {
            const response = await fetch(`/api/getUserCalories?userId=${user.id}`);

            if (!response.ok) throw new Error(`Error: ${response.statusText}`)

            const result: Data[] = await response.json();
            setData(result);

          } catch (error) {
            setError((error as Error).message || 'An error occurred');
          }
        };

        fetchData();
      }, [user]);

    console.log("pages/userCalories/index.tsx data: ", data)

    if (!user) return

    if (error) return <div>Error: {error}</div>

    if (!data.length) return <div>User hasn't logged any calories yet!</div>

    return (
        <div>
            <h1>User calories</h1>
            {data.map((item, index) => (
                <div key={index}>User calories: {item.calories}</div>
            ))}
        </div>
    )
}

export default userCalories;

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Data = {
    calories: number;
}

const userCalories = () => {
    const [data, setData] = useState<Data[]>([])

    const { user } = useUser()

    useEffect(() => {
        const fetchData = async () => {
          if (!user) return;

          try {
            const response = await fetch(`/api/getUserCalories?userId=${user.id}`);

            const result: Data[] = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, [user]);

    return (
        <div>
            <h1>User calories</h1>

            {data.length === 0 ?
                <h2>User hasn't logged any calories yet!</h2>
                :
                data.map((calories, index) => (
                    <div key={index}>User calorie: {calories}</div>
                ))
            }
        </div>
    )
}

export default userCalories;

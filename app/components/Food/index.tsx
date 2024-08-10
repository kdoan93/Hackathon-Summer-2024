import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { setEnvironmentData } from "worker_threads"
import NavBar from "../NavBar/NavBar";

type Data = {
    data: object;
    userId: string;
    prompt: string;
    response: object;
    createdAt: Date;
}

const Food = () => {
    const [data, setData] = useState<Data[]>([])
    const [error, setError] = useState<string | null>(null)

    let { user } = useUser()

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return
            const userNum = user.id

            try {
                const response = await fetch(`/api/dashboard/getDashboard?userId=${userNum}`)
                if (!response.ok) throw new Error(`Error: ${response.statusText}`)

                const result: Data[] = await response.json()
                setData(result)

            } catch (error) {
                setError((error as Error).message || "An error occurred")
            }
        }
        fetchData()
    }, [user])

    let userLog = data.data
    console.log("FOOD DATA: ", userLog)

    return (
        <>
            {/* <NavBar /> */}
            <h1>User's food log</h1>
        </>
    )
}

export default Food

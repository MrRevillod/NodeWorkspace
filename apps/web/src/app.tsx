
import React, { useState } from "react"

type ApiResponse = {
    code: number,
    message: string
}

export default function App() {

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)

    const handleCreate = async () => {

        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            body: JSON.stringify({ email: "test" }),
            headers: { "Content-Type": "application/json" },
        })

        setApiResponse(await response.json() as ApiResponse)
    }

    const handleList = async () => {
        const response = await fetch("http://localhost:3000/api/users")
        setApiResponse(await response.json() as ApiResponse)
    }

    return (

        <article>

            <button onClick={() => handleCreate()}> Create Default user </button>
            <button onClick={() => handleList()}> List users </button>

            <section> {JSON.stringify(apiResponse)} </section>

        </article>
    )
}
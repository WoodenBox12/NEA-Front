import { useEffect } from "react"



const Vaults = ({data}) => {

    
    const vaults = data.map(i => {
        return (
            <div>
                vault {i}
            </div>
        )
    })


    return (
        <>
            <div>
                {vaults}
            </div>
        </>
    )
}

export default Vaults
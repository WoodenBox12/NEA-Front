import "./Vaults.css"

const Vaults = ({data}) => {
    // make dropdowns to show passwords on site

    // make extension display more of the info straight away

    // if data.length == 1 make it display very differently
    // or boolean prop

    // if website add search bar, and display site names in grid

    const rendered = data.map((e) => {
        // each call will usually just have 1 site but sometimes more based on multiple passwords and hash collision

        return Object.keys(e).map((key, index) => {
            return (
                <div key={index} className="card">
                    <p><b>{key}</b></p>
                    {JSON.stringify(e[key])}
                </div>
            )
        }) 
    })


    return (
        <>
            <div>
                {rendered}
                <div>
                    <p>{(data.length == 0) && ("passwords not found")}</p>
                </div>
            </div>
        </>
    )
}

export default Vaults
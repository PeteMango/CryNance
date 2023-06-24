import './Components.css'

const DashboardCard = () => {
	return (
		<>
			<div className="card" style={{padding:"15px", display:"block"}}>
                <h1 className="cardHeader">Card Header — Date</h1>
                <select class="select select-bordered select-sm  max-w-xs">
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Hidden</option>
                </select>
                <select class="select select-info select-sm  max-w-xs">
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Hidden</option>
                </select>
			</div>
		</>
	)
}

export default DashboardCard
import './Pages.css';
import ArticleCard from '../Components/article-card';
import DashboardCard from '../Components/dashboard-card'

export default function Browse() {
    return (
        <>
            {/* <div class="center-content">
                <div className="card">
                    <div className="cardImage"><img src='/images/pink.png'></img></div>
                    <div className="cardContainer">
                        <h1 className="cardHeader">Card Header </h1>
                        <h4 className="cardBody">Card Body</h4>
                        <h3 className='cardDate'>Date</h3>
                    </div>
                </div>  
            </div> */}
            
            <div class="center-content">
                <div class="join">
                    <div>
                        <div>
                        <input class="input input-bordered join-item" placeholder="Search..."/>
                        </div>
                    </div>
                    <select class="select select-bordered join-item">
                        <option disabled selected>Sort By</option>
                        <option>Recent</option>
                        <option>Rating</option>
                    </select>
                    <div class="indicator">
                        <button class="btn join-item">Search</button>
                    </div>
                </div>
                <ArticleCard></ArticleCard>
                <DashboardCard></DashboardCard>
            </div>
            {/* <Card></Card> */}
        </>
    )
}
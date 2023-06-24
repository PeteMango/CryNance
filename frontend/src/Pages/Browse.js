import './Pages.css'
import Card from '../Components/article-card';

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
                        <option disabled selected>Category</option>
                        <option>Sci-fi</option>
                        <option>Drama</option>
                        <option>Action</option>
                    </select>
                    <div class="indicator">
                        <button class="btn join-item">Search</button>
                    </div>
                </div>
                <Card></Card>
            </div>
            {/* <Card></Card> */}
        </>
    )
}
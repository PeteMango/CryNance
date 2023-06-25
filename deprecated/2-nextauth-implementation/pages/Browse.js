import './Pages.css';
import ArticleCard from '../app/components/ArticleCard';
import DashboardCard from '../app/components/DashboardCard';

export default function Browse() {
    return (
        <>
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
        </>
    )
}
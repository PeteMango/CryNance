import "./Pages.css";
import panda from "../Images/panda.png"
import news from "../Images/news.png"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  return (
    <>
      <div class="login-form-container pb-24">
        <div className="basis-5/12 ">
          <div className="flex-col">
            <p className="text-7xl text-sky-950">CryNance</p>
            <p className="text-xl px-19.5 pt-14 text-sky-800 w-10/12">CryNance leverages decentralized blockchains technologies to empower journalists & authors to publish articles securely.</p>
            <div className="flex flex-row m-8">
              {/* <button className="btn basis-1/3 mx-4">
                <Link to="/browse">Browse</Link>
              </button>
              <button className="btn basis-1/3 mx-4">
                <Link to="/create">Create</Link>
              </button> */}

            </div>
          </div>
        </div>
         <div className="basis-1/5">
          <div className="flex">
            <img src={news} alt="panda bear" />
          </div> 
         </div>  
      </div>
      {/* <div class="login-form-container">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="form-control">
                <label class="input-group input-group-vertical">
                    <span>Email</span>
                    <input type="text" placeholder="info@site.com" class="input input-bordered" />
                </label>
                </div>
            </div>
        </div> */}
      {/* <div class="login-container-full">
        <div class="flex w-full justify-center">
            <div id="login-card1" class="card w-96 bg-base-100 shadow-xl hover-enlarge">
            <figure><img src="/images/pink.png" alt="Shoes" /></figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Creator Login</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                </div>
            </div>
            </div>  
        <div class="divider divider-horizontal">OR</div>
            <div id="login-card2" class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="/images/blue.png" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Personal Login</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                </div>
            </div>
            </div>
        </div>
        </div> */}
    </>
  );
}

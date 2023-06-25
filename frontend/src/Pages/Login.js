import "./Pages.css";
import panda from "../Images/panda.png"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  return (
    <>
      <div class="login-form-container pb-24">
        <div className="basis-3/5 ">
          <div className="flex flex-col justify-center">
            <p className="text-7xl px-16">CryNance</p>
            <p className="text-xl p-8">CRyNance leverages decentralized blockchains technologies to empower journalists & authors to publish articles securely.</p>
            <p className="text-xl px-8">Sign in to get started...</p>
            <div className="flex flex-row m-8">
              <button className="btn basis-1/3 mx-4">
                <Link to="/browse">Browse</Link>
              </button>
              <button className="btn basis-1/3 mx-4">
                <Link to="/create">Create</Link>
              </button>

            </div>
          </div>
        </div>
        <div className="basis-2/5">
          <div className="flex justify-center">
            <img src={panda} alt="panda bear" />
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

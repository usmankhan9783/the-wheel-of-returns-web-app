import './landing.scss'
import aspectsImg from "./../../assets/images/aspects.png"
import pokerPiece from "./../../assets/images/poker-piece.png"
import Capture from "./../../assets/images/Capture.png"
import withdrawal from "./../../assets/images/withdrawal.png"
import spinImg from "./../../assets/images/spin-img.png"
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from 'react'
import { getAvaxPrice, getContractData, investHandler, withdrawHandler } from '../../utils/web3-helper'
import { useSelector } from 'react-redux'
import { notification } from '../../component/Notification'

export default function Landing() {
  const state = useSelector(state=>state?.web3Reducer)
  const series = [{
    data: ["30.0%", "22.0%", "10.0%", "05.0%", "03.0%"]
  }]
  const options = {
    chart: {
      type: 'bar',
      height: 350,
        toolbar: {
          show: false,
        }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['5-10', '11-20', '21-40', '41-65', '66-100'],
    },
    yaxis: {
      title: {
        text: 'Likelihood of Distribution'
      }
    },
    fill: {
      opacity: 1
    },
    grid: {
      show: false,
    },
    menubar :{
      
      enabled: false,
    },
    tooltip: {
      enabled: false,
    }
  }
  const series2 = [{
    data: ["30.0%", "22.0%", "10.0%", "05.0%"]
  }]
  const options2 = {
    chart: {
      type: 'bar',
      height: 350,
        toolbar: {
          show: false,
        }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['5%', '6%', '7%', '8%'],
    },
    yaxis: {
      title: {
        text: 'Likelihood of Distribution'
      }
    },
    fill: {
      opacity: 1
    },
    grid: {
      show: false,
    },
    menubar :{
      
      enabled: false,
    },
    tooltip: {
      enabled: false,
    }
  }

  const [investAmount,setInvestAmount] = useState(0);

  const spinButtonHandler=async ()=>{
    await investHandler(investAmount);
    setInvestAmount(0)
  }

  const withdrawButtonHandler = async()=>{
    await withdrawHandler()
  }

  useEffect(()=>{
    getAvaxPrice()
    getContractData()
  },[])

  return (
    <>
      <section className='banner' id="investment">
        <div className='container'>
          <div className='banner-content'>
            <div className='about-fury'>
              <h1 className='title'>THE WHEEL OF RETURNS</h1>
              <p className='info'>Welcome to the Wheel of Returns! A simple investment game that gives you the opportunity to wager your money in order to receive great daily returns on your AVAX.</p>
              <button className='spin-btn'>Audit</button>
              <button className='spin-btn'>Whitepaper</button>
            </div>
            <div className='spin-animation'>
              <figure className='spinner'>
                <img src={spinImg} className="spin-active" alt="spinImg" />
                <div className='avax-input'>
                  <input 
                    className='number' 
                    min={0} 
                    placeholder='100' 
                    type="number"
                    value={investAmount}
                    onChange={(e)=>setInvestAmount(e.target.value)}
                    /><span className='label'>AVAX</span>
                  <button className='btn' onClick={()=>spinButtonHandler()}>Spin</button>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className='how-it-works'>
        <div className='container'>
          <h2 className='title'>How it Works</h2>
          <p className='para'>The initial investment into the Wheel is locked into the general pool of funds and is no longer accessible to the individual player, these pool funds that are invested to keep the Wheel of Returns profitable. The payout to players will be as a percentage of the wager per day that is available for between 5-100 days</p>
          <p className='para'>
            The returns at minimum will be 5% a day for 5 days, the maximum amount is 8% for 100 days. In that scenario, if you were to invest 100 AVAX, by the end of the 100 days, you’d be paid out 800 AVAX.
          </p>
        </div>
      </section>
      <section className="withdrawable" id="withdrawal">
        <div className='container'>
          <h2 className='title'>Withdrawable</h2>
          <span className='amount'>{state?.userData?.dividend?.toFixed(2) || 0} AVAX</span>
          <span className='amount'>$ {state?.userData?.dividendUsd?.toFixed(2) || 0}</span>
          <button className='spin-btn' onClick={()=>withdrawButtonHandler()}>Withdraw</button>
          
          <div className='user-balance'>
            <div className='spin-card light'>
              <span className='title'>Total Invested</span>
              <span className='token-amount'>{state?.userData?.totalInvestment?.toFixed(2) || 0}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.userData?.totalInvestmentUsd?.toFixed(2) || 0}</span>
            </div>
            <div className='spin-card light'>
              <span className='title'>Total Withdraw</span>
              <span className='token-amount'>{state?.userData?.totalWithdraw?.toFixed(2) || 0}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.userData?.totalWithdrawUsd?.toFixed(2) || 0}</span>
            </div>
          </div>
          <h2 className='title'>Your Spin</h2>
          <div className='your-spin'>
            <div className='spin'>
              <span className='percent'>8.2%</span>
              <span className='amount'>8425</span>
              <span className='symbol'>AVAX</span>
            </div>
            <div className='spin'>
              <span className='percent'>8.2%</span>
              <span className='amount'>8425</span>
              <span className='symbol'>AVAX</span>
            </div>
            <div className='range-slider '>
              <div className='bar' style={{width:"20%"}}></div>
            </div>
          </div>
        </div>
      </section>
      <section className='referral-wrapper' id="referral">
        <div className='container'>
          <div className="referral">
            <div className="left">
              <h2 className='title'>REFERRAL</h2>
              <p className='para'>Referral rewards are paid directly to your wallet  <strong> Your Ref Link:</strong>
              </p>
              {
                state?.userAddress &&
                  <>
                  <p className='para'>{`https://thewheelofreturns.io/?ref=${state?.userAddress}`}</p>
                  <button
                   className='spin-btn'
                   onClick={() => {
                    const text = `https://thewheelofreturns.io/?ref=${state?.userAddress}`;
                    navigator.clipboard.writeText(text);
                    notification('success','Copied successfully')
                  }}
                   >Copy</button>
               </>
              }

            </div>
            <div className='spin-card'>
              <span className='title'>Your referral rewards</span>
              <span className='token-amount'>{state?.userData?.totalRef?.toFixed(2) || 0}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.userData?.totalRefUsd?.toFixed(2) || 0}</span>
            </div>
          </div>
        </div>
      </section>
      <section className='aspects-wrapper'>
        <div className='container'>
          <h2 className='title'>Different Aspects of the Project</h2>
          <figure className='figure'>
            <img src={aspectsImg} />
          </figure>
        </div>
      </section>
      <section className='how-to-play'>
        <div className='container'>
          <h2 className='title'>How to Play</h2>
          <div className='play-steps'>
            <div className='step'>
              <figure className='step-card'>
                <img src={pokerPiece} alt="alt" />
                <figcaption className='caption'>Make Your Wager</figcaption>
              </figure>
              <p className='para'>This wager will determine your reward payout.
                You can spin again and wager other amounts
                as you like. But once you spin this wager and
                it’s rewards will blocked in. The minimum
                wager amount is
                0.1 AVAX.
              </p>
            </div>
            <div className='step'>
              <figure className='step-card'>
                <img src={Capture} alt="alt" />
                <figcaption className='caption'>Spin</figcaption>
              </figure>
              <p className='para'>
                This is the best part about The Wheel of Returns, spin the wheel as hard as you can and wait to see exactly what “Daily Return” and “Return Time” you get. After you spin this spin will show up with a countdown under your “Previous Spins” section on the Homepage. You can have a maximum of 100 spins from a single
                account.
              </p>
            </div>
            <div className='step'>
              <figure className='step-card'>
                <img src={withdrawal} alt="alt" />
                <figcaption className='caption'>Withdraw Your 
                Rewards Daily</figcaption>
              </figure>
              <p className='para'>
              Once you spin, come back daily to claim your returns from your “Previous Spins” section. Click the “Claim Rewards” button to transfered your rewards. And Maybe, if you’re feeling lucky, use your rewards to take another spin!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='returns'>
        <div className='container'>
        <h2 className='title'>Returns Percentage & Time 
        Likelihood Charts</h2>
          <div className='return-stats'>
            <div className="chart">
              <h5 className='label'>Average Length of Daily Returns</h5>
              <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div className="chart">
              <h5 className='label'>Daily Returns Distributions</h5>
              <ReactApexChart options={options2} series={series2} type="bar" height={350} />
            </div>
          </div>
        </div>
      </section>
      <section className="withdrawable contract">
        <div className='container'>
          <h2 className='title'>Smart Contract</h2>
          <span className='amount'>Contract Balance: {state?.contractData?.contractBalance?.toFixed(2) || 0.00} AVAX</span>
          <span className='amount'>$ {state?.contractData?.contractBalanceUsd?.toFixed(2)|| 0.00}</span>
          <span className='amount'>Total Spin Count: {state?.contractData?.totalSpinCount || 0}</span>
          <div className='user-balance'>
            <div className='spin-card'>
              <span className='title'>Total Invested</span>
              <span className='token-amount'>{state?.contractData?.totalInvested?.toFixed(2) || 0.00}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.contractData?.totalInvestedUsd?.toFixed(2) || 0.00}</span>
            </div>
            <div className='spin-card'>
              <span className='title'>Total Withdraw</span>
              <span className='token-amount'>{state?.contractData?.totalWithdrawal?.toFixed(2) || 0.00}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.contractData?.totalWithdrawalUsd?.toFixed(2)|| 0.00}</span>
            </div>
            <div className='spin-card'>
              <span className='title'>Total Refferal Reward</span>
              <span className='token-amount'>{state?.contractData?.totalReferralReward?.toFixed(2) || 0.00}</span>
              <span className='symbol'>AVAX</span>
              <span className='usd-amount'>$ {state?.contractData?.totalReferralRewardUsd?.toFixed(2) || 0.00}</span>
            </div>
          </div>
        </div>
      </section>
      <section className='footer'>
        <div className='container'>
          <h2 className='title'>Pool Governance</h2>
          <p className='para'>
            Once the wheel is spun, the wager will automatically be distributed into the
            Wheel of Returns’ self-governed pool. This pool is automatically rebalanced based on the logic within its smart contract. This logic is immutable, and will optimize its lending returns based on the market conditions in order to yield the highest returns in order to satisfy the maintenance of the Wheel of Returns’ payouts. This logic is a mirror of the Pool Together logic but ported onto the AVAX network.

          </p>
          <h2 className='title'>Risk</h2>
          <div className='dark-box'>
            <p className='para'>
              As described in the previous sections, we are reliant upon certain market conditions in order to maintain the stability of the payouts per spin. As a result, there will most likely come a time in which market conditions under perform what is necessary for payouts.
              Based on our calculations this could be anywhere from 65 - 510 days after the inception of the project.
              Please do not invest any money that you are not willing to lose, and while we aim to give you the best return possible, we’d like you to know that this will not always be possible, so always DYOR.
            </p>

          </div>
        </div>
        <div className='copy-right'>
          <p className='para'>© Copyright The wheel of returns. All Rights Reserved</p>
        </div>
      </section>
    </>
  )
}

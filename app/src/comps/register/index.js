import React, { useState, useEffect } from "react";
import "./styles.scss";
import IconNear from '../icons/near'
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLogin from 'react-google-login';
import { connect, WalletConnection } from 'near-api-js';
import { getConfig } from '../../config';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function Register() {
  const recaptchaRef = React.createRef();
  const [isReCaptchaLoaded, setIsReCaptchaLoaded] = useState(false)
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    connect(getConfig()).then((near) => setWallet(new WalletConnection(near)));
  }, []);
  const handleLogin = () => {
    wallet.requestSignIn({
      contractId: 'wrap.testnet',
      methodNames: ['near_deposit', 'ft_balance_of', 'near_withdraw'],
    });
  };
  const onSubmitWithReCAPTCHA = async (e) => {
    e.preventDefault()
    if (isReCaptchaLoaded) {
    }
  }
  const recaptchaLoaded = () => {
    setIsReCaptchaLoaded(true)
  }
  const responseGoogle = () => {

  }
  return (
    <div className="wrap">
      <h3>REGISTER</h3>
      <form onSubmit={onSubmitWithReCAPTCHA}>
        <div className="flex">
          <div className="left" >
            <div>
              <label>First name</label>
              <input />
            </div>
            <div>
              <label>Last name</label>
              <input />
            </div>
            <div>
              <label>Email</label>
              <input />
            </div>
            <div>
              <label>Create Password</label>
              <input />
            </div>
            <div>
              <label>Confirm Password</label>
              <input />
            </div>
            <button className="btn-register">REGISTER</button>
            <div className="by-clicking"><p>By clicking 'Register', I agree to the</p>
              <a href="/"> Terms of Use</a> and <a href="/">Privacy Policy</a></div>
            <div className="divider"></div>
            <p className="by-clicking already-registered">Already Registered? <a href="/">LOGIN</a></p>
          </div>
          <div className="center"></div>
          <div className="right">
            <div>
              <p className="fw-bold">Connect with below options</p>
              <div className="ctn-near-wallet" onClick={handleLogin}>
                <div className="ctn-icon">
                  <span><IconNear /></span>
                </div>
                <span>NEAR Wallet</span>
              </div>
              <div></div>
              <div className="ctn-google">
                <GoogleLogin buttonText="Google" clientId={process.env.REACT_APP_CLIENT_ID} onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className="ctn-recaptcha">
                <p>Please check the box bellow to proceed</p>
                <ReCAPTCHA
                  size="normal"
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_ID || ''}
                  onChange={recaptchaLoaded}
                />
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

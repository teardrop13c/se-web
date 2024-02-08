import { useState, useEffect } from 'react'
import './App.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'

function App() {
  const [profile, setProfile] = useState(null)

  const clientId = "989605622776-ue6e395jnkt84309ub3a5b83pg7svq28.apps.googleusercontent.com"
    
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope:''
      })
      
    }
    gapi.load("client:auth2",initClient)

  }, []);

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('success',res)
  }

  const onFailure = (res) => {
    console.log('failed',res)
  }

  const logOut = () =>{
    setProfile(null);
  }

  return (
    <div>
      <h2>Hello Google login</h2>
      <br></br>

      {profile ? (
        <div>
          <p>Name : {profile.name}</p>
          <p>Email : {profile.email}</p>
          <br></br>
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut}/>
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sight in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
      
    </div>
  )
}

export default App
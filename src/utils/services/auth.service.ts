import axios from "axios";

const API_URL = "https://qtpczxekbf.execute-api.us-east-1.amazonaws.com/2023/";

interface RequestProps {
  [key: string]: string
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
      console.error(e)
    return e;
  }
};

class AuthService {
  login(props: RequestProps) {
    return axios
      .post(API_URL + "login", props)
      .then(response => {
        if (response.data.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(props: RequestProps) {
    return axios.post(API_URL + 'cadastro', { ...props });
  }

  subscribe(props: { idToken: string, data: string[] }) {
    return axios.post(API_URL + 'inscricao', props.data,  {
      headers: {
        'Authorization': 'Bearer ' + props.idToken
      }
    })
  }

  unsubscribe(props: { idToken: string, data: string[] }) {
    return axios.delete(API_URL + 'inscricao', {
      headers: {
        'Authorization': 'Bearer ' + props.idToken
      },
      data: props.data
    })
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  getEvents() {
    return axios.get(API_URL + 'palestras_prd')
  }

  getSubscribedEvents(idToken: string) {
    return axios.get(API_URL + "inscricao", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
  }

  authVerify(auth: string) {
    const decodedJwt = parseJwt(auth)
    if (decodedJwt.exp * 1000 < Date.now()) {
      return false
    }
    return true
  }
}

const Auth = new AuthService()

export default Auth

import cookie from 'react-cookie';

class Auth {
	checkUserLoggedIn() {
		const userId = cookie.load('userId');
		return userId ? true : false;
	}
}

export default Auth;
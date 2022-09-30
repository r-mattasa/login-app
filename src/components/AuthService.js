export const LoginUser =  async  (credentials) => {
        try {
           console.log(credentials);
           return await fetch(('https://reqres.in/api/login'), {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
           })
           .then( (response) => response.json())
           .then((data) => {
           if (data.token) {
             localStorage.setItem('user', JSON.stringify(data));
             return data;                                  
           } 
          if(data.error){
            throw new Error( `Error: ${data.error}` );      
          }           
          })          
         } catch (error) {
           //setPwd('');
           //console.error('Error in API:', error);
           throw new Error( `Catch Error: ${error}` );  
         }        
       }  
       
       
export const Signup = async (credentials) =>{
  try {
    console.log(credentials);
    return await fetch(('https://reqres.in/api/register'), {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(credentials)
    })
    .then( (response) => response.json())
    .then((data) => {
     if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));   
      return data;         
    }
    if (data?.error) {
      throw new Error(
        `Error: ${data.error}`
      );        
    }
    
   })   
 
  } catch (error) {
    //setPwd('');
    throw new Error( `Catch Error: ${error}` );  
  }
}
export const isUserAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return {}
	}
  console.log()
	return JSON.parse(user);
};

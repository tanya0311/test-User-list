
export type AdressType={
 street: string;
       suite: string;
       city: string;
       zipcode: string;
       geo: { lat: string;
         lng: string;}; 
}
export type CompanyType={
 name: string;
       catchPhrase: string;
       bs: string; 
}
export type UserResponseType={
   id: number;
   name: string;
   username: string;
   email: string;
   address: AdressType;
   phone: string;
   website: string;
   company: CompanyType
   }

 
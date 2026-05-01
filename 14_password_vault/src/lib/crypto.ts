export function encrypt(text : string){
    return btoa(text);
}

export function decrypt(text : string){
    return atob(text)
}



const currentUrl = window.location.href;
const url = new URL(currentUrl);
const params = new URLSearchParams(url.search);
const userId = params.get('id');
console.log('User ID:', userId);





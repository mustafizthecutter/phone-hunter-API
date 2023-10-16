const loadPhones = async (searchBtnField) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBtnField}`)
    const data = await res.json();
    const phones = data.data
    showPhones(phones);
    // console.log(phones);
}
const showPhones = (phones) => {
    // console.log(phones)
    const showMoreBtn = document.getElementById('show-more-button');
    if (phones.length > 12) {
        showMoreBtn.classList.remove('hidden')
    }
    else {
        showMoreBtn.classList.add('hidden')
    }
    phones = phones.slice(0, 12);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = 'card p-4 bg-gray-100 shadow-xl';
        phoneDiv.innerHTML = `
        
          <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
            </div>
             </div>`;
        phoneContainer.appendChild(phoneDiv);
    })

}
const searchHandle = () => {
    // console.log('search')
    const searchBtn = document.getElementById('search-btn');
    const searchBtnField = searchBtn.value;
    // console.log(searchBtnField);
    loadPhones(searchBtnField);
    searchBtn.value = '';
}
const searchHandle2 = () => {
    const searchBtn = document.getElementById('search-btn2');
    const searchBtnField = searchBtn.value;
    loadPhones(searchBtnField);
    searchBtn.value = '';
}
